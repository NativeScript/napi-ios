#!/bin/bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/../.." && pwd)"
GREP_FILTER="${1:-}"
ENGINES=(v8 quickjs jsc hermes)

for engine in "${ENGINES[@]}"; do
  echo
  echo "=== Building macOS CLI for ${engine} ==="
  "$ROOT_DIR/build_nativescript.sh" --no-iphone --no-simulator --no-macos --macos-cli "--${engine}"

  echo "=== Running CLI memory suite for ${engine} ==="
  if [[ -n "$GREP_FILTER" ]]; then
    node "$ROOT_DIR/test/cli/memory/run_memory_semantics_tests.js" --repeat 1 --grep "$GREP_FILTER"
  else
    node "$ROOT_DIR/test/cli/memory/run_memory_semantics_tests.js" --repeat 1
  fi
done
