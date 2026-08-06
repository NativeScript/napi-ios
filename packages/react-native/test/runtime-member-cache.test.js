const assert = require("assert");
const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "../../..");
const hostObjectSources = [
  "NativeScript/ffi/objc/shared/bridge/host_objects/Object.mm",
  "packages/react-native/native-api/ffi/objc/shared/bridge/host_objects/Object.mm",
];

for (const sourcePath of hostObjectSources) {
  const fullPath = path.join(repoRoot, sourcePath);
  if (!fs.existsSync(fullPath)) {
    // The packages/react-native/native-api mirror is a gitignored build
    // artifact produced by `npm run build-rn-turbomodule`; skip it when it
    // hasn't been generated (e.g. a fresh checkout).
    continue;
  }
  const hostObjects = fs.readFileSync(fullPath, "utf8");

  assert(
    hostObjects.includes("NativeApiRuntimeMembersCacheKey"),
    `${sourcePath}: runtime member reflection should key cache entries by class/staticness`,
  );
  assert(
    hostObjects.includes("NativeApiRuntimeMemberIndex"),
    `${sourcePath}: runtime member reflection should build an indexed lookup`,
  );
  assert(
    hostObjects.includes("runtimeMembersCacheMutex"),
    `${sourcePath}: runtime member reflection cache should be synchronized across runtimes`,
  );
  assert(
    hostObjects.includes("buildRuntimeMembersForClass"),
    `${sourcePath}: runtime member reflection should separate scanning from cache lookup`,
  );
  assert(
    hostObjects.includes("cache.emplace(key, members)"),
    `${sourcePath}: runtime member reflection should populate the cache after scanning once`,
  );
  assert(
    hostObjects.includes("memberNames.find(name)"),
    `${sourcePath}: runtime member existence checks should use indexed name lookup`,
  );
  assert(
    hostObjects.includes("selectorsByNameAndCount.find(name)"),
    `${sourcePath}: runtime selector resolution should use indexed selector lookup`,
  );
  // The readable-property-getter fallback cache is intentionally simplified
  // to a single mutex-guarded (Class, property) -> selector map (no
  // thread-local front cache) — see resolveRuntimeReadablePropertyGetter /
  // runtimeReadablePropertyGetter.
  assert(
    hostObjects.includes("resolveRuntimeReadablePropertyGetter("),
    `${sourcePath}: runtime property getter fallback should separate resolution from caching`,
  );
  assert(
    hostObjects.includes("cache[cls][property]"),
    `${sourcePath}: runtime property getter fallback should populate the class/property cache`,
  );
}

console.log("runtime member cache tests passed");
