"use strict";

const { runAsyncMemoryTest } = require("./_harness");

runAsyncMemoryTest("weakref-finalization", async (t) => {
  const total = 2000;
  const refs = [];
  let finalized = 0;

  const registry = new FinalizationRegistry(() => {
    finalized += 1;
  });

  function createWeakRefs() {
    for (let i = 0; i < total; i++) {
      const payload = { i, bytes: new Uint8Array(256) };
      refs.push(new WeakRef(payload));
      registry.register(payload, i);
    }
  }

  createWeakRefs();

  const start = t.now();
  let alive = total;
  while (t.now() - start < 5000) {
    await t.forceGC(4, 24 * 1024 * 1024, 6);
    alive = 0;
    for (let i = 0; i < refs.length; i++) {
      if (refs[i].deref()) {
        alive += 1;
      }
    }
    if (alive === 0) {
      break;
    }
    await t.sleep(20);
  }

  t.assert(
    alive <= Math.floor(total * 0.1),
    `WeakRef targets still alive after forced GC: ${alive}/${total}, finalized=${finalized}`,
  );

  if (finalized === 0) {
    const finalizeWaitStart = t.now();
    while (t.now() - finalizeWaitStart < 1500 && finalized === 0) {
      await t.forceGC(1, 4 * 1024 * 1024, 2);
      await t.sleep(10);
    }
  }

  t.assert(finalized > 0, "FinalizationRegistry callback never fired after target collection");

  return {
    total,
    alive,
    finalized,
    elapsedMs: t.now() - start,
  };
}, { timeoutMs: 12_000 });
