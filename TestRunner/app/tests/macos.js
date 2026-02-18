// macOS-focused TestRunner entrypoint for nsr CLI.
// This keeps the iOS suite untouched and runs a stable subset under nsr.

console.log("Application Start!");

require("./Infrastructure/timers");
require("./Infrastructure/simulator");
global.utf8 = require("./Infrastructure/utf8");

global.UNUSED = function (param) {
};

let tnsOutput = null;

global.TNSGetOutput = function () {
    if (tnsOutput === null) {
        tnsOutput = "";
    }

    return tnsOutput;
};

global.TNSLog = function (message) {
    let text;
    try {
        text = `${message}`;
    } catch (_) {
        text = Object.prototype.toString.call(message);
    }
    tnsOutput = global.TNSGetOutput() + text;
};

global.TNSClearOutput = function () {
    tnsOutput = null;
};

if (typeof global.__runtimeVersion === "undefined") {
    global.__runtimeVersion = "nsr-cli";
}

// Emit JUnit output in the same prefixed format as the iOS runner expects.
global.__JUnitSaveResults = function (text) {
    text.split("\n").forEach(function (line) {
        console.log("TKUnit: " + line);
    });
};

global.__approot = __dirname + "/../..";

const appRoot = global.__approot + "/app";
const tnsModulesRoot = appRoot + "/tns_modules";

// Keep global.require rooted to app/, matching iOS TestRunner behavior.
global.require = function (modulePath) {
    return global.__nativeRequire(modulePath, appRoot);
};

global.__requireOverride = function (modulePath, dirName) {
    if (modulePath.startsWith("~/")) {
        return global.__nativeRequire(appRoot + "/" + modulePath.slice(2), dirName);
    }

    if (!modulePath.startsWith(".") && !modulePath.startsWith("/") &&
        !modulePath.startsWith("system_lib://")) {
        try {
            return global.__nativeRequire(tnsModulesRoot + "/" + modulePath, dirName);
        } catch (err) {
            return null;
        }
    }

    return null;
};

require("./Infrastructure/Jasmine/jasmine-2.0.1/boot");

require("./Modules");
require("./shared/Require");
require("./shared/RuntimeTests");
require("./shared/WeakRef");
require("./RuntimeImplementedAPIs");
require("./URLSearchParams");
require("./URLPattern");
require("./ExceptionHandlingTests");

// Jasmine in nsr CLI requires an active Cocoa run loop to finish scheduling
// and reporting all specs.
execute();
NSRunLoop.currentRunLoop.run();
