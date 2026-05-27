Object CreateNativeApiJSI(Runtime& runtime, const NativeApiJsiConfig& config) {
  auto bridge = std::make_shared<NativeApiJsiBridge>(config);
  return Object::createFromHostObject(
      runtime, std::make_shared<NativeApiHostObject>(std::move(bridge)));
}

void NativeApiJsiWriteSmokeStage(const char* stage) {
  const char* enabled = getenv("NATIVESCRIPT_RN_TURBO_SMOKE_MARKER");
  if (enabled == nullptr || enabled[0] == '\0') {
    return;
  }

  NSString* path = [NSTemporaryDirectory()
      stringByAppendingPathComponent:@"NativeScriptNativeApiSmoke.marker"];
  NSString* content =
      [NSString stringWithFormat:@"stage=%s\n", stage != nullptr ? stage : ""];
  [content writeToFile:path atomically:YES encoding:NSUTF8StringEncoding error:nil];
}

void InstallAggregateGlobals(Runtime& runtime, Object& api, const char* namesFunction) {
  Value metadataValue = api.getProperty(runtime, "metadata");
  if (!metadataValue.isObject()) {
    return;
  }
  Object metadata = metadataValue.asObject(runtime);
  Value namesValue = metadata.getProperty(runtime, namesFunction);
  if (!namesValue.isObject()) {
    return;
  }
  Object namesObject = namesValue.asObject(runtime);
  if (!namesObject.isFunction(runtime)) {
    return;
  }
  Value namesResult = namesObject.asFunction(runtime).call(runtime);
  if (!namesResult.isObject() || !namesResult.asObject(runtime).isArray(runtime)) {
    return;
  }
  Array names = namesResult.asObject(runtime).getArray(runtime);
  Object global = runtime.global();
  for (size_t i = 0; i < names.size(runtime); i++) {
    Value nameValue = names.getValueAtIndex(runtime, i);
    if (!nameValue.isString()) {
      continue;
    }
    std::string name = nameValue.asString(runtime).utf8(runtime);
    if (name.empty() || global.hasProperty(runtime, name.c_str())) {
      continue;
    }
    try {
      Value aggregate = api.getProperty(runtime, name.c_str());
      if (!aggregate.isUndefined()) {
        global.setProperty(runtime, name.c_str(), aggregate);
      }
    } catch (const std::exception&) {
      // Some React Native globals are read-only even when hasProperty misses
      // them. Keep NativeScript initialization resilient and skip collisions.
    }
  }
}

std::string jsStringLiteral(const char* value) {
  std::string result = "'";
  if (value != nullptr) {
    for (const char* current = value; *current != '\0'; current++) {
      switch (*current) {
        case '\\':
          result += "\\\\";
          break;
        case '\'':
          result += "\\'";
          break;
        case '\n':
          result += "\\n";
          break;
        case '\r':
          result += "\\r";
          break;
        case '\t':
          result += "\\t";
          break;
        default:
          result += *current;
          break;
      }
    }
  }
  result += "'";
  return result;
}

