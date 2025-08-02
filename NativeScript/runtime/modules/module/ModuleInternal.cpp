#include "ModuleInternal.h"

#include <dlfcn.h>
#include <libgen.h>
#include <sys/stat.h>
#include <utime.h>

#include <cassert>
#include <ctime>
#include <filesystem>
#include <fstream>
#include <iostream>
#include <sstream>

#include "ffi/NativeScriptException.h"
#include "native_api_util.h"
#include "runtime/RuntimeConfig.h"
#include "runtime/Util.h"

#ifdef TARGET_ENGINE_V8
#include "../../napi/v8/v8-module-loader.h"
#endif

using namespace nativescript;
using namespace std;

ModuleInternal::ModuleInternal()
    : m_env(nullptr),
      m_requireFunction(nullptr),
      m_requireFactoryFunction(nullptr) {}

void ModuleInternal::DeInit() {
#ifdef TARGET_ENGINE_V8
  for (auto& kv : v8impl::g_moduleRegistry) {
    kv.second.Reset();
  }
  v8impl::g_moduleRegistry.clear();
#endif

  if (m_env != nullptr) {
    napi_delete_reference(m_env, this->m_requireFunction);
    napi_delete_reference(m_env, this->m_requireFactoryFunction);
  }

  for (const auto& pair : this->m_requireCache) {
    if (m_env != nullptr) {
      napi_delete_reference(m_env, pair.second);
    }
  }
  this->m_requireCache.clear();
}

void ModuleInternal::Init(napi_env env, const std::string& baseDir) {
  napi_status status;

  m_env = env;

#ifdef V8_RUNTIME
  // Initialize ES module system for V8
  // We need to get the V8 isolate from napi_env to properly initialize ES modules
  // This is implementation-specific and may need adjustment based on the actual V8 NAPI binding
  // v8impl::InitializeESModuleSystem(isolate);
#endif

  const char* requireFactoryScript = R"(
    (function () {
        return function require_factory(requireInternal, dirName) {
		return function require(modulePath) {
            if(typeof global.__requireOverride !== "undefined") {
				var result = global.__requireOverride(modulePath, dirName);
				if(result) {
					return result;
				}
			}
			return requireInternal(modulePath, dirName);
		}
	}
})();
)";

  napi_value source;
  napi_create_string_utf8(env, requireFactoryScript, NAPI_AUTO_LENGTH, &source);

  napi_value global;
  napi_get_global(env, &global);

  napi_value result;
  status = napi_run_script(env, source, &result);
  assert(status == napi_ok);

  m_requireFactoryFunction = napi_util::make_ref(m_env, result);

  napi_value requireFunction = napi_util::napi_set_function(
      env, global, "__nativeRequire", RequireCallback, this);
  m_requireFunction = napi_util::make_ref(m_env, requireFunction);

  napi_value globalRequire = GetRequireFunction(
      env, baseDir.empty() ? RuntimeConfig.ApplicationPath : baseDir);
  status = napi_set_named_property(env, global, "require", globalRequire);
  assert(status == napi_ok);
}

napi_value ModuleInternal::GetRequireFunction(napi_env env,
                                              const std::string& dirName) {
  napi_value requireFunc;

  auto itFound = m_requireCache.find(dirName);

  if (itFound != m_requireCache.end()) {
    requireFunc = napi_util::get_ref_value(env, itFound->second);
  } else {
    napi_value requireFuncFactory =
        napi_util::get_ref_value(env, m_requireFactoryFunction);

    napi_value requireInternalFunc =
        napi_util::get_ref_value(env, m_requireFunction);

    napi_value args[2];
    args[0] = requireInternalFunc;
    napi_create_string_utf8(env, dirName.c_str(), NAPI_AUTO_LENGTH, &args[1]);

    napi_value thiz;
    napi_create_object(env, &thiz);

    napi_value result;
    napi_status status =
        napi_call_function(env, thiz, requireFuncFactory, 2, args, &result);
    assert(status == napi_ok && result != nullptr);

    bool isFunction = napi_util::is_of_type(env, result, napi_function);
    assert(isFunction);

    requireFunc = result;

    napi_ref poFunc = napi_util::make_ref(env, requireFunc);
    m_requireCache.emplace(dirName, poFunc);
  }

  return requireFunc;
}

