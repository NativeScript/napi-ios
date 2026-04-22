#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/../.." && pwd)"
OUT_FILE="$ROOT_DIR/test/cli/node_api/addon.dylib"
SRC_FILE="$ROOT_DIR/test/cli/node_api/addon.cpp"

clang++ \
  -std=c++20 \
  -dynamiclib \
  -fPIC \
  -undefined dynamic_lookup \
  -I "$ROOT_DIR/NativeScript/napi/common" \
  -I "$ROOT_DIR/NativeScript/napi/hermes" \
  -o "$OUT_FILE" \
  "$SRC_FILE"

echo "Built $OUT_FILE"
