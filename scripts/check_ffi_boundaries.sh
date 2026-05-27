#!/bin/bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
NAPI_ENGINE_DIR="$ROOT_DIR/NativeScript/ffi/napi/engine"
DIRECT_DIRS=(
  "$ROOT_DIR/NativeScript/ffi/hermes"
  "$ROOT_DIR/NativeScript/ffi/v8"
  "$ROOT_DIR/NativeScript/ffi/jsc"
  "$ROOT_DIR/NativeScript/ffi/quickjs"
  "$ROOT_DIR/NativeScript/ffi/shared"
  "$ROOT_DIR/packages/react-native/native-api-jsi"
)

if [ -d "$NAPI_ENGINE_DIR" ] && find "$NAPI_ENGINE_DIR" -type f | grep -q .; then
  echo "ffi/napi must remain a pure Node-API backend; do not add ffi/napi/engine." >&2
  exit 1
fi

EXISTING_DIRECT_DIRS=()
for dir in "${DIRECT_DIRS[@]}"; do
  if [ -d "$dir" ]; then
    EXISTING_DIRECT_DIRS+=("$dir")
  fi
done

if [ "${#EXISTING_DIRECT_DIRS[@]}" -eq 0 ]; then
  exit 0
fi

search_sources() {
  local pattern="$1"
  shift

  if command -v rg >/dev/null 2>&1; then
    rg -n "$pattern" "$@" -g '*.{h,hh,hpp,c,cc,cpp,m,mm,inc}'
    return
  fi

  find "$@" \
    -type f \( \
      -name '*.h' -o \
      -name '*.hh' -o \
      -name '*.hpp' -o \
      -name '*.c' -o \
      -name '*.cc' -o \
      -name '*.cpp' -o \
      -name '*.m' -o \
      -name '*.mm' -o \
      -name '*.inc' \
    \) -print0 | xargs -0 grep -nE "$pattern"
}

if search_sources '(^|[^[:alnum:]_])(napi_|napi_env|napi_value|js_native_api|node_api)($|[^[:alnum:]_])' \
  "${EXISTING_DIRECT_DIRS[@]}"; then
  echo "Node-API symbols are not allowed in shared or direct engine FFI folders." >&2
  exit 1
fi

if search_sources '(^|[^[:alnum:]_])(EngineDirect|FastNative|HermesFast|V8Fast|JSCFast|QuickJSFast)($|[^[:alnum:]_])' \
  "$ROOT_DIR/NativeScript/ffi/napi" | grep -v 'GeneratedSignatureDispatch.inc'; then
  echo "Direct-engine FFI code is not allowed in ffi/napi." >&2
  exit 1
fi
