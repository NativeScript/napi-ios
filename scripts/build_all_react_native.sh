#!/bin/bash
set -e
source "$(dirname "$0")/build_utils.sh"

"$SCRIPT_DIR/build_all_ios.sh" --no-engine --embed-metadata --macos
