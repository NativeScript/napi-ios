cmake_minimum_required(VERSION 3.15)

# Metadata

project(NativeScript CXX OBJCXX)

set(NAME NativeScript)
set(VERSION 0.1.0)
set(BUNDLE_IDENTIFIER "org.nativescript.runtime")

set(CMAKE_CXX_STANDARD 20)

set(BUILD_FRAMEWORK TRUE)

set(COMMON_FLAGS "-O3 -Wno-shorten-64-to-32")

set(CMAKE_C_FLAGS "${CMAKE_C_FLAGS} ${COMMON_FLAGS}")

# Arguments

set(TARGET_PLATFORM "macos" CACHE STRING "Target platform for the Objective-C bridge")
set(TARGET_ENGINE "v8" CACHE STRING "Target JS engine for the NativeScript runtime")
set(METADATA_SIZE 0 CACHE STRING "Size of embedded metadata in bytes")
set(BUILD_CLI_BINARY OFF CACHE BOOL "Build the NativeScript CLI binary")

if(TARGET_PLATFORM STREQUAL "ios")
  set(CMAKE_XCODE_ATTRIBUTE_IPHONEOS_DEPLOYMENT_TARGET "13.0")
  set(CMAKE_XCODE_ATTRIBUTE_TARGETED_DEVICE_FAMILY "1,2")
  set(CMAKE_XCODE_ATTRIBUTE_ENABLE_BITCODE "NO")
  set(CMAKE_OSX_DEPLOYMENT_TARGET "13.0")
  set(LIBFFI_BUILD "iphoneos-arm64")
  set(TARGET_PLATFORM_IOS TRUE)
  set(SDK_NAME "iphoneos")
  set(CMAKE_OSX_ARCHITECTURES "arm64")
  set(TARGET_PLATFORM_SPEC "ios-arm64")

elseif(TARGET_PLATFORM STREQUAL "ios-sim")
  set(CMAKE_XCODE_ATTRIBUTE_IPHONEOS_DEPLOYMENT_TARGET "13.0")
  set(CMAKE_XCODE_ATTRIBUTE_TARGETED_DEVICE_FAMILY "1,2")
  set(CMAKE_XCODE_ATTRIBUTE_ENABLE_BITCODE "NO")
  set(CMAKE_OSX_DEPLOYMENT_TARGET "13.0")
  set(LIBFFI_BUILD "iphonesimulator-universal")
  set(TARGET_PLATFORM_IOS TRUE)
  set(TARGET_PLATFORM_SIM TRUE)
  set(SDK_NAME "iphonesimulator")
  set(CMAKE_OSX_ARCHITECTURES "arm64;x86_64")
  set(TARGET_PLATFORM_SPEC "ios-arm64_x86_64-simulator")

elseif(TARGET_PLATFORM STREQUAL "macos")
  set(CMAKE_XCODE_ATTRIBUTE_MACOSX_DEPLOYMENT_TARGET "13.0")
  set(CMAKE_OSX_DEPLOYMENT_TARGET "13.0")
  set(LIBFFI_BUILD "macosx-universal")
  set(TARGET_PLATFORM_MACOS TRUE)
  set(SDK_NAME "macosx")
  set(CMAKE_OSX_ARCHITECTURES "arm64;x86_64")
  set(TARGET_PLATFORM_SPEC "macos-arm64_x86_64")
  set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -DTARGET_PLATFORM_MACOS")

else()
  message(FATAL_ERROR "Unknown target platform: ${TARGET_PLATFORM}")
  return()
endif()

set(ENABLE_JS_RUNTIME TRUE)

if(TARGET_ENGINE STREQUAL "none")
  unset(ENABLE_JS_RUNTIME)
  set(TARGET_ENGINE_NONE TRUE)
elseif(TARGET_ENGINE STREQUAL "hermes")
  set(TARGET_ENGINE_HERMES TRUE)
  set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -stdlib=libc++ -std=c++20 -DTARGET_ENGINE_HERMES")
