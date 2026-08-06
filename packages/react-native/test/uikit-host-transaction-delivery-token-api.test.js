const assert = require("assert");
const fs = require("fs");
const path = require("path");

const packageRoot = path.resolve(__dirname, "..");

function read(relativePath) {
  return fs.readFileSync(path.join(packageRoot, relativePath), "utf8");
}

const index = read("src/index.ts");
const declarations = read("src/index.ts");
const hostView = read("ios/NativeScriptUIView.mm");

const normalizedIndex = index.replace(/\s+/g, " ");
const normalizedHostView = hostView.replace(/\s+/g, " ");

// SEAM D STAGE 0 follow-up (runtime side of the O(1) pop-time readiness
// predicate): the runtime already maintains an integer,
// `_fabricTransactionDeliveryToken`, bumped exactly-once per ACTUAL delivery
// inside the single funnel `notifyFabricTransactionCommittedWithModifiedChildren:
// modifiedProps:mutations:`. This stage only surfaces that already-correct
// integer to JS -- it adds no new native bookkeeping.

assert(
  declarations.includes("export type UIKitFabricTransaction = {") &&
    declarations.includes("readonly deliveryToken?: number;"),
  "src/index.d.ts UIKitFabricTransaction should declare an optional deliveryToken field",
);

assert(
  index.includes("export type UIKitFabricTransaction = {") &&
    index.includes("readonly deliveryToken?: number;"),
  "src/index.ts UIKitFabricTransaction should declare an optional deliveryToken field matching src/index.d.ts",
);

// The native dictionary literal built by fabricTransactionJsonWithModifiedChildren:
// modifiedProps:mutations: (the JSON assembly shared by every transaction
// lifecycle event, including the transactionCommitted funnel) must surface the
// ivar under the same "deliveryToken" key the JS parser reads.
assert(
  normalizedHostView.includes(
    '@"children" : [self fabricMountedChildrenSnapshot], @"hasModifiedChildren" : @(hasModifiedChildren), @"hasModifiedProps" : @(hasModifiedProps), @"mutations" : mutations ?: @[],',
  ) && normalizedHostView.includes('@"deliveryToken" : @(_fabricTransactionDeliveryToken),'),
  "NativeScriptUIView fabricTransactionJsonWithModifiedChildren:modifiedProps:mutations: should surface _fabricTransactionDeliveryToken as deliveryToken in the transaction JSON",
);

// Monotonicity: _fabricTransactionDeliveryToken must never be reset or
// reassigned to anything other than an increment -- only `+= 1` (the commit
// funnel, the props-revision scheduler) or the `++` prefix form (the
// dedicated advance accessor) may touch it. This is what makes the surfaced
// value strictly increasing across deliveries for a given host instance.
const deliveryTokenMutations = hostView.match(
  /_fabricTransactionDeliveryToken\s*(\+=\s*1|=\s*\+\+_fabricTransactionDeliveryToken)?[^;]*;/g,
) || [];
const nonIncrementMutations = hostView.match(
  /_fabricTransactionDeliveryToken\s*=(?!=)\s*(?!\+\+_fabricTransactionDeliveryToken\b)[^;]*;/g,
) || [];
assert(
  deliveryTokenMutations.length > 0 && nonIncrementMutations.length === 0,
  "_fabricTransactionDeliveryToken should only ever be incremented (never reset or reassigned to a non-increment value), so the deliveryToken surfaced to JS is strictly increasing across deliveries per host",
);

// The bump inside the transactionCommitted funnel must precede the JSON
// build call within the same method body, so the token surfaced for THIS
// delivery already reflects THIS delivery's increment (not the prior one).
const funnelStart = hostView.indexOf(
  "- (void)notifyFabricTransactionCommittedWithModifiedChildren:(BOOL)hasModifiedChildren\n" +
    "                                               modifiedProps:(BOOL)hasModifiedProps\n" +
    "                                                   mutations:",
);
assert(funnelStart >= 0, "expected to locate the transactionCommitted funnel method");
const funnelEnd = hostView.indexOf("\n}\n", funnelStart);
const funnelBody = hostView.slice(funnelStart, funnelEnd);
const bumpIndex = funnelBody.indexOf("_fabricTransactionDeliveryToken += 1;");
const jsonBuildIndex = funnelBody.indexOf("fabricTransactionJsonWithModifiedChildren:hasModifiedChildren");
assert(
  bumpIndex >= 0 && jsonBuildIndex >= 0 && bumpIndex < jsonBuildIndex,
  "the transactionCommitted funnel should bump _fabricTransactionDeliveryToken before building the transaction JSON that surfaces it, so JS observes the freshly-incremented value for this exact delivery",
);

// parseUIKitFabricTransactionJson must extract deliveryToken (numeric,
// non-NaN/non-infinite guarded like the existing mutation numeric fields)
// from a real native payload...
const transactionParser = index.slice(
  index.indexOf("function parseUIKitFabricTransactionJson"),
  index.indexOf("function parseUIKitFabricMountedChildRecord"),
);
assert(
  transactionParser.includes(
    "(parsed as Record<string, unknown>).deliveryToken",
  ) &&
    transactionParser.includes('typeof deliveryTokenValue === "number"') &&
    transactionParser.includes("deliveryTokenValue !== Infinity") &&
    transactionParser.includes("deliveryTokenValue !== -Infinity") &&
    transactionParser.includes("deliveryToken,"),
  "parseUIKitFabricTransactionJson should extract a guarded numeric deliveryToken from the native payload",
);

// ...but the synthesized empty/fallback transaction literals (no-payload
// early return, the parse-failure catch branch, the finally-block resets,
// and the mountChild/unmountChild/mountingTransactionWillMount synthetic
// transactions) must simply OMIT the field rather than fabricate a token,
// since fabricating one could collide with or shadow a real per-host
// sequence number a Stage 2 consumer derives readiness from.
const emptyTransactionLiteralPattern =
  /\{\s*children:\s*\[\],\s*hasModifiedChildren:\s*(?:false|true),\s*hasModifiedProps:\s*(?:false|true),\s*mutations:\s*\[\],\s*\}/g;
const emptyTransactionLiterals = index.match(emptyTransactionLiteralPattern) || [];
assert(
  emptyTransactionLiterals.length >= 5,
  "expected to find the synthesized empty-transaction literals (no-payload guard, catch branch, transaction-finished resets, mountChild/unmountChild synthetic transactions)",
);
assert(
  emptyTransactionLiterals.every((literal) => !literal.includes("deliveryToken")),
  "synthesized empty-transaction literals should omit deliveryToken rather than fabricate one",
);

console.log("uikit host transaction delivery token API tests passed");
