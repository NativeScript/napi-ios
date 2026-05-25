#!/bin/bash
set -euo pipefail
source "$(dirname "$0")/build_utils.sh"

PACKAGE_DIR="packages/react-native"
OUTPUT_DIR="$PACKAGE_DIR/dist"
PACK_DESTINATION=${NPM_PACK_DESTINATION:-"$REPO_ROOT/build/npm-tarballs"}
VERSION_OVERRIDE=${NPM_PACKAGE_VERSION:-}
SKIP_PACK=false

while [[ $# -gt 0 ]]; do
  case "$1" in
    --no-pack)
      SKIP_PACK=true
      shift
      ;;
    *)
      echo "Unknown argument: $1" >&2
      exit 1
      ;;
  esac
done

checkpoint "Preparing @nativescript/react-native TurboModule package..."

rm -rf \
  "$PACKAGE_DIR/native-api-jsi" \
  "$PACKAGE_DIR/metadata" \
  "$PACKAGE_DIR/ios/vendor" \
  "$PACKAGE_DIR/types"
mkdir -p \
  "$PACKAGE_DIR/native-api-jsi/metadata/include" \
  "$PACKAGE_DIR/metadata" \
  "$PACKAGE_DIR/ios/vendor/libffi/include" \
  "$PACKAGE_DIR/types/ios" \
  "$PACKAGE_DIR/types/objc-node-api" \
  "$PACK_DESTINATION"

cp NativeScript/ffi/hermes/jsi/NativeApiJsi.h "$PACKAGE_DIR/native-api-jsi/"
cp NativeScript/ffi/hermes/jsi/NativeApiJsi.mm "$PACKAGE_DIR/native-api-jsi/"
cp NativeScript/ffi/hermes/jsi/NativeApiJsi*.inc "$PACKAGE_DIR/native-api-jsi/"
cp NativeScript/ffi/hermes/jsi/NativeApiJsiReactNative.h "$PACKAGE_DIR/native-api-jsi/"
cp metadata-generator/include/Metadata.h "$PACKAGE_DIR/native-api-jsi/metadata/include/"
cp metadata-generator/include/MetadataReader.h "$PACKAGE_DIR/native-api-jsi/metadata/include/"
cp NativeScript/libffi/iphonesimulator-universal/include/ffi.h "$PACKAGE_DIR/ios/vendor/libffi/include/"
cp NativeScript/libffi/iphonesimulator-universal/include/ffitarget.h "$PACKAGE_DIR/ios/vendor/libffi/include/"

cp metadata-generator/metadata/metadata.ios-sim.arm64.nsmd "$PACKAGE_DIR/metadata/"
cp metadata-generator/metadata/metadata.ios-sim.x86_64.nsmd "$PACKAGE_DIR/metadata/"
cp metadata-generator/metadata/metadata.ios.arm64.nsmd "$PACKAGE_DIR/metadata/"

checkpoint "Staging iOS SDK TypeScript declarations..."
cp packages/objc-node-api/index.d.ts "$PACKAGE_DIR/types/objc-node-api/"
cp packages/objc-node-api/inline_functions.d.ts "$PACKAGE_DIR/types/objc-node-api/"
cp packages/ios/types/*.d.ts "$PACKAGE_DIR/types/ios/"
perl -0pi -e 's#/// <reference types="\@nativescript/objc-node-api" />#/// <reference path="../objc-node-api/index.d.ts" />#g' \
  "$PACKAGE_DIR"/types/ios/*.d.ts
node - "$PACKAGE_DIR/types/ios" <<'NODE'
const fs = require('fs');
const path = require('path');

const typesDir = process.argv[2];
const reservedParameterNames = [
  'abstract',
  'as',
  'asserts',
  'async',
  'await',
  'break',
  'case',
  'catch',
  'class',
  'const',
  'continue',
  'debugger',
  'declare',
  'default',
  'delete',
  'do',
  'else',
  'enum',
  'export',
  'extends',
  'false',
  'finally',
  'for',
  'from',
  'function',
  'if',
  'implements',
  'import',
  'in',
  'infer',
  'instanceof',
  'interface',
  'is',
  'keyof',
  'let',
  'module',
  'namespace',
  'never',
  'new',
  'null',
  'of',
  'package',
  'private',
  'protected',
  'public',
  'readonly',
  'require',
  'return',
  'satisfies',
  'static',
  'super',
  'switch',
  'throw',
  'true',
  'try',
  'type',
  'typeof',
  'undefined',
  'unique',
  'unknown',
  'var',
  'void',
  'while',
  'with',
  'yield',
];
const reservedPattern = new RegExp(
  `([,(]\\s*)(${reservedParameterNames.join('|')})(\\??\\s*:)`,
  'g',
);

for (const entry of fs.readdirSync(typesDir)) {
  if (!entry.endsWith('.d.ts')) {
    continue;
  }

  const file = path.join(typesDir, entry);
  let source = fs.readFileSync(file, 'utf8');
  source = source.replace(reservedPattern, '$1_$2$3');
  source = source.replace(/^[ \t]*:[^;\n]+;[ \t]*\n/gm, '');
  fs.writeFileSync(file, source);
}
NODE
{
  echo '/// <reference path="../objc-node-api/index.d.ts" />'
  while IFS= read -r declaration; do
    echo "/// <reference path=\"./$declaration\" />"
  done < <(find "$PACKAGE_DIR/types/ios" -maxdepth 1 -name '*.d.ts' ! -name 'index.d.ts' -exec basename {} \; | sort)
} > "$PACKAGE_DIR/types/ios/index.d.ts"

checkpoint "Creating Libffi.xcframework for the TurboModule pod..."
xcodebuild -create-xcframework \
  -library NativeScript/libffi/iphoneos-arm64/libffi.a \
  -headers NativeScript/libffi/iphoneos-arm64/include \
  -library NativeScript/libffi/iphonesimulator-universal/libffi.a \
  -headers NativeScript/libffi/iphonesimulator-universal/include \
  -output "$PACKAGE_DIR/ios/vendor/Libffi.xcframework"

if [[ -n "$VERSION_OVERRIDE" ]]; then
  TMP_FILE=$(mktemp)
  jq --arg version "$VERSION_OVERRIDE" '.version = $version' \
    "$PACKAGE_DIR/package.json" > "$TMP_FILE"
  mv "$TMP_FILE" "$PACKAGE_DIR/package.json"
fi

if [[ "$SKIP_PACK" == "true" ]]; then
  checkpoint "@nativescript/react-native package staged."
  exit 0
fi

rm -rf "$OUTPUT_DIR"
mkdir -p "$OUTPUT_DIR"

checkpoint "Packing @nativescript/react-native..."
(
  cd "$PACKAGE_DIR"
  npm pack --pack-destination "$REPO_ROOT/$OUTPUT_DIR"
)

cp "$OUTPUT_DIR"/*.tgz "$PACK_DESTINATION/"

checkpoint "@nativescript/react-native npm package created."