elseif(TARGET_ENGINE STREQUAL "v8")
  set(TARGET_ENGINE_V8 TRUE)
  add_link_options("-fuse-ld=lld")
  set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -fno-rtti -stdlib=libc++ -std=c++20 -DTARGET_ENGINE_V8")
elseif(TARGET_ENGINE STREQUAL "quickjs")
  set(TARGET_ENGINE_QUICKJS TRUE)
  set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -stdlib=libc++ -std=c++20 -DTARGET_ENGINE_QUICKJS")
elseif(TARGET_ENGINE STREQUAL "jsc")
  set(TARGET_ENGINE_JSC TRUE)
  set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -stdlib=libc++ -std=c++20 -DTARGET_ENGINE_JSC")
else()
  message(FATAL_ERROR "Unknown target engine: ${TARGET_ENGINE}")
  return()
endif()

if(ENABLE_JS_RUNTIME)
  set(CMAKE_C_FLAGS "${CMAKE_C_FLAGS} -DENABLE_JS_RUNTIME")
  set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -DENABLE_JS_RUNTIME")
elseif(TARGET_PLATFORM_MACOS)
  # If building a generic library for macOS, we'll build a dylib instead of a framework
  unset(BUILD_FRAMEWORK)
  set(GENERIC_NAPI TRUE)
endif()

message(STATUS "TARGET_PLATFORM = ${TARGET_PLATFORM}")
message(STATUS "TARGET_ENGINE = ${TARGET_ENGINE}")
message(STATUS "ENABLE_JS_RUNTIME = ${ENABLE_JS_RUNTIME}")

# Set up sources

include_directories(
  ./
  ../metadata-generator/include
  napi/common
  libffi/${LIBFFI_BUILD}/include
)

set(SOURCE_FILES
  ffi/AutoreleasePool.mm
  ffi/Protocol.mm
  ffi/ObjCBridge.mm
  ffi/Block.mm
  ffi/Class.mm
  ffi/Closure.mm
  ffi/ClassMember.mm
  ffi/Cif.mm
  ffi/TypeConv.mm
  ffi/Util.mm
  ffi/Struct.mm
  ffi/ObjectRef.mm
  ffi/JSObject.mm
  ffi/Enum.mm
  ffi/Variable.mm
  ffi/Object.mm
  ffi/CFunction.mm
  ffi/Interop.mm
  ffi/InlineFunctions.mm
  ffi/ClassBuilder.mm
  ffi/NativeScriptException.mm
  ffi/Tasks.cpp
)

if(ENABLE_JS_RUNTIME)
  set(SOURCE_FILES
    ${SOURCE_FILES}
    runtime/modules/console/Console.cpp
    runtime/Runtime.cpp
    runtime/modules/worker/Worker.mm
    runtime/modules/worker/MessageJSON.cpp
    runtime/modules/worker/MessageV8.cpp
    runtime/modules/worker/ConcurrentQueue.cpp
    runtime/modules/worker/WorkerImpl.mm
    runtime/modules/worker/WorkerImpl.mm
    runtime/modules/module/ModuleInternal.cpp
    runtime/modules/performance/Performance.cpp
    runtime/Bundle.mm
    runtime/modules/timers/Timers.mm
    runtime/modules/app/App.mm
    runtime/NativeScript.mm
    runtime/RuntimeConfig.cpp
    runtime/modules/url/ada/ada.cpp
    runtime/modules/url/URL.cpp
    runtime/modules/url/URLSearchParams.cpp
  )

  if(TARGET_ENGINE_V8)
    include_directories(
      napi/v8
      napi/v8/include
      napi/v8/v8_inspector
    )

    set(SOURCE_FILES
      ${SOURCE_FILES}
      napi/v8/v8-api.cpp
      napi/v8/v8-module-loader.cpp
      napi/v8/jsr.cpp
      napi/v8/SimpleAllocator.cpp
    )

  elseif(TARGET_ENGINE_HERMES)
    include_directories(
      napi/hermes
      napi/hermes/include
      napi/hermes/include/hermes
      napi/hermes/include/jsi
    )

    set(SOURCE_FILES
      ${SOURCE_FILES}
      napi/hermes/jsr.cpp
    )

  elseif(TARGET_ENGINE_QUICKJS)
    set(MI_BUILD_OBJECT OFF)
    set(MI_OVERRIDE OFF)
    set(MI_BUILD_SHARED OFF)
    set(MI_BUILD_TESTS OFF)

    set(CMAKE_XCODE_ATTRIBUTE_CODE_SIGNING_REQUIRED "NO")

    add_subdirectory(napi/quickjs/mimalloc-dev mimalloc)

    include_directories(
      napi/quickjs
      napi/quickjs/source
      napi/common
      mimalloc
      napi/quickjs/mimalloc-dev/include
    )

    set(SOURCE_FILES ${SOURCE_FILES}
      # quickjs
      napi/quickjs/source/cutils.c
      napi/quickjs/source/libregexp.c
      napi/quickjs/source/libbf.c
      napi/quickjs/source/libunicode.c
      napi/quickjs/source/quickjs.c
      # napi
      napi/quickjs/quickjs-api.c
      napi/quickjs/jsr.cpp
    )

  elseif(TARGET_ENGINE_JSC)
    include_directories(
      napi/jsc
      napi/jsc/include
      napi/common
    )

    set(SOURCE_FILES ${SOURCE_FILES}
      napi/jsc/jsc-api.cpp
      napi/jsc/jsr.cpp
    )

  endif()