napi_value ModuleInternal::RequireCallback(napi_env env,
                                           napi_callback_info info) {
  NAPI_CALLBACK_BEGIN(0)
  try {
    auto thiz = static_cast<ModuleInternal*>(data);
    return thiz->RequireCallbackImpl(env, info);
  } catch (NativeScriptException& e) {
    e.ReThrowToJS(env);
  } catch (std::exception& e) {
    stringstream ss;
    ss << "Error: C++ Exception: " << e.what() << endl;
    NativeScriptException nsEx(ss.str());
    nsEx.ReThrowToJS(env);
  } catch (...) {
    NativeScriptException nsEx(std::string("Error: c++ exception!"));
    nsEx.ReThrowToJS(env);
  }

  return nullptr;
}

napi_value ModuleInternal::Require(napi_env env, const std::string& moduleName,
                                   const std::string& callingModuleDirName) {
  auto isData = false;

  napi_value moduleObj =
      LoadImpl(env, moduleName, callingModuleDirName, isData);

  if (isData) {
    assert(!napi_util::is_null_or_undefined(env, moduleObj));
    return moduleObj;
  } else {
    // Check if this is an ES module by looking for __esModule property
    bool hasEsModuleProp;
    napi_status status = napi_has_named_property(env, moduleObj, "__esModule", &hasEsModuleProp);
    
    bool isEsModule = false;
    if (status == napi_ok && hasEsModuleProp) {
      napi_value esModuleFlag;
      napi_get_named_property(env, moduleObj, "__esModule", &esModuleFlag);
      napi_get_value_bool(env, esModuleFlag, &isEsModule);
    }
    
    if (isEsModule) {
      // For ES modules, return the module namespace directly
      return moduleObj;
    } else {
      // For CommonJS modules, return the exports
      napi_value exports;
      napi_get_named_property(env, moduleObj, "exports", &exports);
      assert(!napi_util::is_null_or_undefined(env, exports));
      return exports;
    }
  }
}

napi_value ModuleInternal::RequireCallbackImpl(napi_env env,
                                               napi_callback_info info) {
  NAPI_CALLBACK_BEGIN_VARGS()

  if (argc != 2) {
    throw NativeScriptException(
        string("require should be called with two parameters"));
  }
  if (!napi_util::is_of_type(env, argv[0], napi_string)) {
    throw NativeScriptException(
        string("require's first parameter should be string"));
  }
  if (!napi_util::is_of_type(env, argv[1], napi_string)) {
    throw NativeScriptException(
        string("require's second parameter should be string"));
  }

  string moduleName = napi_util::get_cxx_string(env, argv[0]);
  string callingModuleDirName = napi_util::get_cxx_string(env, argv[1]);

  try {
    return Require(env, moduleName, callingModuleDirName);
  } catch (NativeScriptException& e) {
    e.ReThrowToJS(env);
    return nullptr;
  }
}

napi_value ModuleInternal::RequireNativeCallback(napi_env env,
                                                 napi_callback_info info) {
  void* data;
  napi_get_cb_info(env, info, nullptr, nullptr, nullptr, &data);
  auto cb = reinterpret_cast<napi_register_module_v*>(data);
  napi_value exports;
  napi_create_object(env, &exports);
  return cb(env, exports);
}

napi_status ModuleInternal::Load(napi_env env, const std::string& path) {
  napi_value global;
  napi_get_global(env, &global);

  napi_value require;
  napi_get_named_property(env, global, "require", &require);

  napi_value args[1];
  napi_create_string_utf8(env, path.c_str(), path.size(), &args[0]);

  napi_value result;
  napi_status status =
      napi_call_function(env, global, require, 1, args, &result);
  return status;
}

void ModuleInternal::LoadWorker(napi_env env, const string& path) {
  Load(env, path);
  bool hasPendingException;
  napi_is_exception_pending(env, &hasPendingException);

  if (hasPendingException) {
    napi_value error;
    napi_get_and_clear_last_exception(env, &error);
    // TODO
    // CallbackHandlers::CallWorkerScopeOnErrorHandle(env, error);
  }
}

void ModuleInternal::CheckFileExists(napi_env env, const std::string& path,
                                     const std::string& baseDir) {
  struct stat buffer;
  if (stat(path.c_str(), &buffer) != 0) {
    std::string errMsg = "Module not found: " + path;
    throw NativeScriptException(errMsg);
  }
  if (baseDir != "") {
    std::string fullPath = baseDir + "/" + path;
    if (stat(fullPath.c_str(), &buffer) != 0) {
      std::string errMsg = "Module not found: " + fullPath;
      throw NativeScriptException(errMsg);
    }
  }
}

