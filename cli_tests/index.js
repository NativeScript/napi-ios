const moduleA = require("./module_a");

console.log("Hello, World! from index.js");
console.log(moduleA.a());

console.log("performance.now() =", performance.now());

console.log("processor count", NSProcessInfo.processInfo.processorCount);