else()
  include_directories(
    napi/generic
  )
endif()

if(BUILD_CLI_BINARY)
  set(SOURCE_FILES ${SOURCE_FILES}
    cli/main.cpp
    cli/segappend.cpp
  )
endif()

# Find SDK

find_program(XCODEBUILD_EXECUTABLE xcodebuild)

if(METADATA_SIZE EQUAL 0)
  unset(METADATA_SIZE)
else()
  message(STATUS "EMBED_METADATA_SIZE = ${METADATA_SIZE}"
    " (metadata will be embedded in the library)")
  set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -DEMBED_METADATA_SIZE=${METADATA_SIZE}")
endif()

message(STATUS "TARGET_PLATFORM = ${TARGET_PLATFORM}")

execute_process(
  COMMAND ${XCODEBUILD_EXECUTABLE} -version -sdk ${SDK_NAME} Path
  OUTPUT_VARIABLE CMAKE_OSX_SYSROOT_INT
  ERROR_QUIET
  OUTPUT_STRIP_TRAILING_WHITESPACE
)

set(CMAKE_OSX_SYSROOT_INT "${CMAKE_OSX_SYSROOT_INT}" CACHE INTERNAL "")
set(CMAKE_OSX_SYSROOT "${CMAKE_OSX_SYSROOT_INT}" CACHE INTERNAL "")

message(STATUS "SDK = ${CMAKE_OSX_SYSROOT}")

# Build targets

if(BUILD_CLI_BINARY)
  add_executable(${NAME} ${SOURCE_FILES})
else()
  add_library(
    ${NAME}
    SHARED
    ${SOURCE_FILES}
  )
endif()

target_sources(
  ${NAME}
  PRIVATE
  "NativeScript.h"
)

set_target_properties(${NAME} PROPERTIES
  VERSION ${VERSION}
  SOVERSION ${VERSION}
  FRAMEWORK_VERSION ${VERSION}
  MACOSX_FRAMEWORK_SHORT_VERSION_STRING ${VERSION}
  MACOSX_FRAMEWORK_BUNDLE_VERSION ${VERSION}
  MACOSX_FRAMEWORK_IDENTIFIER ${BUNDLE_IDENTIFIER}
  PUBLIC_HEADER "NativeScript.h"
)

if(BUILD_FRAMEWORK)
  message(STATUS "FRAMEWORK = TRUE")
  set_target_properties(${NAME} PROPERTIES
    FRAMEWORK TRUE
  )
endif()

