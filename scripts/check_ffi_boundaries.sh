#!/bin/bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
DIRECT_DIRS=(
  "$ROOT_DIR/NativeScript/ffi/hermes"
  "$ROOT_DIR/NativeScript/ffi/v8"
  "$ROOT_DIR/NativeScript/ffi/jsc"
  "$ROOT_DIR/NativeScript/ffi/quickjs"
  "$ROOT_DIR/NativeScript/ffi/shared"
)

EXISTING_DIRECT_DIRS=()
for dir in "${DIRECT_DIRS[@]}"; do
  if [ -d "$dir" ]; then
    EXISTING_DIRECT_DIRS+=("$dir")
  fi
done

if [ "${#EXISTING_DIRECT_DIRS[@]}" -eq 0 ]; then
  exit 0
fi

if rg -n '\b(napi_|napi_env|napi_value|js_native_api|node_api)\b' \
  "${EXISTING_DIRECT_DIRS[@]}" \
  -g '*.{h,hh,hpp,c,cc,cpp,m,mm,inc}'; then
  echo "Node-API symbols are not allowed in shared or direct engine FFI folders." >&2
  exit 1
fi
