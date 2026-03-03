"use strict";

function toMs(start, end) {
  return end - start;
}

function runScenario(name, iterations, fn) {
  // Warm-up to trigger JIT and metadata caches before timing.
  for (let i = 0; i < 5000; i++) {
    fn(i);
  }

  const startedAt = performance.now();
  let checksum = 0;
  for (let i = 0; i < iterations; i++) {
    checksum += fn(i) | 0;
  }
  const endedAt = performance.now();

  return {
    name,
    iterations,
    durationMs: toMs(startedAt, endedAt),
    perCallUs: ((endedAt - startedAt) * 1000) / iterations,
    checksum,
  };
}

function main() {
  const s1 = NSString.stringWithString("1.2.3");
  const s2 = NSString.stringWithString("1.10.0");
  const baseDate = NSDate.dateWithTimeIntervalSince1970(1700000000.25);

  const scenarios = [
    runScenario("objc.class.no_args.NSDate.date", 2_000_000, () => {
      const d = NSDate.date();
      return d ? 1 : 0;
    }),
    runScenario("objc.class.double_arg.NSDate.dateWithTimeIntervalSince1970", 1_500_000, (i) => {
      const d = NSDate.dateWithTimeIntervalSince1970(1700000000.25 + (i & 31));
      return d ? 1 : 0;
    }),
    runScenario("objc.instance.no_args_primitive_ret.NSDate.timeIntervalSince1970", 3_000_000, () => {
      return baseDate.timeIntervalSince1970 > 0 ? 1 : 0;
    }),
    runScenario("objc.instance.obj_plus_enum_arg.NSString.compareOptions", 2_000_000, () => {
      return s1.compareOptions(s2, NSStringCompareOptions.NSNumericSearch) + 2;
    }),
    runScenario("cfunc.no_args.CFAbsoluteTimeGetCurrent", 3_000_000, () => {
      return CFAbsoluteTimeGetCurrent() > 0 ? 1 : 0;
    }),
  ];

  const totalMs = scenarios.reduce((acc, item) => acc + item.durationMs, 0);
  const payload = {
    runtimePath: NSBundle.mainBundle.executablePath.toString(),
    totalMs,
    scenarios,
  };

  console.log(`BENCH_RESULT:${JSON.stringify(payload)}`);
}

main();
