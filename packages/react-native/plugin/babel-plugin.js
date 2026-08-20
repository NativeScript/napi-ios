const PACKAGE_NAME = '@nativescript/react-native';
const UIKIT_DEFINITION_CALLEES = new Set([
  'defineUIKitContainer',
  'defineUIKitView',
  'defineUIViewController',
]);
const UIKIT_WORKLET_CALLBACKS = new Set([
  'create',
  'createController',
  'childrenView',
  'dispose',
  'mounted',
  'update',
]);

function isDirectiveFunction(path) {
  const body = path.node.body;
  if (!body || body.type !== 'BlockStatement') {
    return null;
  }

  const directives = body.directives || [];
  for (const directive of directives) {
    const value = directive.value && directive.value.value;
    if (value === 'use ui') {
      return 'ui';
    }
    if (value === 'use js') {
      return 'js';
    }
  }
  return null;
}

function isNativeScriptSource(value) {
  return value === PACKAGE_NAME;
}

function findNativeScriptIdentifier(programPath, t) {
  for (const statement of programPath.get('body')) {
    if (!statement.isImportDeclaration()) {
      continue;
    }
    if (!isNativeScriptSource(statement.node.source.value)) {
      continue;
    }
    for (const specifier of statement.node.specifiers) {
      if (
        t.isImportDefaultSpecifier(specifier) ||
        t.isImportNamespaceSpecifier(specifier)
      ) {
        return specifier.local.name;
      }
    }
  }

  for (const statement of programPath.get('body')) {
    if (!statement.isVariableDeclaration()) {
      continue;
    }
    for (const declaration of statement.node.declarations) {
      if (!t.isIdentifier(declaration.id)) {
        continue;
      }
      const init = declaration.init;
      if (
        t.isCallExpression(init) &&
        t.isIdentifier(init.callee, {name: 'require'}) &&
        init.arguments.length === 1 &&
        t.isStringLiteral(init.arguments[0], {value: PACKAGE_NAME})
      ) {
        return declaration.id.name;
      }
      if (
        t.isMemberExpression(init) &&
        !init.computed &&
        t.isIdentifier(init.property, {name: 'default'}) &&
        t.isCallExpression(init.object) &&
        t.isIdentifier(init.object.callee, {name: 'require'}) &&
        init.object.arguments.length === 1 &&
        t.isStringLiteral(init.object.arguments[0], {value: PACKAGE_NAME})
      ) {
        return declaration.id.name;
      }
    }
  }

  return null;
}

function collectNativeScriptBindings(programPath, t) {
  const nativeScriptIdentifiers = new Set();
  const uikitDefinitionIdentifiers = new Set();

  for (const statement of programPath.get('body')) {
    if (statement.isImportDeclaration()) {
      if (!isNativeScriptSource(statement.node.source.value)) {
        continue;
      }
      for (const specifier of statement.node.specifiers) {
        if (
          t.isImportDefaultSpecifier(specifier) ||
          t.isImportNamespaceSpecifier(specifier)
        ) {
          nativeScriptIdentifiers.add(specifier.local.name);
        } else if (t.isImportSpecifier(specifier)) {
          const imported = specifier.imported;
          const importedName = t.isIdentifier(imported)
            ? imported.name
            : imported.value;
          if (UIKIT_DEFINITION_CALLEES.has(importedName)) {
            uikitDefinitionIdentifiers.add(specifier.local.name);
          }
        }
      }
      continue;
    }

    if (!statement.isVariableDeclaration()) {
      continue;
    }
    for (const declaration of statement.node.declarations) {
      const init = declaration.init;
      const requiredNativeScript =
        t.isCallExpression(init) &&
        t.isIdentifier(init.callee, {name: 'require'}) &&
        init.arguments.length === 1 &&
        t.isStringLiteral(init.arguments[0], {value: PACKAGE_NAME});
      const requiredNativeScriptDefault =
        t.isMemberExpression(init) &&
        !init.computed &&
        t.isIdentifier(init.property, {name: 'default'}) &&
        t.isCallExpression(init.object) &&
        t.isIdentifier(init.object.callee, {name: 'require'}) &&
        init.object.arguments.length === 1 &&
        t.isStringLiteral(init.object.arguments[0], {value: PACKAGE_NAME});
      if (t.isIdentifier(declaration.id)) {
        if (requiredNativeScript || requiredNativeScriptDefault) {
          nativeScriptIdentifiers.add(declaration.id.name);
        }
      } else if (t.isObjectPattern(declaration.id) && requiredNativeScript) {
        for (const property of declaration.id.properties) {
          if (!t.isObjectProperty(property)) {
            continue;
          }
          const key = property.key;
          const value = property.value;
          const keyName = t.isIdentifier(key) ? key.name : key.value;
          if (
            UIKIT_DEFINITION_CALLEES.has(keyName) &&
            t.isIdentifier(value)
          ) {
            uikitDefinitionIdentifiers.add(value.name);
          }
        }
      }
    }
  }

  return {
    nativeScriptIdentifiers,
    uikitDefinitionIdentifiers,
  };
}

