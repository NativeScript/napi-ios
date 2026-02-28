"use strict";

const total = 5000;
const refs = [];

for (let i = 0; i < total; i++) {
  const payload = { i, bytes: new Uint8Array(128) };
  refs.push(new WeakRef(payload));
}

for (let cycle = 0; cycle < 16; cycle++) {
  if (typeof gc === "function") {
    gc();
  }
  const pressure = new Array(512);
  for (let i = 0; i < pressure.length; i++) {
    pressure[i] = new Uint8Array(64 * 1024);
  }
}

setTimeout(() => {
  if (typeof gc === "function") {
    gc();
  }

  let alive = 0;
  for (let i = 0; i < refs.length; i++) {
    if (refs[i].deref()) {
      alive += 1;
    }
  }

  const pass = alive <= Math.floor(total * 0.1);

  console.log(`MEMTEST_RESULT:${JSON.stringify({
    name: "weakref-plain-script",
    pass,
    details: { total, alive },
    error: pass ? undefined : `WeakRef targets unexpectedly alive in plain script: ${alive}/${total}`,
  })}`);
}, 0);