napi_value ModuleInternal::LoadInternalModule(napi_env env,
                                              const std::string& moduleName) {
  if (moduleName == "url") {
    napi_value moduleObj;
    napi_create_object(env, &moduleObj);
    napi_value url;
    napi_value exports;
    napi_create_object(env, &exports);
    napi_get_named_property(env, napi_util::global(env), "URL", &url);
    napi_set_named_property(env, exports, "URL", url);
    napi_set_named_property(env, moduleObj, "exports", exports);
    napi_util::napi_set_function(
        env, exports, "pathToFileURL",
        [](napi_env env, napi_callback_info info) -> napi_value {
          return napi_util::to_js_string(env, "file://");
        });
    return moduleObj;
  }
  return nullptr;
}

std::string ModuleInternal::ResolvePathFromPackageJson(
    napi_env env, const std::string& packageJsonPath, bool& error) {
  error = false;
  std::ifstream packageJsonFile(packageJsonPath);
  if (!packageJsonFile.is_open()) {
    error = true;
    return "";
  }
  std::string line;
  std::stringstream packageJsonStream;
  while (std::getline(packageJsonFile, line)) {
    packageJsonStream << line;
  }
  packageJsonFile.close();
  std::string packageJson = packageJsonStream.str();
  napi_value obj = JsonParse(env, packageJson);
  if (obj == nullptr) {
    error = true;
    return "";
  }
  napi_value mainValue;
  napi_get_named_property(env, obj, "main", &mainValue);
  if (mainValue == nullptr) {
    error = true;
    return "";
  }

  napi_valuetype type;
  napi_typeof(env, mainValue, &type);
  if (type != napi_string) {
    error = true;
    return "";
  }

  std::string main = napi_util::get_cxx_string(env, mainValue);
  if (main.empty()) {
    error = true;
    return "";
  }

  std::filesystem::path packageJsonDir(packageJsonPath);
  std::filesystem::path packageJsonDirName =
      packageJsonDir.parent_path().string();
  std::filesystem::path mainPath = packageJsonDirName / main;

  if (std::filesystem::is_directory(mainPath)) {
    mainPath = mainPath / "package.json";
    if (std::filesystem::is_regular_file(mainPath)) {
      return ResolvePathFromPackageJson(env, mainPath.string(), error);
    }
  }

  if (std::filesystem::is_regular_file(mainPath)) {
    return mainPath.string();
  }

  error = true;
  return "";
}

std::string ModuleInternal::ResolvePath(napi_env env,
                                        const std::string& baseDir,
                                        const std::string& moduleName) {
  std::string moduleNameCopy = moduleName;

  if (moduleName.starts_with("~")) {
    moduleNameCopy = RuntimeConfig.ApplicationPath + moduleNameCopy.substr(1);
  }

  std::filesystem::path baseDirPath(baseDir);
  std::filesystem::path moduleNamePath(moduleNameCopy);
  std::filesystem::path fullPath = baseDirPath / moduleNamePath;

  bool isDirectory = false;
  bool exists = std::filesystem::exists(fullPath);

  if (exists == true && isDirectory == true) {
    // Try .mjs first for ES modules
    std::filesystem::path mjsFile = fullPath;
    mjsFile = mjsFile.replace_extension(".mjs");
    if (std::filesystem::exists(mjsFile) &&
        !std::filesystem::is_directory(mjsFile)) {
      return mjsFile.string();
    }
    
    // Then try .js for CommonJS
    std::filesystem::path jsFile = fullPath;
    jsFile = jsFile.replace_extension(".js");
    if (std::filesystem::exists(jsFile) &&
        !std::filesystem::is_directory(jsFile)) {
      return jsFile.string();
    }
  }

  if (exists == false) {
    // Try .mjs extension first (ES modules have priority)
    std::filesystem::path mjsPath = fullPath.string() + ".mjs";
    if (std::filesystem::exists(mjsPath)) {
      exists = true;
      isDirectory = std::filesystem::is_directory(mjsPath);
      if (!isDirectory) {
        return mjsPath.string();
      }
    }
    
    // Try .js extension
    fullPath = fullPath.replace_extension(".js");
    exists = std::filesystem::exists(fullPath);
    isDirectory = std::filesystem::is_directory(fullPath);
  }

  if (exists == false) {
    throw NativeScriptException("The specified module does not exist: " +
                                moduleName);
  }

  if (isDirectory == false) {
    return fullPath.string();
  }

  std::filesystem::path packageJson = fullPath / "package.json";
  bool error = false;
  std::string entry =
      this->ResolvePathFromPackageJson(env, packageJson.string(), error);
  if (error) {
    throw NativeScriptException("Unable to locate main entry in " +
                                packageJson.string());
  }

  if (!entry.empty()) {
    fullPath = entry;
  }

  exists = std::filesystem::exists(fullPath);
  isDirectory = std::filesystem::is_directory(fullPath);
  if (exists == true && isDirectory == false) {
    return fullPath.string();
  }

  if (exists == false) {
    // Try index.mjs first
    std::filesystem::path indexMjs = fullPath.parent_path() / "index.mjs";
    if (std::filesystem::exists(indexMjs)) {
      return indexMjs.string();
    }
    
    // Then try index.js
    fullPath = fullPath.replace_extension(".js");
  } else {
    // Try index.mjs first in directory
    std::filesystem::path indexMjs = fullPath / "index.mjs";
    if (std::filesystem::exists(indexMjs)) {
      return indexMjs.string();
    }
    
    // Then try index.js
    fullPath /= "index.js";
  }

  exists = std::filesystem::exists(fullPath);
  if (exists == false) {
    throw NativeScriptException("The specified module does not exist: " +
                                moduleName);
  }
  return fullPath.string();
}

