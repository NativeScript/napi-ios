#include "v8-module-loader.h"
#include <filesystem>
#include <fstream>
#include <sstream>
#include <sys/stat.h>
#include <unistd.h>
#include <cstdlib>

namespace v8impl {

// Global registry for ES modules
std::unordered_map<std::string, v8::Global<v8::Module>> g_moduleRegistry;

bool IsESModule(const std::string& path) {
  return path.size() >= 4 && path.compare(path.size() - 4, 4, ".mjs") == 0;
}

std::string ReadFileContent(const std::string& path) {
  std::ifstream file(path);
  if (!file.is_open()) {
    throw std::runtime_error("Cannot open file: " + path);
  }
  
  std::stringstream buffer;
  buffer << file.rdbuf();
  return buffer.str();
}

v8::Local<v8::String> WrapModuleContent(v8::Isolate* isolate, const std::string& path) {
  std::string sourceText = ReadFileContent(path);
  
  if (IsESModule(path)) {
    // For ES modules, return source as-is to preserve import/export syntax
    return v8::String::NewFromUtf8(isolate, sourceText.c_str()).ToLocalChecked();
  }
  
  // For CommonJS modules, wrap in factory function
  std::string wrappedSource = 
    "(function (exports, require, module, __filename, __dirname) { " + 
    sourceText + 
    "\n});";
  
  return v8::String::NewFromUtf8(isolate, wrappedSource.c_str()).ToLocalChecked();
}

std::string ResolveESModulePath(v8::Isolate* isolate, 
                               const std::string& baseDir, 
                               const std::string& moduleName) {
  std::filesystem::path baseDirPath(baseDir);
  std::filesystem::path moduleNamePath(moduleName);
  std::filesystem::path fullPath = baseDirPath / moduleNamePath;
  
  // Check if file exists as-is
  if (std::filesystem::exists(fullPath) && std::filesystem::is_regular_file(fullPath)) {
    return std::filesystem::absolute(fullPath).string();
  }
  
  // Try with .mjs extension first (ES modules have priority)
  std::filesystem::path mjsPath = fullPath.string() + ".mjs";
  if (std::filesystem::exists(mjsPath) && std::filesystem::is_regular_file(mjsPath)) {
    return std::filesystem::absolute(mjsPath).string();
  }
  
  // Try with .js extension
  std::filesystem::path jsPath = fullPath.string() + ".js";
  if (std::filesystem::exists(jsPath) && std::filesystem::is_regular_file(jsPath)) {
    return std::filesystem::absolute(jsPath).string();
  }
  
  // Try directory with index.mjs
  if (std::filesystem::exists(fullPath) && std::filesystem::is_directory(fullPath)) {
    std::filesystem::path indexMjs = fullPath / "index.mjs";
    if (std::filesystem::exists(indexMjs) && std::filesystem::is_regular_file(indexMjs)) {
      return std::filesystem::absolute(indexMjs).string();
    }
    
    // Try directory with index.js
    std::filesystem::path indexJs = fullPath / "index.js";
    if (std::filesystem::exists(indexJs) && std::filesystem::is_regular_file(indexJs)) {
      return std::filesystem::absolute(indexJs).string();
    }
  }
  
  throw std::runtime_error("Module not found: " + moduleName);
}

v8::MaybeLocal<v8::Module> CompileESModule(v8::Isolate* isolate, const std::string& path) {
  // Ensure we have an absolute path
  std::filesystem::path absolutePath = std::filesystem::absolute(path);
  std::string absPath = absolutePath.string();
  
  // Check if already compiled
  auto it = g_moduleRegistry.find(absPath);
  if (it != g_moduleRegistry.end()) {
    v8::Local<v8::Module> existing = it->second.Get(isolate);
    return v8::MaybeLocal<v8::Module>(existing);
  }
  
  // Prepare URL & source - use the absolute path consistently
  v8::Local<v8::String> sourceText = WrapModuleContent(isolate, absPath);
  
  v8::ScriptOrigin origin(
      isolate,
      v8::String::NewFromUtf8(isolate, absPath.c_str()).ToLocalChecked(),
      0, 0, false, -1, v8::Local<v8::Value>(), false, false,
      true  // is_module
  );
  
  v8::ScriptCompiler::Source source(sourceText, origin);
  
  // Compile ES module
  v8::Local<v8::Module> module;
  v8::MaybeLocal<v8::Module> maybeMod = v8::ScriptCompiler::CompileModule(
      isolate, &source, v8::ScriptCompiler::kNoCompileOptions);
  
  if (!maybeMod.ToLocal(&module)) {
    // Compilation failed - return empty MaybeLocal, let V8 handle the JavaScript exception
    return v8::MaybeLocal<v8::Module>();
  }
  
  // Register in global registry with absolute path
  g_moduleRegistry[absPath].Reset(isolate, module);

  return v8::MaybeLocal<v8::Module>(module);
}

v8::Local<v8::Value> LoadESModule(v8::Isolate* isolate, const std::string& path) {
  auto context = isolate->GetCurrentContext();
  
  // Ensure we have an absolute path
  std::filesystem::path absolutePath = std::filesystem::absolute(path);
  std::string absPath = absolutePath.string();
  
  // First, compile the module and all its dependencies
  v8::MaybeLocal<v8::Module> maybeModule = CompileESModule(isolate, absPath);
  v8::Local<v8::Module> module;
  if (!maybeModule.ToLocal(&module)) {
    // Compilation failed - throw exception
    throw std::runtime_error("Cannot compile ES module: " + absPath);
  }
  
  // Instantiate (link) - this will recursively resolve dependencies
  v8::TryCatch tcLink(isolate);
  bool linked = module->InstantiateModule(context, &ResolveModuleCallback).FromMaybe(false);
  
  if (!linked) {
    if (tcLink.HasCaught()) {
      v8::String::Utf8Value error(isolate, tcLink.Exception());
      throw std::runtime_error("Cannot instantiate module " + absPath + ": " + std::string(*error));
    } else {
      throw std::runtime_error("Cannot instantiate module " + absPath);
    }
  }
  
  // Evaluate
  v8::Local<v8::Value> result;
  v8::TryCatch tcEval(isolate);
  if (!module->Evaluate(context).ToLocal(&result)) {
    if (tcEval.HasCaught()) {
      v8::String::Utf8Value error(isolate, tcEval.Exception());
      throw std::runtime_error("Cannot evaluate module " + absPath + ": " + std::string(*error));
    } else {
      throw std::runtime_error("Cannot evaluate module " + absPath);
    }
  }
  
  // Handle top-level await (if result is a Promise)
  if (result->IsPromise()) {
    v8::Local<v8::Promise> promise = result.As<v8::Promise>();
    
    // Process microtasks to allow Promise resolution
    int maxAttempts = 100;
    int attempts = 0;
    
    while (attempts < maxAttempts) {
      isolate->PerformMicrotaskCheckpoint();
      
      v8::Promise::PromiseState state = promise->State();
      
      if (state != v8::Promise::kPending) {
        if (state == v8::Promise::kRejected) {
          v8::Local<v8::Value> reason = promise->Result();
          isolate->ThrowException(reason);
          throw std::runtime_error("Module evaluation promise rejected");
        }
        break;
      }
      
      attempts++;
      usleep(100);  // 0.1ms delay
    }
  }
  
  // Return the namespace
  return module->GetModuleNamespace();
}

v8::MaybeLocal<v8::Module> ResolveModuleCallback(
    v8::Local<v8::Context> context,
    v8::Local<v8::String> specifier,
    v8::Local<v8::FixedArray> import_assertions,
    v8::Local<v8::Module> referrer) {

  v8::Isolate* isolate = context->GetIsolate();
  
  // Convert specifier to std::string
  v8::String::Utf8Value specUtf8(isolate, specifier);
  std::string spec = *specUtf8 ? *specUtf8 : "";
  
  if (spec.empty()) {
    return v8::MaybeLocal<v8::Module>();
  }
  
  // Find referrer path
  std::string referrerPath;
  
  for (auto& kv : g_moduleRegistry) {
    v8::Local<v8::Module> registered = kv.second.Get(isolate);
 
    if (registered == referrer) {
      referrerPath = kv.first;
      break;
    }
  }
  
  if (referrerPath.empty()) {
    // Check if this is a relative import that needs a referrer context
    bool specIsRelative = !spec.empty() && spec[0] == '.';
    
    if (specIsRelative) {
      std::string errorMsg = "Cannot resolve relative module '" + spec + "': referrer module not found in registry";
      isolate->ThrowException(v8::Exception::Error(
          v8::String::NewFromUtf8(isolate, errorMsg.c_str()).ToLocalChecked()));
      return v8::MaybeLocal<v8::Module>();
    } else {
      char cwd[1024];
      if (getcwd(cwd, sizeof(cwd)) != nullptr) {
        referrerPath = std::string(cwd) + "/dummy.mjs";  // Create a dummy referrer path
      } else {
        std::string errorMsg = "Cannot resolve module '" + spec + "': no referrer and cannot get current directory";
        isolate->ThrowException(v8::Exception::Error(
            v8::String::NewFromUtf8(isolate, errorMsg.c_str()).ToLocalChecked()));
        return v8::MaybeLocal<v8::Module>();
      }
    }
  }
  
  // Compute base directory - ensure it's absolute
  std::filesystem::path referrerFilePath = std::filesystem::absolute(referrerPath);
  std::string baseDir = referrerFilePath.parent_path().string();
  
  // Resolve the module path
  std::string absPath;
  try {
    absPath = ResolveESModulePath(isolate, baseDir, spec);
  } catch (const std::exception& e) {
    std::string errorMsg = "Cannot resolve module '" + spec + "': " + e.what();
    isolate->ThrowException(v8::Exception::Error(
        v8::String::NewFromUtf8(isolate, errorMsg.c_str()).ToLocalChecked()));
    return v8::MaybeLocal<v8::Module>();
  }
  
  v8::MaybeLocal<v8::Module> maybeModule = CompileESModule(isolate, absPath);
  if (maybeModule.IsEmpty()) {
    // Compilation failed - throw an exception if none exists
    std::string errorMsg = "Failed to compile module: " + absPath;
    isolate->ThrowException(v8::Exception::Error(
        v8::String::NewFromUtf8(isolate, errorMsg.c_str()).ToLocalChecked()));
    return v8::MaybeLocal<v8::Module>();
  }
  
  return maybeModule;
}

v8::MaybeLocal<v8::Promise> ImportModuleDynamicallyCallback(
    v8::Local<v8::Context> context,
    v8::Local<v8::Data> host_defined_options,
    v8::Local<v8::Value> resource_name,
    v8::Local<v8::String> specifier,
    v8::Local<v8::FixedArray> import_assertions) {
  
  v8::Isolate* isolate = context->GetIsolate();
  v8::EscapableHandleScope scope(isolate);
  
  // Create Promise resolver
  v8::Local<v8::Promise::Resolver> resolver = 
      v8::Promise::Resolver::New(context).ToLocalChecked();
  
  try {
    // Use the static resolver to locate/compile the module
    v8::Local<v8::Module> refMod;
    v8::MaybeLocal<v8::Module> maybeModule =
        ResolveModuleCallback(context, specifier, import_assertions, refMod);
    
    v8::Local<v8::Module> module;
    if (!maybeModule.ToLocal(&module)) {
      resolver->Reject(context, 
          v8::Exception::Error(v8::String::NewFromUtf8(isolate, 
              "Failed to resolve module").ToLocalChecked())).Check();
      return scope.Escape(resolver->GetPromise());
    }
    
    // If not yet instantiated/evaluated, do it now
    if (module->GetStatus() == v8::Module::kUninstantiated) {
      if (!module->InstantiateModule(context, &ResolveModuleCallback).FromMaybe(false)) {
        resolver->Reject(context,
            v8::Exception::Error(v8::String::NewFromUtf8(isolate,
                "Failed to instantiate module").ToLocalChecked())).Check();
        return scope.Escape(resolver->GetPromise());
      }
    }
    
    if (module->GetStatus() != v8::Module::kEvaluated) {
      if (module->Evaluate(context).IsEmpty()) {
        resolver->Reject(context,
            v8::Exception::Error(v8::String::NewFromUtf8(isolate,
                "Failed to evaluate module").ToLocalChecked())).Check();
        return scope.Escape(resolver->GetPromise());
      }
    }
    
    resolver->Resolve(context, module->GetModuleNamespace()).Check();
    
  } catch (const std::exception& e) {
    resolver->Reject(context,
        v8::Exception::Error(v8::String::NewFromUtf8(isolate,
            e.what()).ToLocalChecked())).Check();
  }
  
  return scope.Escape(resolver->GetPromise());
}

void InitializeESModuleSystem(v8::Isolate* isolate) {
  // Set module resolution and dynamic import callbacks
  isolate->SetHostImportModuleDynamicallyCallback(ImportModuleDynamicallyCallback);
}

void CleanupESModuleSystem(v8::Isolate* isolate) {
  // Reset all Global handles before V8 isolate cleanup
  for (auto& kv : g_moduleRegistry) {
    kv.second.Reset();
  }
  
  // Clear the registry
  g_moduleRegistry.clear();
}

}  // namespace v8impl
