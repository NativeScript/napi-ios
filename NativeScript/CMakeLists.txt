cmake_minimum_required(VERSION 3.15)

# Metadata

project(NativeScript)

set(NAME NativeScript)
set(VERSION 0.1.0)
set(BUNDLE_IDENTIFIER "org.nativescript.runtime")

set(CMAKE_C_FLAGS "${CMAKE_C_FLAGS} -fobjective-c")

set(CMAKE_CXX_STANDARD 20)

set(BUILD_FRAMEWORK TRUE)

# Arguments

set(TARGET_PLATFORM "macos" CACHE STRING "Target platform for the Objective-C bridge")
set(TARGET_ENGINE "hermes" CACHE STRING "Target JS engine for the NativeScript runtime")
set(METADATA_SIZE 0 CACHE STRING "Size of embedded metadata in bytes")

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
else()
  message(FATAL_ERROR "Unknown target platform: ${TARGET_PLATFORM}")
  return()
endif()

set(ENABLE_JS_RUNTIME TRUE)

if (TARGET_ENGINE STREQUAL "none")
  unset(ENABLE_JS_RUNTIME)
  set(TARGET_ENGINE_NONE TRUE)
elseif (TARGET_ENGINE STREQUAL "hermes")
  set(TARGET_ENGINE_HERMES TRUE)
  set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -stdlib=libc++ -std=c++20 -DTARGET_ENGINE_HERMES")
elseif (TARGET_ENGINE STREQUAL "v8")
  set(TARGET_ENGINE_V8 TRUE)
  add_link_options("-fuse-ld=/opt/homebrew/opt/llvm/bin/ld64.lld")
  set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -fno-rtti -stdlib=libc++ -std=c++20 -DV8_COMPRESS_POINTERS -DV8_ENABLE_SANDBOX -DTARGET_ENGINE_V8")
else()
  message(FATAL_ERROR "Unknown target engine: ${TARGET_ENGINE}")
  return()
endif()

if (ENABLE_JS_RUNTIME)
  set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -DENABLE_JS_RUNTIME")
elseif (TARGET_PLATFORM_MACOS)
  # If building a generic library for macOS, we'll build a dylib instead of a framework
  unset(BUILD_FRAMEWORK)
  set(GENERIC_NAPI TRUE)
endif()

message(STATUS "TARGET_PLATFORM = ${TARGET_PLATFORM}")
message(STATUS "TARGET_ENGINE = ${TARGET_ENGINE}")
message(STATUS "ENABLE_JS_RUNTIME = ${ENABLE_JS_RUNTIME}")

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

# Set up sources

include_directories(
  ./
  ../metadata-generator/include
  ada
  napi/common
  libffi/${LIBFFI_BUILD}/include
  /Library/Developer/CommandLineTools/usr/include
)

if (TARGET_ENGINE_V8)
  include_directories(
    napi/v8
    napi/v8/include
    napi/v8/v8_inspector
  )
elseif(TARGET_ENGINE_HERMES)
  include_directories(
    napi/hermes
    napi/hermes/hermes
    napi/hermes/jsi
  )
elseif(TARGET_ENGINE_NONE)
  include_directories(
    napi/generic
  )
endif()

set(LIB_SOURCE_FILES
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
)

if (ENABLE_JS_RUNTIME)
  set(LIB_SOURCE_FILES
    ${LIB_SOURCE_FILES}
    runtime/Console.cpp
    runtime/Runtime.cpp
    runtime/Require.cpp
    runtime/Performance.cpp
    runtime/Bundle.mm
    runtime/Timers.mm
    runtime/App.mm
    runtime/NativeScript.mm
    runtime/RuntimeConfig.cpp
  )

  if (TARGET_ENGINE_V8)
    set(LIB_SOURCE_FILES
      ${LIB_SOURCE_FILES}
      napi/v8/v8-api.cpp
      napi/v8/jsr.cpp
      napi/v8/SimpleAllocator.cpp
    )
  elseif(TARGET_ENGINE_HERMES)
    set(LIB_SOURCE_FILES
      ${LIB_SOURCE_FILES}
      napi/hermes/jsr.cpp
    )
  endif()
endif()

# Build targets

add_library(
  ${NAME}
  SHARED
  ${LIB_SOURCE_FILES}
)

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
  MACOSX_FRAMEWORK_IDENTIFIER org.nativescript.runtime
  PUBLIC_HEADER "NativeScript.h"
)

if (BUILD_FRAMEWORK)
  message(STATUS "FRAMEWORK = TRUE")
  set_target_properties(${NAME} PROPERTIES
    FRAMEWORK TRUE
  )
endif()

if(TARGET_PLATFORM_MACOS)
  set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -DTARGET_PLATFORM_MACOS")

  # add_custom_command(TARGET ${NAME} POST_BUILD
  #   COMMAND /usr/libexec/PlistBuddy -c "Add :LSMinimumSystemVersion string ${CMAKE_OSX_DEPLOYMENT_TARGET}" $<TARGET_FILE_DIR:${NAME}>/Resources/Info.plist
  # )

  set(METADATA_FILE "metadata.macos.nsmd")
elseif(TARGET_PLATFORM_IOS)
  set(METADATA_FILE "metadata.ios.nsmd")
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

if (TARGET_ENGINE_HERMES)
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

# if (GENERIC_NAPI)
  target_link_options(
    ${NAME}
    PRIVATE
    "-Wl"
    "-undefined"
    "dynamic_lookup"
  )
# endif()
