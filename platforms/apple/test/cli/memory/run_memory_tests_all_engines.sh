#!/bin/bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/../../../../.." && pwd)"
TEST_RUNNER="$SCRIPT_DIR/run_memory_semantics_tests.js"
GREP_FILTER="${1:-}"
ENGINES=(v8 quickjs jsc hermes)

for engine in "${ENGINES[@]}"; do
  echo
  echo "=== Building macOS CLI for ${engine} ==="
  "$ROOT_DIR/scripts/build_nativescript.sh" --no-iphone --no-simulator --no-macos --macos-cli "--${engine}"

  echo "=== Running CLI memory suite for ${engine} ==="
  if [[ -n "$GREP_FILTER" ]]; then
    node "$TEST_RUNNER" --repeat 1 --grep "$GREP_FILTER"
  else
    node "$TEST_RUNNER" --repeat 1
  fi
done
