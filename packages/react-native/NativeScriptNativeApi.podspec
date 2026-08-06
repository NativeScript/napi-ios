require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))
fabric_enabled = ENV["RCT_NEW_ARCH_ENABLED"] == "1"

folly_compiler_flags = "-DFOLLY_NO_CONFIG -DFOLLY_MOBILE=1 -DFOLLY_USE_LIBCPP=1 -DFOLLY_CFG_NO_COROUTINES=1 -Wno-comma -Wno-shorten-64-to-32"

Pod::Spec.new do |s|
  s.name = "NativeScriptNativeApi"
  s.version = package["version"]
  s.summary = package["description"]
  s.homepage = "https://github.com/NativeScript/napi-ios"
  s.license = "Apache-2.0"
  s.author = package["author"]
  s.platforms = { :ios => "13.0" }
  s.source = { :git => "https://github.com/NativeScript/napi-ios.git", :tag => "react-native-v#{s.version}" }
  s.requires_arc = false

  s.source_files = [
    "ios/**/*.{h,mm}",
    "native-api/ffi/objc/hermes/**/*.h",
    "native-api/ffi/objc/shared/**/*.h",
    "native-api/ffi/objc/hermes/NativeApiJsi.mm"
  ]
  s.exclude_files = "ios/Fabric/**/*" unless fabric_enabled
  s.public_header_files = "ios/**/*.h"
  s.resource_bundles = {
    "NativeScriptNativeApi" => ["metadata/*.nsmd"]
  }
  s.script_phase = {
    :name => "Prune NativeScript metadata resources",
    :execution_position => :after_compile,
    :script => <<-'SCRIPT'
set -e

bundle="${BUILT_PRODUCTS_DIR}/NativeScriptNativeApi.bundle"
if [ ! -d "$bundle" ]; then
  bundle="${TARGET_BUILD_DIR}/NativeScriptNativeApi.bundle"
fi
if [ ! -d "$bundle" ]; then
  exit 0
fi

keep=" "
case "$PLATFORM_NAME" in
  iphoneos)
    keep="${keep}metadata.ios.arm64.nsmd "
    ;;
  iphonesimulator)
    archs="${ARCHS:-$CURRENT_ARCH}"
    for arch in $archs; do
      case "$arch" in
        arm64|x86_64)
          keep="${keep}metadata.ios-sim.$arch.nsmd "
          ;;
      esac
    done
    ;;
esac

if [ "$keep" = " " ]; then
  exit 0
fi

for file in "$bundle"/metadata*.nsmd; do
  [ -e "$file" ] || continue
  name="$(basename "$file")"
  case "$keep" in
    *" $name "*)
      ;;
    *)
      rm -f "$file"
      ;;
  esac
done
SCRIPT
  }
  s.vendored_frameworks = "ios/vendor/Libffi.xcframework"

  s.compiler_flags = folly_compiler_flags
  s.pod_target_xcconfig = {
    "CLANG_CXX_LANGUAGE_STANDARD" => "c++20",
    "CLANG_CXX_LIBRARY" => "libc++",
    "GCC_PREPROCESSOR_DEFINITIONS" => "$(inherited) TARGET_ENGINE_HERMES=1 NS_GSD_BACKEND_HERMES=1",
    "HEADER_SEARCH_PATHS" => [
      "\"$(PODS_TARGET_SRCROOT)/ios\"",
      "\"$(PODS_TARGET_SRCROOT)/native-api\"",
      "\"$(PODS_TARGET_SRCROOT)/native-api/metadata/include\"",
      "\"$(PODS_TARGET_SRCROOT)/ios/vendor/libffi/include\"",
      "\"$(PODS_ROOT)/Headers/Public/React-Codegen\"",
      "\"$(PODS_ROOT)/Headers/Private/React-Codegen\"",
      "\"$(PODS_ROOT)/Headers/Public/ReactCommon\"",
      "\"$(PODS_ROOT)/Headers/Private/ReactCommon\"",
      "\"$(PODS_ROOT)/Headers/Public/RNWorklets\""
    ].join(" ")
  }

  if respond_to?(:install_modules_dependencies, true)
    install_modules_dependencies(s)
  else
    s.dependency "React-Core"
    s.dependency "React-jsi"
    s.dependency "ReactCommon/turbomodule/core"
  end
  s.dependency "RNWorklets"
end