function ensureNativeScriptIdentifier(programPath, state, t) {
  if (state.nativeScriptIdentifier) {
    return state.nativeScriptIdentifier;
  }

  const existing = findNativeScriptIdentifier(programPath, t);
  if (existing) {
    state.nativeScriptIdentifier = existing;
    return existing;
  }

  const identifier = programPath.scope.generateUidIdentifier('NativeScript');
  state.nativeScriptIdentifier = identifier.name;

  if (programPath.node.sourceType === 'script') {
    const moduleIdentifier =
      programPath.scope.generateUidIdentifier('NativeScriptModule');
    programPath.unshiftContainer(
      'body',
      t.variableDeclaration('const', [
        t.variableDeclarator(
          moduleIdentifier,
          t.callExpression(t.identifier('require'), [
            t.stringLiteral(PACKAGE_NAME),
          ]),
        ),
        t.variableDeclarator(
          identifier,
          t.logicalExpression(
            '||',
            t.memberExpression(moduleIdentifier, t.identifier('default')),
            moduleIdentifier,
          ),
        ),
      ]),
    );
  } else {
    programPath.unshiftContainer(
      'body',
      t.importDeclaration(
        [t.importDefaultSpecifier(identifier)],
        t.stringLiteral(PACKAGE_NAME),
      ),
    );
  }

  return identifier.name;
}

function isUIKitDefinitionCall(path, state, t) {
  const callee = path.node.callee;
  if (
    t.isIdentifier(callee) &&
    state.uikitDefinitionIdentifiers?.has(callee.name)
  ) {
    return true;
  }
  if (
    t.isMemberExpression(callee) &&
    !callee.computed &&
    t.isIdentifier(callee.object) &&
    t.isIdentifier(callee.property) &&
    state.nativeScriptIdentifiers?.has(callee.object.name) &&
    UIKIT_DEFINITION_CALLEES.has(callee.property.name)
  ) {
    return true;
  }
  return false;
}

function propertyKeyName(property, t) {
  const key = property.node.key;
  if (t.isIdentifier(key)) {
    return key.name;
  }
  if (t.isStringLiteral(key)) {
    return key.value;
  }
  return null;
}

function ensureWorkletDirective(functionNode, t) {
  if (!functionNode.body) {
    return;
  }
  if (!t.isBlockStatement(functionNode.body)) {
    functionNode.body = t.blockStatement([
      t.returnStatement(functionNode.body),
    ]);
  }
  const directives = functionNode.body.directives || [];
  if (directives.some((directive) => directive.value?.value === 'worklet')) {
    return;
  }
  functionNode.body.directives = [
    t.directive(t.directiveLiteral('worklet')),
    ...directives,
  ];
}

function workletizeUIKitDefinitionCallbacks(path, state, t) {
  if (!isUIKitDefinitionCall(path, state, t)) {
    return;
  }

  const definition = path.get('arguments')[0];
  if (!definition || !definition.isObjectExpression()) {
    return;
  }

  for (const property of definition.get('properties')) {
    if (property.isSpreadElement()) {
      continue;
    }
    const keyName = propertyKeyName(property, t);
    if (!UIKIT_WORKLET_CALLBACKS.has(keyName)) {
      continue;
    }
    if (property.isObjectMethod()) {
      ensureWorkletDirective(property.node, t);
    } else if (property.isObjectProperty()) {
      const value = property.get('value');
      if (value.isFunctionExpression() || value.isArrowFunctionExpression()) {
        ensureWorkletDirective(value.node, t);
      }
    }
  }
}

function isAlreadyWrapped(path, t) {
  const parent = path.parentPath;
  if (!parent || !parent.isCallExpression()) {
    return false;
  }
  const callee = parent.node.callee;
  return (
    t.isMemberExpression(callee) &&
    !callee.computed &&
    t.isIdentifier(callee.property) &&
    (callee.property.name === 'uiInvoker' ||
      callee.property.name === 'jsInvoker')
  );
}

function wrapDirectiveFunction(path, state, t) {
  const policy = isDirectiveFunction(path);
  if (!policy || isAlreadyWrapped(path, t)) {
    return;
  }
  if (policy === 'ui') {
    throw path.buildCodeFrameError(
      'NativeScript "use ui" callbacks are not supported in React Native. Use a Worklets "worklet" callback with NativeScript.runOnUI().',
    );
  }

  const programPath = path.findParent((parentPath) => parentPath.isProgram());
  const nativeScriptIdentifier = ensureNativeScriptIdentifier(programPath, state, t);
  const original = path.node;
  path.replaceWith(
    t.callExpression(
      t.memberExpression(
        t.identifier(nativeScriptIdentifier),
        t.identifier('jsInvoker'),
      ),
      [original],
    ),
  );
  path.skip();
}

module.exports = function nativeScriptReactNativeBabelPlugin({types: t}) {
  return {
    name: 'nativescript-react-native-thread-directives',
    visitor: {
      Program(path, state) {
        const bindings = collectNativeScriptBindings(path, t);
        state.nativeScriptIdentifiers = bindings.nativeScriptIdentifiers;
        state.uikitDefinitionIdentifiers = bindings.uikitDefinitionIdentifiers;
        state.nativeScriptIdentifier = findNativeScriptIdentifier(path, t);
      },
      CallExpression(path, state) {
        workletizeUIKitDefinitionCallbacks(path, state, t);
      },
      ArrowFunctionExpression(path, state) {
        wrapDirectiveFunction(path, state, t);
      },
      FunctionExpression(path, state) {
        wrapDirectiveFunction(path, state, t);
      },
    },
  };
};

module.exports.default = module.exports;