if(TARGET_PLATFORM_MACOS)
  # add_custom_command(TARGET ${NAME} POST_BUILD
  #   COMMAND /usr/libexec/PlistBuddy -c "Add :LSMinimumSystemVersion string ${CMAKE_OSX_DEPLOYMENT_TARGET}" $<TARGET_FILE_DIR:${NAME}>/Resources/Info.plist
  # )

  set(METADATA_FILE "metadata.macos.nsmd")
elseif(TARGET_PLATFORM_IOS)
  # Convert the Info.plist from binary format to XML format.
  # This seemed to unblock a build error when using in React Native.
  add_custom_command(TARGET ${NAME} POST_BUILD
    COMMAND plutil -convert xml1 $<TARGET_FILE_DIR:${NAME}>/Info.plist
  )

  if(TARGET_PLATFORM_SIM)
    set(METADATA_FILE "metadata.ios-sim.nsmd")
  else()
    set(METADATA_FILE "metadata.ios.nsmd")
  endif()
endif()

if(NOT METADATA_SIZE EQUAL 0)
  message(STATUS "Running script to embed metadata in the library")

  add_custom_command(TARGET ${NAME} POST_BUILD
    COMMAND codesign --remove-signature $<TARGET_FILE:${NAME}>
  )

  add_custom_command(TARGET ${NAME} POST_BUILD
    COMMAND deno run -A ${CMAKE_CURRENT_SOURCE_DIR}/../scripts/write_metadata.ts $<TARGET_FILE:${NAME}> ${METADATA_FILE}
  )

  add_custom_command(TARGET ${NAME} POST_BUILD
    COMMAND codesign -fs - $<TARGET_FILE:${NAME}>
  )
endif()

message(STATUS "LIBFFI_BUILD = ${LIBFFI_BUILD}")

target_link_directories(
  ${NAME}
  PRIVATE
  ${CMAKE_CURRENT_SOURCE_DIR}/libffi/${LIBFFI_BUILD}
)

if(TARGET_ENGINE_HERMES)
  target_link_options(
    ${NAME}
    PRIVATE
    -Wl,-rpath,@executable_path/../Frameworks
    -Wl,-rpath,${CMAKE_CURRENT_SOURCE_DIR}/../Frameworks/hermes.xcframework/${TARGET_PLATFORM_SPEC}
    -Wl,-F${CMAKE_CURRENT_SOURCE_DIR}/../Frameworks/hermes.xcframework/${TARGET_PLATFORM_SPEC}
  )

  target_link_libraries(
    ${NAME}
    PRIVATE
    "-framework hermes"
  )
endif()

if(TARGET_ENGINE_JSC)
  target_link_libraries(
    ${NAME}
    PRIVATE
    "-framework JavaScriptCore"
  )
endif()

if(TARGET_ENGINE_V8)
  if (TARGET_PLATFORM_MACOS)
    target_link_directories(
      ${NAME}
      PRIVATE
      ${CMAKE_CURRENT_SOURCE_DIR}/../Frameworks/v8_macos
    )
  else()
    target_link_directories(
      ${NAME}
      PRIVATE
      ${CMAKE_CURRENT_SOURCE_DIR}/../Frameworks/v8_ios
    )
  endif()

  target_link_libraries(
    ${NAME}
    PRIVATE
    "v8_monolith"
    "v8_libbase"
    "v8_libplatform"
  )
endif()

target_link_libraries(
  ${NAME}
  PRIVATE
  ffi
  "-framework Foundation"
)

if(TARGET_PLATFORM_MACOS)
  target_link_libraries(
    ${NAME}
    PRIVATE
    "-framework AppKit"
  )
elseif(TARGET_PLATFORM_IOS)
  target_link_libraries(
    ${NAME}
    PRIVATE
    "-framework UIKit"
  )
endif()

if(TARGET_ENGINE_QUICKJS)
  target_link_libraries(
    ${NAME}
    PRIVATE
    mimalloc-static
  )
endif()

# if (GENERIC_NAPI)
target_link_options(
  ${NAME}
  PRIVATE
  "-Wl"
  "-undefined"
  "dynamic_lookup"
)
# endif()