napi_value ModuleInternal::LoadImpl(napi_env env, const std::string& moduleName,
                                    const std::string& baseDir, bool& isData) {
  auto pathKind = GetModulePathKind(moduleName);
  auto cachePathKey = (pathKind == ModulePathKind::Global)
                          ? moduleName
                          : (baseDir + "*" + moduleName);

  napi_value result;

  //   DEBUG_WRITE(">>LoadImpl cachePathKey=%s", cachePathKey.c_str());

  auto it = m_loadedModules.find(cachePathKey);

  /**
   * Load internal modules like url,fs etc directly if someone does
   * require('url');
   */
  napi_value moduleObj = ModuleInternal::LoadInternalModule(env, moduleName);
  if (moduleObj) return moduleObj;

  if (it == m_loadedModules.end()) {
    std::string path;

    // Search App System libs
    std::string sys_lib("system_lib://");
    if (moduleName.rfind(sys_lib, 0) == 0) {
      auto pos = moduleName.find(sys_lib);
      path = std::string(moduleName);
      path.replace(pos, sys_lib.length(), "");
    } else if (moduleName.ends_with(".so") || moduleName.ends_with(".dylib")) {
      path = "lib" + moduleName;
    } else if (moduleName.ends_with(".node")) {
      std::string libName = moduleName;
      libName.replace(libName.find(".node"), 5, "");
      path = "lib" + libName + ".so";
    } else {
      path = ResolvePath(env, baseDir, moduleName);
    }

    auto it2 = m_loadedModules.find(path);

    if (it2 == m_loadedModules.end()) {
      if (path.ends_with(".js") || path.ends_with(".mjs") || 
          path.ends_with(".so") || path.ends_with((".dylib"))) {
        isData = false;
        result = LoadModule(env, path, cachePathKey);
      } else if (path.ends_with(".json")) {
        isData = true;
        result = LoadData(env, path);
      } else {
        std::filesystem::path filePath(path);
        std::filesystem::path fileWithIndexJs = filePath / "index.js";
        std::filesystem::path fileWithIndexMjs = filePath / "index.mjs";
        if (std::filesystem::exists(fileWithIndexMjs)) {
          return LoadImpl(env, fileWithIndexMjs.string(), baseDir, isData);
        } else if (std::filesystem::exists(fileWithIndexJs)) {
          return LoadImpl(env, fileWithIndexJs.string(), baseDir, isData);
        }
        std::string errMsg = "Unsupported file extension: " + path;
        throw NativeScriptException(errMsg);
      }
    } else {
      auto& cacheEntry = it2->second;
      isData = cacheEntry.isData;
      result = napi_util::get_ref_value(env, cacheEntry.obj);
    }
  } else {
    auto& cacheEntry = it->second;
    isData = cacheEntry.isData;
    result = napi_util::get_ref_value(env, cacheEntry.obj);
  }

  return result;
}

std::string ModuleInternal::EnsureFileProtocol(const std::string& path) {
  const std::string protocol = "file://";
  if (path.compare(0, protocol.length(), protocol) != 0) {
    return protocol + path;
  }
  return path;
}

