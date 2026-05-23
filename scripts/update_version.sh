#!/bin/bash
set -e
source "$(dirname "$0")/build_utils.sh"

TARGET=${1:-ios}
PACKAGE_VERSION_OVERRIDE=${2:-$PACKAGE_VERSION}

case "$TARGET" in
  ios|ios-v8|ios-hermes|ios-jsc|ios-quickjs|macos|visionos|ios-node-api|macos-node-api|objc-node-api)
    PACKAGE_JSON="packages/$TARGET/package.json"
    ;;
  *)
    echo "Unknown version target: $TARGET" >&2
    exit 1
    ;;
esac

if [ -n "$PACKAGE_VERSION_OVERRIDE" ]; then
    TMP_FILE=$(mktemp)
    jq ".version = \"$PACKAGE_VERSION_OVERRIDE\"" "$PACKAGE_JSON" > "$TMP_FILE"
    mv "$TMP_FILE" "$PACKAGE_JSON"
fi

# Read the version from the selected package.json and replace it inside the NativeScript-Prefix.pch precompiled header
FULL_VERSION=$(jq -r .version "$PACKAGE_JSON")
sed -i.bak "s/#define[[:space:]]*NATIVESCRIPT_VERSION[[:space:]]*\"\(.*\)\"/#define NATIVESCRIPT_VERSION \"$FULL_VERSION\"/g" NativeScript/NativeScript-Prefix.pch && rm NativeScript/NativeScript-Prefix.pch.bak