void InstallNativeApiJsiGlobalSymbols(Runtime& runtime, const char* globalName) {
  NativeApiJsiWriteSmokeStage("jsi:globals:before-eval");
  static const char* GlobalInstaller = R"JSI_GLOBALS(
(function(nativeApiGlobalName) {
  'use strict';
  var api = globalThis[nativeApiGlobalName];
  var installedFlagName = '__nativeScriptNativeApiGlobalsInstalled';
  if (!api || globalThis[installedFlagName]) {
    return;
  }

  var cacheName = '__nativeScriptNativeApiGlobalCache';
  var typeCodeKey = '__nativeApiTypeCode';
  var classWrappers = typeof WeakMap === 'function' ? new WeakMap() : null;
  var classWrappersByName = Object.create(null);
  var resolvingGlobal = Object.create(null);

  function globalCache() {
    var existing = globalThis[cacheName];
    if (existing && typeof existing === 'object') {
      return existing;
    }
    var cache = Object.create(null);
    Object.defineProperty(globalThis, cacheName, {
      configurable: false,
      enumerable: false,
      writable: false,
      value: cache
    });
    return cache;
  }

  function cacheGlobal(name, value) {
    if (name && value !== undefined) {
      globalCache()[name] = value;
    }
  }

  function resolveCachedGlobal(name, expectedKind) {
    if (!name) {
      return undefined;
    }
    var cached = globalCache()[name];
    if (cached && (typeof cached === 'object' || typeof cached === 'function') && cached.kind === expectedKind) {
      return cached;
    }
    if (resolvingGlobal[name] || !Object.prototype.hasOwnProperty.call(globalThis, name)) {
      return undefined;
    }
    resolvingGlobal[name] = true;
    try {
      var value = globalThis[name];
      if (value && (typeof value === 'object' || typeof value === 'function') && value.kind === expectedKind) {
        cacheGlobal(name, value);
        return value;
      }
    } finally {
      delete resolvingGlobal[name];
    }
    return undefined;
  }

  function defineLazyGlobal(name, resolve, force, nativeKind) {
    if (!name) {
      return;
    }
    if (!force && Object.prototype.hasOwnProperty.call(globalThis, name)) {
      try {
        var existingDescriptor = Object.getOwnPropertyDescriptor(globalThis, name);
        if (existingDescriptor && Object.prototype.hasOwnProperty.call(existingDescriptor, 'value')) {
          cacheGlobal(name, existingDescriptor.value);
        }
      } catch (_) {
      }
      return;
    }
    var nativeDefineLazyGlobal = api.__defineLazyGlobal;
    if (nativeKind && typeof nativeDefineLazyGlobal === 'function' &&
        typeof globalThis.__nativeScriptResolveNativeApiLazyGlobal === 'function') {
      try {
        if (nativeDefineLazyGlobal(name, nativeKind, !!force)) {
          return;
        }
      } catch (_) {
      }
    }
    try {
      Object.defineProperty(globalThis, name, {
        configurable: true,
        enumerable: false,
        get: function() {
          var value = resolve(name);
          cacheGlobal(name, value);
          Object.defineProperty(globalThis, name, {
            configurable: true,
            enumerable: false,
            writable: false,
            value: value
          });
          return value;
        }
      });
    } catch (_) {
      var value = resolve(name);
      if (value !== undefined) {
        cacheGlobal(name, value);
        Object.defineProperty(globalThis, name, {
          configurable: true,
          enumerable: false,
          writable: false,
          value: value
        });
      }
    }
  }

  Object.defineProperty(globalThis, '__nativeScriptResolveNativeApiGlobal', {
    configurable: false,
    enumerable: false,
    writable: false,
    value: resolveCachedGlobal
  });

  Object.defineProperty(globalThis, '__nativeScriptResolveNativeApiClassWrapper', {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function(name) {
      return name ? classWrappersByName[name] : undefined;
    }
  });

  function findPrototypeDescriptor(className, property) {
    var prototype;
    if (className && (typeof className === 'object' || typeof className === 'function')) {
      prototype = className;
    } else {
      var wrapper = className ? classWrappersByName[className] : undefined;
      prototype = wrapper && wrapper.prototype;
    }
    while (prototype != null) {
      var descriptor = Object.getOwnPropertyDescriptor(prototype, property);
      if (descriptor) {
        return descriptor;
      }
      prototype = Object.getPrototypeOf(prototype);
    }
    return undefined;
  }

	  Object.defineProperty(globalThis, '__nativeScriptGetNativeApiPrototypeProperty', {
	    configurable: false,
	    enumerable: false,
	    writable: false,
	    value: function(className, receiver, property) {
	      var descriptor = findPrototypeDescriptor(className, property);
	      if (!descriptor) {
	        return { found: false };
	      }
	      if (typeof descriptor.get === 'function') {
	        return { found: true, value: descriptor.get.call(receiver) };
	      }
	      if (typeof descriptor.value === 'function') {
	        return { found: true, value: descriptor.value.bind(receiver) };
	      }
	      if ('value' in descriptor) {
	        return { found: true, value: descriptor.value };
	      }
	      return { found: true, value: undefined };
	    }
	  });

  Object.defineProperty(globalThis, '__nativeScriptCreateNativeApiIterator', {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function(receiver, prototype) {
      if (!receiver || typeof Symbol !== 'function') {
        return undefined;
      }
      var descriptor = findPrototypeDescriptor(prototype || receiver.className, Symbol.iterator);
      if (descriptor && typeof descriptor.value === 'function') {
        return descriptor.value.call(receiver);
      }
      if (descriptor && typeof descriptor.get === 'function') {
        var getterValue = descriptor.get.call(receiver);
        if (typeof getterValue === 'function') {
          return getterValue.call(receiver);
        }
      }
      var iteratorMethod = receiver[Symbol.iterator];
      return typeof iteratorMethod === 'function'
        ? iteratorMethod.call(receiver)
        : undefined;
    }
  });

  function wrapAggregateConstructor(nativeConstructor) {
    if (typeof nativeConstructor !== 'function') {
      return nativeConstructor;
    }
    var aggregate = function NativeScriptAggregate(initialValue) {
      return nativeConstructor(initialValue);
    };
    try {
      Object.defineProperty(aggregate, Symbol.hasInstance, {
        configurable: true,
        enumerable: false,
        value: function(value) {
          return !!value &&
            typeof value === 'object' &&
            value.kind === nativeConstructor.kind &&
            value.name === nativeConstructor.runtimeName;
        }
      });
    } catch (_) {
    }
    ['kind', 'runtimeName', 'metadataOffset', 'sizeof', 'fields', 'equals'].forEach(function(key) {
      try {
        Object.defineProperty(aggregate, key, {
          configurable: true,
          enumerable: false,
          writable: false,
          value: nativeConstructor[key]
        });
      } catch (_) {
      }
    });
    return aggregate;
  }

  function setDescriptorValue(target, property, receiver, value) {
    var descriptor = Object.getOwnPropertyDescriptor(target, property);
    if (!descriptor) {
      return false;
    }
	    if (typeof descriptor.set === 'function') {
	      descriptor.set.call(receiver, value);
	      return true;
	    }
	    if (descriptor.writable) {
	      if (receiver && receiver !== target) {
	        Object.defineProperty(receiver, property, {
	          configurable: true,
	          enumerable: true,
	          writable: true,
	          value: value
	        });
	      } else {
	        target[property] = value;
	      }
	      return true;
	    }
	    return false;
	  }

  function isConstructorOptions(value) {
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
      return false;
    }
    if (value.kind || value.nativeAddress || value instanceof Date) {
      return false;
    }
    return Object.getPrototypeOf(value) === Object.prototype ||
      Object.getPrototypeOf(value) === null;
  }

  function capitalizeToken(value) {
    value = String(value || '');
    return value ? value.charAt(0).toUpperCase() + value.slice(1) : value;
  }

  function selectorCandidatesFromOptions(options) {
    var keys = Object.keys(options || {});
    if (!keys.length) {
      return [];
    }
    var first = capitalizeToken(keys[0]);
    var tail = '';
    for (var i = 1; i < keys.length; i++) {
      tail += keys[i] + ':';
    }
    return [
      'initWith' + first + ':' + tail,
      'init' + first + ':' + tail
    ];
  }

  function valuesFromOptions(options) {
    return Object.keys(options || {}).map(function(key) {
      return options[key];
    });
  }

  function selectorScoreForArguments(selectorName, args) {
    if (!selectorName || selectorName.indexOf('init') !== 0) {
      return -1;
    }
    if (selectorName === 'init') {
      return args.length === 0 ? 100 : -1;
    }
    if (args.length === 0) {
      return -1;
    }
    var lower = selectorName.toLowerCase();
    var first = args[0];
    var score = 1;
    if (Array.isArray(first)) {
      if (lower.indexOf('array') !== -1) {
        score += 40;
      }
    } else if (typeof first === 'string') {
      if (lower.indexOf('string') !== -1) {
        score += 40;
      }
      if (lower.indexOf('url') !== -1) {
        score += 10;
      }
    } else if (typeof first === 'number') {
      if (lower.indexOf('primitive') !== -1) {
        score += 50;
      }
      if (lower.indexOf('int') !== -1 ||
          lower.indexOf('integer') !== -1 ||
          lower.indexOf('number') !== -1 ||
          lower.indexOf('float') !== -1 ||
          lower.indexOf('double') !== -1 ||
          lower.indexOf('long') !== -1 ||
          lower.indexOf('short') !== -1) {
        score += 30;
      }
    } else if (isConstructorOptions(first)) {
      if (lower.indexOf('struct') !== -1 ||
          lower.indexOf('structure') !== -1) {
        score += 40;
      }
      if (lower.indexOf('dictionary') !== -1) {
        score += 20;
      }
    } else if (first === null || typeof first === 'undefined') {
      score += 5;
    } else if (lower.indexOf('object') !== -1 ||
               lower.indexOf('url') !== -1 ||
               lower.indexOf('data') !== -1) {
      score += 20;
    }

    var allStrings = args.length > 1 && args.every(function(value) {
      return typeof value === 'string';
    });
    var allNumbers = args.length > 1 && args.every(function(value) {
      return typeof value === 'number';
    });
    if (allStrings && lower.indexOf('string') !== -1) {
      score += 25;
    }
    if (allNumbers &&
        (lower.indexOf('int') !== -1 || lower.indexOf('number') !== -1)) {
      score += 25;
    }
    return score;
  }

  function initializerMembers(nativeClass, argumentCount) {
    var members = nativeClass.__instanceMembers || [];
    var result = [];
    for (var i = 0; i < members.length; i++) {
      var member = members[i];
      if (!member || member.property || !member.selectorName) {
        continue;
      }
      if (member.selectorName.indexOf('init') !== 0) {
        continue;
      }
      if (typeof argumentCount === 'number' &&
          member.argumentCount !== argumentCount) {
        continue;
      }
      result.push(member);
    }
    return result;
  }

  function chooseInitializer(nativeClass, args, optionSelectors) {
    var members = initializerMembers(nativeClass, args.length);
    if (!members.length) {
      return null;
    }
    if (optionSelectors && optionSelectors.length) {
      for (var i = 0; i < optionSelectors.length; i++) {
        for (var j = 0; j < members.length; j++) {
          if (members[j].selectorName === optionSelectors[i]) {
            return members[j];
          }
        }
      }
    }

    var best = null;
    var bestScore = -1;
    for (var k = 0; k < members.length; k++) {
      var score = selectorScoreForArguments(members[k].selectorName, args);
      if (score > bestScore) {
        bestScore = score;
        best = members[k];
      }
    }
    return bestScore >= 0 ? best : null;
  }

  function chooseInitializerBySelectors(nativeClass, args, selectors) {
    if (!selectors || !selectors.length) {
      return null;
    }
    var members = initializerMembers(nativeClass, args.length);
    for (var i = 0; i < selectors.length; i++) {
      for (var j = 0; j < members.length; j++) {
        if (members[j].selectorName === selectors[i]) {
          return members[j];
        }
      }
    }
    return null;
  }

  function unavailableInitializerError(error) {
    return error &&
      /Objective-C selector is not available/.test(String(error.message || error));
  }

  function constructNativeInstance(nativeClass, args) {
    if (args.length === 1 &&
        args[0] &&
        typeof args[0] === 'object' &&
        (args[0].kind === 'pointer' || args[0].kind === 'reference') &&
        typeof nativeClass.construct === 'function') {
      return nativeClass.construct(args[0]);
    }

    var actualArgs = args;
    var initializer = null;
    if (args.length === 1 && isConstructorOptions(args[0])) {
      var optionSelectors = selectorCandidatesFromOptions(args[0]);
      if (!optionSelectors.length) {
        throw new Error('No initializer found that matches constructor invocation.');
      }
      var optionArgs = valuesFromOptions(args[0]);
      initializer = chooseInitializerBySelectors(
        nativeClass,
        optionArgs,
        optionSelectors
      );
      if (initializer) {
        actualArgs = optionArgs;
      }
    }
    if (!initializer) {
      initializer = chooseInitializer(nativeClass, actualArgs, null);
    }
    if (!initializer) {
      throw new Error('No initializer found that matches constructor invocation.');
    }
    if (typeof nativeClass.alloc !== 'function') {
      throw new Error('Native class cannot be allocated');
    }
    var instance = nativeClass.alloc();
    if (initializer.selectorName === 'init') {
      if (typeof instance.init !== 'function') {
        throw new Error('No initializer found that matches constructor invocation.');
      }
      return instance.init();
    }
    try {
      if (initializer.name && typeof instance[initializer.name] === 'function') {
        return instance[initializer.name].apply(instance, actualArgs);
      }
      var invokeArgs = [initializer.selectorName];
      Array.prototype.push.apply(invokeArgs, actualArgs);
      return instance.invoke.apply(instance, invokeArgs);
    } catch (error) {
      if (unavailableInitializerError(error)) {
        throw new Error('No initializer found that matches constructor invocation.');
      }
      throw error;
    }
  }

	  function wrapNativeClass(nativeClass) {
	    if (!nativeClass || (typeof nativeClass !== 'object' && typeof nativeClass !== 'function')) {
	      return nativeClass;
	    }
    var nativeClassName = nativeClass.runtimeName || nativeClass.name || '';
    if (nativeClassName && classWrappersByName[nativeClassName]) {
      if (classWrappers) {
        try {
          classWrappers.set(nativeClass, classWrappersByName[nativeClassName]);
        } catch (_) {
        }
      }
      return classWrappersByName[nativeClassName];
    }
    if (classWrappers) {
      var cached = classWrappers.get(nativeClass);
      if (cached) {
        return cached;
      }
    }
	    var constructable = function NativeScriptNativeClass() {
	      var args = Array.prototype.slice.call(arguments);
	      var redirectConstructor = this && this.constructor;
	      if (redirectConstructor &&
	          redirectConstructor !== constructable &&
	          redirectConstructor !== wrapper &&
	          typeof redirectConstructor.__nativeApiEnsureClass === 'function') {
	        var redirectedWrapper = redirectConstructor.__nativeApiEnsureClass();
	        if (redirectedWrapper &&
	            redirectedWrapper !== constructable &&
	            redirectedWrapper !== wrapper &&
	            typeof redirectedWrapper.apply === 'function') {
	          return rememberClassOnInstance(
	            redirectedWrapper.apply(this, args),
	            redirectConstructor
	          );
	        }
	      }
		      if (args.length > 0) {
			return rememberInstanceClass(constructNativeInstance(nativeClass, args));
		      }
      if (typeof nativeClass.alloc !== 'function') {
        throw new Error('Native class cannot be allocated');
      }
      var instance = nativeClass.alloc();
      if (instance && typeof instance.init === 'function') {
        return rememberInstanceClass(instance.init());
      }
      return rememberInstanceClass(instance);
	    };
		    function rememberInstanceClass(instance) {
		      return rememberClassOnInstance(instance, wrapper || constructable);
		    }
	    try {
	      Object.defineProperty(constructable, 'name', {
	        configurable: true,
	        enumerable: false,
	        value: nativeClassName || nativeClass.name || 'NativeScriptNativeClass'
	      });
	    } catch (_) {
	    }
	    try {
	      Object.defineProperty(constructable, 'extend', {
        configurable: true,
        enumerable: false,
        writable: false,
        value: function(methods, options) {
          if (methods == null || typeof methods !== 'object') {
            throw new Error('extend() first parameter must be an object');
          }
          var extendOptions = options || {};
          if (typeof Symbol === 'function' &&
              Object.prototype.hasOwnProperty.call(methods, Symbol.iterator)) {
            try {
              extendOptions = Object.assign({}, extendOptions, {
                __hasIterator: true
              });
            } catch (_) {
              extendOptions.__hasIterator = true;
            }
          }
          var extendedNativeClass = api.__extendClass(nativeClass, methods, extendOptions);
          var extended = wrapNativeClass(extendedNativeClass);
          try {
            Object.setPrototypeOf(extended, wrapper || constructable);
          } catch (_) {
          }
          var extendedPrototype = Object.create(constructable.prototype || null);
          try {
            Object.defineProperties(extendedPrototype, Object.getOwnPropertyDescriptors(methods));
          } catch (_) {
            Object.keys(methods).forEach(function(key) {
              extendedPrototype[key] = methods[key];
            });
          }
          try {
            Object.defineProperty(extendedPrototype, 'constructor', {
              configurable: true,
              enumerable: false,
              writable: true,
              value: extended
            });
          } catch (_) {
          }
          extended.prototype = extendedPrototype;
          try {
            api.__rememberClassWrapper(extendedNativeClass, extended, extendedPrototype);
          } catch (_) {
          }
          return extended;
        }
      });
    } catch (_) {
    }
    try {
      Object.defineProperty(constructable, 'alloc', {
        configurable: true,
        enumerable: false,
        writable: true,
        value: function() {
          return rememberInstanceClass(nativeClass.alloc.apply(nativeClass, arguments));
        }
      });
    } catch (_) {
    }
    try {
      Object.defineProperty(constructable, 'new', {
        configurable: true,
        enumerable: false,
        writable: false,
        value: function() {
          if (arguments.length !== 0) {
            throw new Error('new does not take arguments; use invoke for an explicit Objective-C selector.');
          }
          if (typeof nativeClass.alloc !== 'function') {
            throw new Error('Native class cannot be allocated');
          }
          var instance = nativeClass.alloc();
          if (instance && typeof instance.init === 'function') {
            return rememberInstanceClass(instance.init());
          }
          return rememberInstanceClass(instance);
        }
      });
    } catch (_) {
    }
    try {
      Object.defineProperty(constructable, 'caller', {
        configurable: true,
        enumerable: false,
        writable: false,
        value: null
      });
    } catch (_) {
    }
    try {
      Object.defineProperty(constructable, 'arguments', {
        configurable: true,
        enumerable: false,
        writable: false,
        value: null
      });
    } catch (_) {
    }
    var basePrototypeTarget = {};
    var classMembersInstalled = false;
    function installClassMembers(target, members, receiverIsClass) {
      if (!target || !members || typeof members.length !== 'number') {
        return;
      }
      for (var i = 0; i < members.length; i++) {
        var member = members[i];
        if (!member || !member.name || Object.prototype.hasOwnProperty.call(target, member.name)) {
          continue;
        }
        try {
          if (member.property) {
            var descriptor = {
              configurable: true,
              enumerable: false,
              get: receiverIsClass
                ? (function(name, selectorName) {
                    return function() {
                      return selectorName
                        ? nativeClass.invoke(selectorName)
                        : nativeClass[name];
                    };
                  })(member.name, member.selectorName)
                : (function(name) {
                    return function() {
                      return api.__invokeBase(nativeClass, this, name);
                    };
                  })(member.name)
            };
            if (!member.readonly) {
              descriptor.set = receiverIsClass
                ? (function(name, setterSelectorName) {
                    return function(value) {
                      if (setterSelectorName) {
                        return nativeClass.invoke(setterSelectorName, value);
                      }
                      nativeClass[name] = value;
                    };
                  })(member.name, member.setterSelectorName)
                : (function(name) {
                    return function(value) {
                      return api.__invokeBase(nativeClass, this, name, value);
                    };
                  })(member.name);
            }
            Object.defineProperty(target, member.name, descriptor);
          } else {
            Object.defineProperty(target, member.name, {
              configurable: true,
              enumerable: false,
              writable: true,
              value: receiverIsClass
                ? (function(name) {
                    return function() {
                      if (this && typeof this === 'object' && this.kind === 'object') {
                        var baseArgs = [nativeClass, this, name];
                        Array.prototype.push.apply(baseArgs, arguments);
                        return api.__invokeBase.apply(api, baseArgs);
                      }
                      return nativeClass[name].apply(nativeClass, arguments);
                    };
                  })(member.name)
                : (function(name) {
                    return function() {
                      var args = [nativeClass, this, name];
                      Array.prototype.push.apply(args, arguments);
                      return api.__invokeBase.apply(api, args);
                    };
                  })(member.name)
            });
          }
        } catch (_) {
        }
      }
    }
    function installNativeClassMembersIfNeeded() {
      if (classMembersInstalled) {
        return;
      }
      classMembersInstalled = true;
      installClassMembers(constructable, nativeClass.__staticMembers, true);
      installClassMembers(basePrototypeTarget, nativeClass.__instanceMembers, false);
      try {
        delete constructable.__nativeApiInstallMembers;
      } catch (_) {
      }
    }
    try {
      Object.defineProperty(constructable, '__nativeApiInstallMembers', {
        configurable: true,
        enumerable: false,
        writable: false,
        value: installNativeClassMembersIfNeeded
      });
    } catch (_) {
    }
    try {
      Object.defineProperty(basePrototypeTarget, 'constructor', {
        configurable: true,
        enumerable: false,
        writable: true,
        value: constructable
      });
    } catch (_) {
    }
    try {
      Object.defineProperty(basePrototypeTarget, 'toString', {
        configurable: true,
        enumerable: false,
        writable: true,
        value: function() {
          return '[object NativeScriptObject]';
        }
      });
    } catch (_) {
    }
    try {
      if (typeof Symbol === 'function' && Symbol.iterator &&
          typeof api.__fastEnumeration === 'function') {
        Object.defineProperty(basePrototypeTarget, Symbol.iterator, {
          configurable: true,
          enumerable: false,
          writable: true,
          value: function() {
            return api.__fastEnumeration(this);
          }
        });
      }
    } catch (_) {
    }
    constructable.prototype = typeof Proxy === 'function'
      ? new Proxy(basePrototypeTarget, {
          get: function(target, property, receiver) {
            installNativeClassMembersIfNeeded();
            if (property in target) {
              return Reflect.get(target, property, receiver);
            }
            if (typeof property === 'symbol') {
              return undefined;
            }
            return function() {
              var args = [nativeClass, this, String(property)];
              Array.prototype.push.apply(args, arguments);
              return api.__invokeBase.apply(api, args);
            };
          },
          set: function(target, property, value, receiver) {
            if (property === 'prototype') {
              target[property] = value;
              return true;
            }
            if (setDescriptorValue(target, property, receiver, value)) {
              return true;
            }
            if (receiver && receiver !== target) {
              Object.defineProperty(receiver, property, {
                configurable: true,
                enumerable: true,
                writable: true,
                value: value
              });
              return true;
            }
            target[property] = value;
            return true;
          },
          has: function(target, property) {
            installNativeClassMembersIfNeeded();
            return property in target;
          },
          ownKeys: function(target) {
            installNativeClassMembersIfNeeded();
            return Reflect.ownKeys(target);
          },
          getOwnPropertyDescriptor: function(target, property) {
            installNativeClassMembersIfNeeded();
            return Reflect.getOwnPropertyDescriptor(target, property);
          }
        })
      : basePrototypeTarget;
    try {
      Object.defineProperty(constructable, Symbol.hasInstance, {
        configurable: true,
        enumerable: false,
        value: function(value) {
          if (!value || typeof value !== 'object') {
            return false;
          }
          var expectedName = nativeClass.runtimeName || nativeClass.name;
          try {
            if (typeof value.isKindOfClass === 'function' &&
                value.isKindOfClass(constructable)) {
              return true;
            }
          } catch (_) {
          }
          try {
            var current = typeof value.class === 'function' ? value.class() : null;
            while (current) {
              if (current === wrapper || current === constructable) {
                return true;
              }
              var currentName = current.runtimeName || current.name;
              if (typeof expectedName === 'string' && currentName === expectedName) {
                return true;
              }
              var next = current.superclass || null;
              if (typeof next === 'function' && next.kind !== 'class') {
                next = next.call(current);
              }
              current = next || null;
            }
          } catch (_) {
          }
          return typeof expectedName === 'string' && value.className === expectedName;
        }
      });
    } catch (_) {
    }
    var cachedNativeFunctions = typeof Map === 'function' ? new Map() : null;
	    var wrapper = typeof Proxy === 'function'
	      ? new Proxy(constructable, {
          get: function(target, property, receiver) {
            if (property === '__nativeApiClass') {
              return nativeClass;
            }
            if (property === 'toString') {
              return function() {
                return String(nativeClass);
              };
            }
            if (property === 'hasOwnProperty') {
              return function(key) {
                installNativeClassMembersIfNeeded();
                return Object.prototype.hasOwnProperty.call(target, key);
              };
            }
            if (Object.prototype.hasOwnProperty.call(target, property) ||
                property === 'prototype' ||
                property === 'length' ||
                property === 'name') {
              return Reflect.get(target, property, receiver);
            }
            installNativeClassMembersIfNeeded();
            if (Object.prototype.hasOwnProperty.call(target, property)) {
              return Reflect.get(target, property, receiver);
            }
            if (cachedNativeFunctions && cachedNativeFunctions.has(property)) {
              return cachedNativeFunctions.get(property);
            }
            var nativeValue = nativeClass[property];
            if (nativeValue !== undefined) {
              if (typeof nativeValue === 'function') {
                if (cachedNativeFunctions) {
                  cachedNativeFunctions.set(property, nativeValue);
                }
                try {
                  Object.defineProperty(target, property, {
                    configurable: true,
                    enumerable: false,
                    writable: false,
                    value: nativeValue
                  });
                } catch (_) {
                }
              }
              return nativeValue;
            }
            var reflected = Reflect.get(target, property, receiver);
            if (reflected !== undefined || property in target) {
              return reflected;
            }
            installNativeClassMembersIfNeeded();
            reflected = Reflect.get(target, property, receiver);
            if (reflected !== undefined || property in target) {
              return reflected;
            }
            return reflected;
          },
          set: function(target, property, value, receiver) {
            if (property === 'prototype') {
              target[property] = value;
              return true;
            }
            if (setDescriptorValue(target, property, receiver, value)) {
              return true;
            }
            try {
              nativeClass[property] = value;
              return true;
            } catch (_) {
            }
            if (receiver && receiver !== target) {
              Object.defineProperty(receiver, property, {
                configurable: true,
                enumerable: true,
                writable: true,
                value: value
              });
              return true;
            }
            return Reflect.set(target, property, value, receiver);
          },
          has: function(target, property) {
            installNativeClassMembersIfNeeded();
            return property in target || property in nativeClass;
          },
          ownKeys: function(target) {
            installNativeClassMembersIfNeeded();
            return Reflect.ownKeys(target).filter(function(key) {
              return key !== 'new' &&
                key !== 'hasOwnProperty' &&
                key !== '__nativeApiInstallMembers';
            });
          },
          getOwnPropertyDescriptor: function(target, property) {
            installNativeClassMembersIfNeeded();
            return Reflect.getOwnPropertyDescriptor(target, property);
          }
	        })
	      : constructable;
	    if (classWrappers) {
	      classWrappers.set(nativeClass, wrapper);
	    }
    try {
      var nativeSuperclass = nativeClass.__superclass;
      if (nativeSuperclass && nativeSuperclass !== nativeClass) {
        var superclassWrapper = wrapNativeClass(nativeSuperclass);
        if (superclassWrapper && superclassWrapper !== wrapper &&
            typeof Object.setPrototypeOf === 'function') {
          Object.setPrototypeOf(wrapper, superclassWrapper);
        }
      }
    } catch (_) {
    }
    try {
      api.__rememberClassWrapper(nativeClass, wrapper, constructable.prototype);
    } catch (_) {
    }
    if (nativeClassName) {
      classWrappersByName[nativeClassName] = wrapper;
      cacheGlobal(nativeClassName, wrapper);
      if (!Object.prototype.hasOwnProperty.call(globalThis, nativeClassName)) {
        try {
          Object.defineProperty(globalThis, nativeClassName, {
            configurable: true,
            enumerable: false,
            writable: false,
            value: wrapper
          });
        } catch (_) {
        }
      }
    }
    if (nativeClass.name && nativeClass.name !== nativeClassName) {
      classWrappersByName[nativeClass.name] = wrapper;
      cacheGlobal(nativeClass.name, wrapper);
    }
	    return wrapper;
	  }

	  function rememberClassOnInstance(instance, classWrapper) {
	    if (instance && typeof instance === 'object' && classWrapper) {
	      try {
	        if (typeof api.__rememberObjectClassWrapper === 'function') {
	          api.__rememberObjectClassWrapper(instance, classWrapper);
	        } else {
	          instance.__nativeApiClassWrapper = classWrapper;
	        }
	      } catch (_) {
	      }
	    }
	    return instance;
	  }

	  function isNativeClassLike(value) {
	    if (!value || (typeof value !== 'object' && typeof value !== 'function')) {
	      return false;
	    }
	    if (value.kind === 'class') {
	      return true;
	    }
	    try {
	      return !!value.__nativeApiClass;
	    } catch (_) {
	      return false;
	    }
	  }

	  function nativeClassLikeHandle(value) {
	    if (!value || (typeof value !== 'object' && typeof value !== 'function')) {
	      return value;
	    }
	    try {
	      if (typeof value.__nativeApiEnsureClass === 'function') {
	        value = value.__nativeApiEnsureClass();
	      }
	    } catch (_) {
	    }
	    try {
	      return value.__nativeApiClass || value;
	    } catch (_) {
	      return value;
	    }
	  }

	  function materializeTypeScriptNativeClass(constructor) {
	    if (!constructor || typeof constructor !== 'function') {
	      return undefined;
	    }
	    var state = constructor.__nativeApiTypeScriptState;
	    if (!state) {
	      return undefined;
	    }
	    if (state.wrapper) {
	      return state.wrapper;
	    }
	    if (state.materializing) {
	      return state.base;
	    }

	    state.materializing = true;
	    try {
	      var baseWrapper = state.base;
	      if (baseWrapper && typeof baseWrapper.__nativeApiEnsureClass === 'function') {
	        baseWrapper = baseWrapper.__nativeApiEnsureClass();
	      }

	      var options = {};
	      var className = constructor.ObjCClassName || constructor.name;
	      if (className) {
	        options.name = className;
	      }
	      if (constructor.ObjCProtocols) {
	        options.protocols = constructor.ObjCProtocols;
	      }
	      if (constructor.ObjCExposedMethods) {
	        options.exposedMethods = constructor.ObjCExposedMethods;
	      }

	      var nativeBase = nativeClassLikeHandle(baseWrapper);
	      var nativeClass = api.__extendClass(nativeBase, constructor.prototype || {}, options);
	      var wrapper = wrapNativeClass(nativeClass);
	      state.wrapper = wrapper;

	      try {
	        Object.setPrototypeOf(constructor, wrapper);
	      } catch (_) {
	      }
	      try {
	        api.__rememberClassWrapper(nativeClass, constructor, constructor.prototype || {});
	      } catch (_) {
	      }
	      return wrapper;
	    } finally {
	      state.materializing = false;
	    }
	  }

	  function defineTypeScriptStaticForwarder(constructor, name, isProperty, readonly) {
	    if (!name || name === 'length' || name === 'name' || name === 'prototype' ||
	        Object.prototype.hasOwnProperty.call(constructor, name)) {
	      return;
	    }

	    var descriptor = {
	      configurable: true,
	      enumerable: false
	    };

	    if (isProperty) {
	      descriptor.get = function() {
	        var wrapper = materializeTypeScriptNativeClass(constructor);
	        return wrapper ? wrapper[name] : undefined;
	      };
	      if (!readonly) {
	        descriptor.set = function(value) {
	          var wrapper = materializeTypeScriptNativeClass(constructor);
	          if (wrapper) {
	            wrapper[name] = value;
	          }
	        };
	      }
	    } else {
	      descriptor.writable = true;
	      descriptor.value = function() {
	        if (name === 'class') {
	          materializeTypeScriptNativeClass(constructor);
	          return constructor;
	        }
	        if (name === 'superclass') {
	          var state = constructor.__nativeApiTypeScriptState;
	          return state && state.base;
	        }
	        var wrapper = materializeTypeScriptNativeClass(constructor);
	        var member = wrapper && wrapper[name];
	        if (typeof member !== 'function') {
	          throw new TypeError(String(name) + ' is not a function');
	        }
	        var result = member.apply(wrapper, arguments);
	        if (name === 'alloc' || name === 'new' || name === 'construct') {
	          return rememberClassOnInstance(result, constructor);
	        }
	        return result;
	      };
	    }

	    try {
	      Object.defineProperty(constructor, name, descriptor);
	    } catch (_) {
	    }
	  }

	  function installTypeScriptNativeClassSupport(constructor, base) {
	    if (!constructor || typeof constructor !== 'function' || !isNativeClassLike(base)) {
	      return false;
	    }
	    if (constructor.__nativeApiTypeScriptState) {
	      return true;
	    }

	    try {
	      Object.defineProperty(constructor, '__nativeApiTypeScriptState', {
	        configurable: false,
	        enumerable: false,
	        writable: false,
	        value: {
	          base: base,
	          wrapper: null,
	          materializing: false
	        }
	      });
	    } catch (_) {
	      constructor.__nativeApiTypeScriptState = {
	        base: base,
	        wrapper: null,
	        materializing: false
	      };
	    }

	    try {
	      Object.defineProperty(constructor, '__nativeApiEnsureClass', {
	        configurable: false,
	        enumerable: false,
	        writable: false,
	        value: function() {
	          return materializeTypeScriptNativeClass(constructor);
	        }
	      });
	    } catch (_) {
	    }

	    try {
	      Object.defineProperty(constructor, '__nativeApiClass', {
	        configurable: true,
	        enumerable: false,
	        get: function() {
	          var wrapper = materializeTypeScriptNativeClass(constructor);
	          return wrapper && wrapper.__nativeApiClass;
	        }
	      });
	    } catch (_) {
	    }

	    ['alloc', 'new', 'class', 'superclass', 'extend'].forEach(function(name) {
	      defineTypeScriptStaticForwarder(constructor, name, false, false);
	    });

	    try {
	      var members = base.__staticMembers || [];
	      for (var i = 0; i < members.length; i++) {
	        var member = members[i];
	        if (member && member.name) {
	          defineTypeScriptStaticForwarder(
	            constructor,
	            member.name,
	            !!member.property,
	            !!member.readonly
	          );
	        }
	      }
	    } catch (_) {
	    }

	    return true;
	  }

	  function installTypeScriptNativeHelpers() {
	    var extendStatics = Object.setPrototypeOf ||
	      ({ __proto__: [] } instanceof Array && function(d, b) { d.__proto__ = b; }) ||
	      function(d, b) {
	        for (var p in b) {
	          if (Object.prototype.hasOwnProperty.call(b, p)) {
	            d[p] = b[p];
	          }
	        }
	      };

	    globalThis.__extends = function(d, b) {
	      if (typeof b !== 'function' && b !== null) {
	        throw new TypeError('Class extends value ' + String(b) + ' is not a constructor or null');
	      }
	      extendStatics(d, b);
	      function __() { this.constructor = d; }
	      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	      if (b !== null) {
	        installTypeScriptNativeClassSupport(d, b);
	      }
	    };

	    globalThis.NativeClass = function NativeClass(constructor) {
	      if (constructor && typeof constructor.__nativeApiEnsureClass === 'function') {
	        constructor.__nativeApiEnsureClass();
	      }
	      return constructor;
	    };

	    globalThis.ObjCClass = function ObjCClass() {
	      var protocols = Array.prototype.slice.call(arguments);
	      return function(constructor) {
	        if (constructor.ObjCProtocols) {
	          Array.prototype.push.apply(constructor.ObjCProtocols, protocols);
	        } else {
	          constructor.ObjCProtocols = protocols;
	        }
	        if (typeof constructor.__nativeApiEnsureClass === 'function') {
	          constructor.__nativeApiEnsureClass();
	        }
	        return constructor;
	      };
	    };
	  }

	  function wrapInteropFactory(nativeFactory, properties) {
	    if (typeof nativeFactory !== 'function' || nativeFactory.__nativeScriptConstructable) {
	      return nativeFactory;
	    }
    var constructable = function NativeScriptInteropValue() {
      return nativeFactory.apply(undefined, arguments);
    };
    try {
      if (nativeFactory.prototype) {
        constructable.prototype = nativeFactory.prototype;
      }
    } catch (_) {
    }
    try {
      Object.defineProperty(constructable, Symbol.hasInstance, {
        configurable: true,
        enumerable: false,
        value: function(value) {
          return !!value && typeof value === 'object' && value.kind === properties.kind;
        }
      });
    } catch (_) {
    }
    Object.keys(properties).forEach(function(key) {
      try {
        Object.defineProperty(constructable, key, {
          configurable: true,
          enumerable: false,
          writable: false,
          value: properties[key]
        });
      } catch (_) {
      }
    });
    Object.defineProperty(constructable, '__nativeScriptConstructable', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: true
    });
    return constructable;
  }

  function installInteropConstructors() {
    var interop = globalThis.interop;
    if (!interop || typeof interop !== 'object') {
      return;
    }
    var pointerSize;
    try {
      if (typeof interop.sizeof === 'function' && interop.types && interop.types.pointer !== undefined) {
        pointerSize = interop.sizeof(interop.types.pointer);
      }
    } catch (_) {
      pointerSize = undefined;
    }
    interop.Pointer = wrapInteropFactory(interop.Pointer, { kind: 'pointer', sizeof: pointerSize });
    interop.Reference = wrapInteropFactory(interop.Reference, { kind: 'reference', sizeof: pointerSize });
    interop.FunctionReference = wrapInteropFactory(
      interop.FunctionReference,
      { kind: 'functionReference', sizeof: pointerSize }
    );
    if (interop.types && typeof interop.types === 'object') {
      Object.keys(interop.types).forEach(function(name) {
        var value = interop.types[name];
        if (typeof value !== 'number') {
          return;
        }
        var boxed = {
          valueOf: function() { return value; },
          toString: function() { return String(value); }
        };
        Object.defineProperty(boxed, typeCodeKey, {
          configurable: false,
          enumerable: false,
          writable: false,
          value: value
        });
        interop.types[name] = boxed;
      });
    }
  }

  function defineInlineFunction(name, value) {
    if (Object.prototype.hasOwnProperty.call(globalThis, name)) {
      return;
    }
    Object.defineProperty(globalThis, name, {
      configurable: true,
      enumerable: false,
      writable: true,
      value: value
    });
  }

  function installInlineFunctions() {
    var makePoint = function(x, y) { return { x: x, y: y }; };
    var makeSize = function(width, height) { return { width: width, height: height }; };
    var makeRect = function(x, y, width, height) {
      return { origin: { x: x, y: y }, size: { width: width, height: height } };
    };
    defineInlineFunction('CGPointMake', makePoint);
    defineInlineFunction('NSMakePoint', makePoint);
    defineInlineFunction('CGSizeMake', makeSize);
    defineInlineFunction('NSMakeSize', makeSize);
    defineInlineFunction('CGRectMake', makeRect);
    defineInlineFunction('NSMakeRect', makeRect);
    defineInlineFunction('NSMakeRange', function(location, length) {
      return { location: location, length: length };
    });
    defineInlineFunction('UIEdgeInsetsMake', function(top, left, bottom, right) {
      return { top: top, left: left, bottom: bottom, right: right };
    });
  }

  function names(kind) {
    var metadata = api.metadata;
    var fn = metadata && metadata[kind];
    return typeof fn === 'function' ? fn() : [];
  }

  function nameSet(values) {
    var result = Object.create(null);
    (values || []).forEach(function(value) {
      result[value] = true;
    });
    return result;
  }

  var classNameList = names('classNames');
  var functionNameList = names('functionNames');
  var constantNameList = names('constantNames');
  var protocolNameList = names('protocolNames');
  var enumNameList = names('enumNames');
  var functionNameSet = nameSet(functionNameList);
  var constantNameSet = nameSet(constantNameList);
  var classNameSet = nameSet(classNameList);
  var protocolNameSet = nameSet(protocolNameList);
  var enumNameSet = nameSet(enumNameList);

  function resolveNativeApiEnum(enumName) {
    return (api.getEnum && api.getEnum(enumName)) || api[enumName];
  }

  Object.defineProperty(globalThis, '__nativeScriptResolveNativeApiLazyGlobal', {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function(name, kind) {
      var value;
      if (kind === 'class') {
        value = wrapNativeClass(api[name]);
      } else if (kind === 'function' || kind === 'constant') {
        value = api[name];
      } else if (kind === 'protocol') {
        value = (api.getProtocol && api.getProtocol(name)) || api[name];
      } else if (kind === 'enum') {
        value = resolveNativeApiEnum(name);
      } else if (kind === 'struct') {
        value = wrapAggregateConstructor((api.getStruct && api.getStruct(name)) || api[name]);
      } else if (kind === 'union') {
        value = wrapAggregateConstructor((api.getUnion && api.getUnion(name)) || api[name]);
      } else if (kind && kind.indexOf('enumMember:') === 0) {
        var enumValue = resolveNativeApiEnum(kind.slice('enumMember:'.length));
        value = enumValue && enumValue[name];
      } else {
        value = api[name];
      }
      cacheGlobal(name, value);
      return value;
    }
  });

  classNameList.forEach(function(name) {
    defineLazyGlobal(name, function(className) {
      return wrapNativeClass(api[className]);
    }, false, 'class');
  });
  functionNameList.forEach(function(name) {
    defineLazyGlobal(name, function(functionName) {
      return api[functionName];
    }, false, 'function');
  });
  constantNameList.forEach(function(name) {
    defineLazyGlobal(name, function(constantName) {
      return api[constantName];
    }, false, 'constant');
  });
  protocolNameList.forEach(function(name) {
    defineLazyGlobal(name, function(protocolName) {
      return (api.getProtocol && api.getProtocol(protocolName)) || api[protocolName];
    }, false, 'protocol');
  });
  enumNameList.forEach(function(name) {
    defineLazyGlobal(name, resolveNativeApiEnum, false, 'enum');
    var enumValue = resolveNativeApiEnum(name);
    if (!enumValue || typeof enumValue !== 'object') {
      return;
    }
    Object.keys(enumValue).forEach(function(memberName) {
      if (/^-?\d+$/.test(memberName)) {
        return;
      }
      defineLazyGlobal(memberName, function() {
        return enumValue[memberName];
      }, false, 'enumMember:' + name);
    });
  });
  names('structNames').forEach(function(name) {
    var conflictsWithValue =
      !!functionNameSet[name] || !!constantNameSet[name] || !!classNameSet[name] ||
      !!protocolNameSet[name] || !!enumNameSet[name];
    defineLazyGlobal(name, function(structName) {
      return wrapAggregateConstructor((api.getStruct && api.getStruct(structName)) || api[structName]);
    }, !conflictsWithValue, 'struct');
  });
  names('unionNames').forEach(function(name) {
    var conflictsWithValue =
      !!functionNameSet[name] || !!constantNameSet[name] || !!classNameSet[name] ||
      !!protocolNameSet[name] || !!enumNameSet[name];
    defineLazyGlobal(name, function(unionName) {
      return wrapAggregateConstructor((api.getUnion && api.getUnion(unionName)) || api[unionName]);
    }, !conflictsWithValue, 'union');
  });

  if (typeof globalThis.UIColor === 'undefined' &&
      typeof globalThis.NSColor !== 'undefined') {
    globalThis.UIColor = globalThis.NSColor;
    cacheGlobal('UIColor', globalThis.UIColor);
  }
  var colorCtor = globalThis.UIColor || globalThis.NSColor;
  if (colorCtor && colorCtor.prototype &&
      typeof colorCtor.prototype.initWithRedGreenBlueAlpha !== 'function') {
    colorCtor.prototype.initWithRedGreenBlueAlpha = function(red, green, blue, alpha) {
      if (typeof this.initWithSRGBRedGreenBlueAlpha === 'function') {
        return this.initWithSRGBRedGreenBlueAlpha(red, green, blue, alpha);
      }
      if (typeof this.initWithCalibratedRedGreenBlueAlpha === 'function') {
        return this.initWithCalibratedRedGreenBlueAlpha(red, green, blue, alpha);
      }
      if (typeof colorCtor.colorWithSRGBRedGreenBlueAlpha === 'function') {
        return colorCtor.colorWithSRGBRedGreenBlueAlpha(red, green, blue, alpha);
      }
      if (typeof colorCtor.colorWithCalibratedRedGreenBlueAlpha === 'function') {
        return colorCtor.colorWithCalibratedRedGreenBlueAlpha(red, green, blue, alpha);
      }
      return this;
    };
  }
  defineLazyGlobal('CC_SHA256', function() { return api.CC_SHA256; });

	  installInteropConstructors();
	  installTypeScriptNativeHelpers();
	  installInlineFunctions();

  try {
    Object.defineProperty(globalThis, installedFlagName, {
      configurable: false,
      enumerable: false,
      writable: false,
      value: true
    });
  } catch (_) {
  }
})
)JSI_GLOBALS";

  std::string script(GlobalInstaller);
  script += "(";
  script += jsStringLiteral(globalName);
  script += ");";
  runtime.evaluateJavaScript(std::make_shared<StringBuffer>(std::move(script)),
                             "NativeApiJsiGlobals.js");
  NativeApiJsiWriteSmokeStage("jsi:globals:after-eval");
}

void InstallNativeApiJSI(Runtime& runtime, const NativeApiJsiConfig& config) {
  const char* globalName = config.globalName != nullptr && config.globalName[0] != '\0'
                               ? config.globalName
                               : "__nativeScriptNativeApi";
  NativeApiJsiWriteSmokeStage("jsi:create-api");
  Object api = CreateNativeApiJSI(runtime, config);
  Object global = runtime.global();
  NativeApiJsiWriteSmokeStage("jsi:set-global");
  global.setProperty(runtime, globalName, api);

  NativeApiJsiWriteSmokeStage("jsi:set-interop");
  Value existingInterop = global.getProperty(runtime, "interop");
  if (existingInterop.isUndefined() || existingInterop.isNull()) {
    global.setProperty(runtime, "interop", api.getProperty(runtime, "interop"));
  }
  if (config.installGlobalSymbols) {
    NativeApiJsiWriteSmokeStage("jsi:install-globals");
    InstallNativeApiJsiGlobalSymbols(runtime, globalName);
  } else {
    NativeApiJsiWriteSmokeStage("jsi:install-aggregate-globals");
    InstallAggregateGlobals(runtime, api, "protocolNames");
  }
  NativeApiJsiWriteSmokeStage("jsi:installed");
}