napi_value ModuleInternal::LoadModule(napi_env env,
                                      const std::string& modulePath,
                                      const std::string& moduleCacheKey) {
  napi_value result;

  napi_value context;
  napi_get_global(env, &context);

  napi_value moduleObj;
  napi_create_object(env, &moduleObj);

  napi_value exportsObj;
  napi_create_object(env, &exportsObj);

  napi_set_named_property(env, moduleObj, "exports", exportsObj);

  napi_value fullRequiredModulePath;
  napi_create_string_utf8(env, modulePath.c_str(), modulePath.size(),
                          &fullRequiredModulePath);
  napi_set_named_property(env, moduleObj, "filename", fullRequiredModulePath);

  napi_ref poModuleObj = napi_util::make_ref(env, moduleObj);
  TempModule tempModule(this, modulePath, moduleCacheKey, poModuleObj);

  napi_value moduleFunc;

  if (modulePath.ends_with(".mjs")) {
    // Handle ES modules
    napi_value esModuleResult = LoadESModule(env, modulePath);
    
    // Mark the result as an ES module
    napi_value isESModuleFlag;
    napi_get_boolean(env, true, &isESModuleFlag);
    napi_set_named_property(env, esModuleResult, "__esModule", isESModuleFlag);
    
    // For ES modules, we return the namespace directly, not wrapped in a module object
    tempModule.SaveToCache();
    return esModuleResult;
  } else if (modulePath.ends_with(".js")) {
    napi_value script = LoadScript(env, modulePath, fullRequiredModulePath);
    // DEBUG_WRITE("%s", modulePath.c_str());

    // napi_status status = js_execute_script(
    //     env, script, EnsureFileProtocol(modulePath).c_str(), &moduleFunc);
    napi_status status = napi_run_script(
        env, script, &moduleFunc);
    if (status != napi_ok) {
      bool pendingException;
      napi_is_exception_pending(env, &pendingException);
      napi_value error = nullptr;
      if (pendingException) {
        napi_get_and_clear_last_exception(env, &error);
      }
      if (error) {
        throw NativeScriptException(env, error,
                                    "Error running script " + modulePath);
      } else {
        throw NativeScriptException("Error running script " + modulePath);
      }
    }
  } else if (modulePath.ends_with(".so") || modulePath.ends_with(".dylib")) {
    auto handle = dlopen(modulePath.c_str(), RTLD_NOW);
    if (handle == nullptr) {
      auto error = dlerror();
      std::string errMsg(error);
      throw NativeScriptException(errMsg);
    }
    auto func = dlsym(handle, "napi_register_module_v1");

    if (func == nullptr) {
      std::string errMsg("Cannot find 'napi_register_module_v1' in " +
                         modulePath);
      throw NativeScriptException(errMsg);
    }

    auto cb = reinterpret_cast<napi_register_module_v*>(func);
    napi_value exports;
    napi_create_object(env, &exports);
    napi_value result = cb(env, exports);
    napi_set_named_property(env, moduleObj, "exports", result);
    tempModule.SaveToCache();
    return moduleObj;
  } else {
    std::string errMsg = "Unsupported file extension: " + modulePath;
    throw NativeScriptException(errMsg);
  }

  napi_value fileName;
  napi_create_string_utf8(env, modulePath.c_str(), modulePath.size(),
                          &fileName);

  char pathcopy[1024];
  strcpy(pathcopy, modulePath.c_str());
  std::string strDirName(dirname(pathcopy));

  napi_value dirName;
  napi_create_string_utf8(env, strDirName.c_str(), strDirName.size(), &dirName);

  napi_value require = GetRequireFunction(env, strDirName);

  napi_value requireArgs[5] = {moduleObj, exportsObj, require, fileName,
                               dirName};

  napi_set_named_property(env, moduleObj, "require", require);
  napi_util::define_property(env, moduleObj, "id", fileName);

  napi_value thiz;
  napi_create_object(env, &thiz);

  napi_value globalExtends;
  napi_get_named_property(env, context, "__extends", &globalExtends);
  napi_set_named_property(env, thiz, "__extends", globalExtends);

  napi_value callResult;
  napi_status status =
      napi_call_function(env, thiz, moduleFunc, 5, requireArgs, &callResult);
  bool pendingException;
  napi_is_exception_pending(env, &pendingException);
  if (status != napi_ok || pendingException) {
    napi_value exception;
    napi_get_and_clear_last_exception(env, &exception);
    if (exception) {
      throw NativeScriptException(env, exception,
                                  "Error calling module function: ");
    } else {
      throw NativeScriptException("Error calling module function: " +
                                  modulePath);
    }
  }

  tempModule.SaveToCache();
  result = moduleObj;

  return result;
}

