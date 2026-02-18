// This node app runs macOS nsr-based tests and writes junit.xml output.
// Parameters:
//  - Path for the junit.xml output (required).
//  - Path to nsr binary (optional, defaults to dist/nsr or swift-bundler prebuilt).
//  - Path to test entry js file (optional, defaults to TestRunner/app/tests/macos.js).
//
// Env:
//  - MACOS_BOOT_TIMEOUT_MS overrides launch timeout (default: 60 seconds).
//  - MACOS_TEST_TIMEOUT_MS overrides max test runtime after launch (default: 2 minutes).
//  - MACOS_TEST_INACTIVITY_TIMEOUT_MS overrides max no-log interval after launch (default: 45 seconds).

if (process.argv.length < 3) {
    console.error("Expects at least one argument - path to output junit.xml!");
    process.exit(1);
}

var fs = require("fs");
var path = require("path");
var proc = require("child_process");

var jUnitLocation = path.resolve(process.argv[2]);
var nsrArg = process.argv.length >= 4 ? process.argv[3] : undefined;
var entryArg = process.argv.length >= 5 ? process.argv[4] : undefined;

var nsrCandidates = [];
if (nsrArg) {
    nsrCandidates.push(path.resolve(nsrArg));
}

nsrCandidates.push(path.join(__dirname, "..", "dist", "nsr"));

var nsrBinary = undefined;
for (var i = 0; i < nsrCandidates.length; i++) {
    if (fs.existsSync(nsrCandidates[i])) {
        nsrBinary = nsrCandidates[i];
        break;
    }
}

if (!nsrBinary) {
    console.error("ERROR: Could not locate nsr binary. Checked:");
    nsrCandidates.forEach(function (candidate) {
        console.error("  - " + candidate);
    });
    process.exit(1);
}

var entryScript = path.resolve(entryArg || path.join(__dirname, "..", "TestRunner", "app", "tests", "macos.js"));
if (!fs.existsSync(entryScript)) {
    console.error("ERROR: Test entry file not found: " + entryScript);
    process.exit(1);
}

var launched = "Application Start!";
var term = "TKUnit: ";
var end = "</testsuites>";

function parseTimeoutMs(name, fallback) {
    var value = Number(process.env[name] || fallback);
    if (!Number.isFinite(value) || value <= 0) {
        return fallback;
    }
    return value;
}

var bootTimeout = parseTimeoutMs("MACOS_BOOT_TIMEOUT_MS", 60 * 1000);
var testsTimeout = parseTimeoutMs("MACOS_TEST_TIMEOUT_MS", 2 * 60 * 1000);
var inactivityTimeout = parseTimeoutMs("MACOS_TEST_INACTIVITY_TIMEOUT_MS", 45 * 1000);

fs.mkdirSync(path.dirname(jUnitLocation), { recursive: true });
var results = fs.createWriteStream(jUnitLocation);

var completedSuccessfully = false;
var completionKillIssued = false;
var junitBuffer = "";
var timeout;
var inactivityTimer;
var testRun;
var appLaunched = false;

function clearTimers() {
    clearTimeout(timeout);
    clearTimeout(inactivityTimer);
}

function scheduleInactivityTimeout() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(function () {
        failAndExit("ERROR: No logs received for " + inactivityTimeout + "ms after launch.");
    }, inactivityTimeout);
}

function failAndExit(msg) {
    console.error(msg);
    clearTimers();
    results.end();
    if (testRun) {
        testRun.kill();
    }
    process.exit(1);
}

function extractCount(xml, attribute) {
    var regex = new RegExp(attribute + "=\"(\\d+)\"", "g");
    var total = 0;
    var match;
    while ((match = regex.exec(xml)) !== null) {
        total += Number(match[1]);
    }
    return total;
}

timeout = setTimeout(function () {
    failAndExit("ERROR: Launch timeout!");
}, bootTimeout);

console.log("Executing nsr: " + nsrBinary + " run " + entryScript);
testRun = proc.spawn(nsrBinary, ["run", entryScript], {
    stdio: ["ignore", "pipe", "pipe"]
});

function handleChunkFactory() {
    var leftover = "";

    return function handleChunk(chunk) {
        var text = chunk.toString();
        process.stdout.write(text);
        if (appLaunched) {
            scheduleInactivityTimeout();
        }

        var chunks = leftover + text;
        var lines = chunks.split(/\r?\n/);

        for (var i = 0; i < lines.length - 1; i++) {
            var line = lines[i];

            if (line.indexOf(launched) >= 0) {
                appLaunched = true;
                clearTimeout(timeout);
                timeout = setTimeout(function () {
                    failAndExit("ERROR: Tests run timeout!");
                }, testsTimeout);
                scheduleInactivityTimeout();
                console.log("Application launched. Start test run timeout.");
            }

            var index = line.indexOf(term);
            if (index < 0) {
                continue;
            }

            var data = line.substr(index + term.length);
            results.write(data + "\n");
            junitBuffer += data + "\n";

            if (data.indexOf(end) >= 0) {
                completedSuccessfully = true;
                clearTimers();
                if (testRun && !completionKillIssued) {
                    completionKillIssued = true;
                    // Avoid native shutdown crashes after successful JUnit output.
                    testRun.kill("SIGKILL");
                }
            }
        }

        leftover = lines[lines.length - 1];
    };
}

testRun.stdout.on("data", handleChunkFactory());
testRun.stderr.on("data", handleChunkFactory());

testRun.on("error", function (error) {
    clearTimers();
    failAndExit("ERROR: Failed to start nsr process: " + error.message);
});

testRun.on("close", function (code) {
    clearTimers();
    results.end();

    if (!completedSuccessfully) {
        failAndExit("ERROR: Test run failed before JUnit completion. Exit code: " + code);
        return;
    }

    var tests = extractCount(junitBuffer, "tests");
    var failures = extractCount(junitBuffer, "failures");
    var errors = extractCount(junitBuffer, "errors");
    var skipped = extractCount(junitBuffer, "skipped");

    console.log("Summary: tests=" + tests + ", failures=" + failures + ", errors=" + errors + ", skipped=" + skipped);
    console.log("Test run finished. JUnit written to: " + jUnitLocation);
    process.exit(failures > 0 || errors > 0 ? 1 : 0);
});
