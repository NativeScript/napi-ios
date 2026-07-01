"use strict";

const { runPlainMemoryTest } = require("./_plain_harness");

runPlainMemoryTest("objc-ownership-rules", async (t) => {
  const rounds = 1000;
  let addRetainFailures = 0;
  let releaseFailures = 0;
  let totalBefore = 0;
  let totalAfterAdd = 0;
  let totalAfterRemove = 0;

  for (let i = 0; i < rounds; i++) {
    const obj = NSObject.new();
    const array = NSMutableArray.new();
    const before = obj.retainCount();
    array.addObject(obj);
    const afterAdd = obj.retainCount();
    array.removeAllObjects();
    const afterRemove = obj.retainCount();

    totalBefore += before;
    totalAfterAdd += afterAdd;
    totalAfterRemove += afterRemove;

    if (afterAdd < before + 1) {
      addRetainFailures += 1;
    }
    if (afterRemove > afterAdd - 1) {
      releaseFailures += 1;
    }

  }

  t.assert(addRetainFailures === 0, `container add did not retain in ${addRetainFailures} rounds`);
  t.assert(releaseFailures === 0, `container remove did not release in ${releaseFailures} rounds`);

  return {
    rounds,
    addRetainFailures,
    releaseFailures,
    avgBefore: totalBefore / rounds,
    avgAfterAdd: totalAfterAdd / rounds,
    avgAfterRemove: totalAfterRemove / rounds,
  };
}, { timeoutMs: 20_000 });