napi_value ModuleInternal::LoadScript(napi_env env, const std::string& path,
                                      napi_value fullRequiredModulePath) {
  napi_value scriptText = ModuleInternal::WrapModuleContent(env, path);
  return scriptText;
}

napi_value ModuleInternal::LoadData(napi_env env, const std::string& path) {
  std::string jsonData;
  std::ifstream jsonFile(path);
  if (!jsonFile.is_open()) {
    throw NativeScriptException("Unable to open JSON file: " + path);
  }

  std::stringstream buffer;
  buffer << jsonFile.rdbuf();
  jsonData = buffer.str();
  napi_value json = JsonParse(env, jsonData);

  if (!napi_util::is_of_type(env, json, napi_object)) {
    bool pendingException;
    napi_is_exception_pending(env, &pendingException);
    if (pendingException) {
      napi_value error;
      napi_get_and_clear_last_exception(env, &error);
      throw NativeScriptException(env, error,
                                  "JSON is not valid, file=" + path);
    } else {
      throw NativeScriptException("JSON is not valid, file=" + path);
    }
  }

  napi_ref poObj = napi_util::make_ref(env, json);
  m_loadedModules.emplace(path, ModuleCacheEntry(poObj, true /* isData */));
  return json;
}

// ES Module support functions
bool ModuleInternal::IsESModule(const std::string& path) {
  return path.size() >= 4 && path.compare(path.size() - 4, 4, ".mjs") == 0;
}

napi_value ModuleInternal::LoadESModule(napi_env env, const std::string& path) {
  try {
    // Get absolute path to ensure proper resolution
    std::filesystem::path absolutePath = std::filesystem::absolute(path);
    std::string absPath = absolutePath.string();
    
    // Read the ES module source
    napi_value scriptContent = WrapModuleContent(env, absPath);
    
    // Use the new napi_run_script_as_module function
    napi_value moduleNamespace;
    napi_status status = napi_run_script_as_module(env, scriptContent, absPath.c_str(), &moduleNamespace);
    
    if (status != napi_ok) {
      bool pendingException;
      napi_is_exception_pending(env, &pendingException);
      if (pendingException) {
        napi_value error;
        napi_get_and_clear_last_exception(env, &error);
        throw NativeScriptException(env, error, "Failed to load ES module " + absPath);
      } else {
        throw NativeScriptException("Failed to load ES module " + absPath);
      }
    }
    
    return moduleNamespace;
    
  } catch (const std::exception& e) {
    throw NativeScriptException("Failed to load ES module " + path + ": " + e.what());
  }
}

napi_value ModuleInternal::WrapModuleContent(napi_env env,
                                             const std::string& path) {
  std::string content;
  std::ifstream file(path);
  if (!file.is_open()) {
    throw NativeScriptException("Unable to open file: " + path);
  }
  std::stringstream buffer;
  buffer << file.rdbuf();
  content = buffer.str();
  file.close();

  std::string result;
  
  if (IsESModule(path)) {
    // For ES modules, return content as-is to preserve import/export syntax
    result = content;
  } else {
    // For CommonJS modules, wrap in factory function
    result.reserve(content.length() + 1024);
    result += MODULE_PROLOGUE;
    result += content;
    result += MODULE_EPILOGUE;
  }

  napi_value wrappedContent;
  napi_create_string_utf8(env, result.c_str(), result.size(), &wrappedContent);

  return wrappedContent;
}

ModuleInternal::ModulePathKind ModuleInternal::GetModulePathKind(
    const std::string& path) {
  ModulePathKind kind;
  switch (path[0]) {
    case '.':
      kind = ModulePathKind::Relative;
      break;
    case '/':
      kind = ModulePathKind::Absolute;
      break;
    default:
      kind = ModulePathKind::Global;
      break;
  }
  return kind;
}

const char* ModuleInternal::MODULE_PROLOGUE =
    "(function(module, exports, require, __filename, __dirname){ ";
const char* ModuleInternal::MODULE_EPILOGUE = "\n})";
int ModuleInternal::MODULE_PROLOGUE_LENGTH =
    std::string(ModuleInternal::MODULE_PROLOGUE).length();
