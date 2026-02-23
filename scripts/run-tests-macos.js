// Runs macOS TestRunner.app and streams runtime logs directly.
// Optional args:
//  - junit output path (defaults to build/test-results/macos-junit.xml)
//
// Env:
//  - MACOS_TEST_SKIP_BUILD=1 skips xcodebuild app build.
//  - MACOS_TEST_CLEAN_BUILD=1 deletes derived data before build.
//  - MACOS_COMMAND_TIMEOUT_MS overrides timeout for build commands (default: 10 minutes).
//  - MACOS_TEST_TIMEOUT_MS overrides max test runtime after launch (default: 2 minutes).
//  - MACOS_TEST_INACTIVITY_TIMEOUT_MS overrides max no-log interval after launch (default: 45 seconds).
//  - MACOS_LOG_JUNIT=0 disables streaming TKUnit/JUnit lines to console.
//  - MACOS_TESTS filters test modules (comma-separated substrings passed as -tests).

const fs = require("fs");
const path = require("path");
const cp = require("child_process");
const crypto = require("crypto");

const projectPath = path.join(__dirname, "../napi-ios.xcodeproj");
const scheme = "TestRunner";
const configuration = "Debug";
const derivedDataPath = path.join(__dirname, "../build", "derived-data", "macos-tests");
const testRunnerAppSourcePath = path.join(__dirname, "../TestRunner", "app");
const nativeScriptXCFramework = path.join(__dirname, "../dist", "NativeScript.xcframework");
const tkLiveSyncXCFramework = path.join(__dirname, "../dist", "TKLiveSync.xcframework");
const buildStatePath = path.join(derivedDataPath, ".macos-test-build-state.json");
const macosBuildInputs = [
    path.join(__dirname, "../napi-ios.xcodeproj", "project.pbxproj"),
    path.join(__dirname, "../TestRunner", "Source Files"),
    path.join(__dirname, "../TestRunner", "Info.plist"),
    path.join(__dirname, "../TestFixtures"),
    path.join(__dirname, "../TKLiveSync"),
    path.join(__dirname, "../metadata"),
    nativeScriptXCFramework,
    tkLiveSyncXCFramework
];

const resultsDir = path.join(__dirname, "../build", "test-results");
const defaultJunitPath = path.join(resultsDir, "macos-junit.xml");

function parseTimeoutMs(name, fallback) {
    const value = Number(process.env[name] || fallback);
    if (!Number.isFinite(value) || value <= 0) {
        return fallback;
    }

    return value;
}

const commandTimeoutMs = parseTimeoutMs("MACOS_COMMAND_TIMEOUT_MS", 10 * 60 * 1000);
const testTimeoutMs = parseTimeoutMs("MACOS_TEST_TIMEOUT_MS", 2 * 60 * 1000);
const inactivityTimeoutMs = parseTimeoutMs("MACOS_TEST_INACTIVITY_TIMEOUT_MS", 45 * 1000);
const emitJunitLogs = process.env.MACOS_LOG_JUNIT !== "0";
const requestedTests = (process.env.MACOS_TESTS || "").trim();

const launchedMarker = "Application Start!";
const junitPrefix = "TKUnit: ";
const junitEndTag = "</testsuites>";
const consoleLogMarker = "CONSOLE LOG:";

function parseArgs() {
    const args = process.argv.slice(2).filter(Boolean);
    if (args.length === 0) {
        return { junitOutPath: defaultJunitPath };
    }

    return { junitOutPath: path.resolve(args[0]) };
}

function run(command, args, options = {}) {
    const effectiveTimeout = options.timeout ?? commandTimeoutMs;
    const result = cp.spawnSync(command, args, {
        encoding: "utf8",
        timeout: effectiveTimeout,
        ...options
    });

    if (result.error) {
        if (result.error.code === "ETIMEDOUT") {
            throw new Error(`Command timed out after ${effectiveTimeout}ms: ${command} ${args.join(" ")}`);
        }

        throw result.error;
    }

    return result;
}

function getPathStats(targetPath) {
    if (!fs.existsSync(targetPath)) {
        return { files: 0, bytes: 0, maxMtimeMs: 0 };
    }

    const queue = [targetPath];
    let files = 0;
    let bytes = 0;
    let maxMtimeMs = 0;

    while (queue.length > 0) {
        const currentPath = queue.pop();
        let stats;
        try {
            stats = fs.lstatSync(currentPath);
        } catch (_) {
            continue;
        }

        if (stats.mtimeMs > maxMtimeMs) {
            maxMtimeMs = stats.mtimeMs;
        }

        if (stats.isDirectory()) {
            const entries = fs.readdirSync(currentPath);
            for (const entry of entries) {
                queue.push(path.join(currentPath, entry));
            }
            continue;
        }

        if (stats.isFile() || stats.isSymbolicLink()) {
            files += 1;
            bytes += stats.size;
        }
    }

    return { files, bytes, maxMtimeMs };
}

function createBuildFingerprint(inputs) {
    const snapshot = inputs.map((inputPath) => ({
        path: inputPath,
        ...getPathStats(inputPath)
    }));

    return crypto.createHash("sha1").update(JSON.stringify(snapshot)).digest("hex");
}

function readBuildState() {
    if (!fs.existsSync(buildStatePath)) {
        return null;
    }

    try {
        return JSON.parse(fs.readFileSync(buildStatePath, "utf8"));
    } catch (_) {
        return null;
    }
}

function writeBuildState(nativeFingerprint) {
    fs.mkdirSync(path.dirname(buildStatePath), { recursive: true });
    fs.writeFileSync(buildStatePath, JSON.stringify({ nativeFingerprint, createdAt: Date.now() }));
}

function syncAppResources(destinationAppResourcesPath) {
    fs.mkdirSync(destinationAppResourcesPath, { recursive: true });
    const result = run("rsync", [
        "-a",
        "--delete",
        `${testRunnerAppSourcePath}/`,
        `${destinationAppResourcesPath}/`
    ]);

    if (result.status !== 0) {
        throw new Error(`Failed to sync TestRunner app resources: ${result.stderr || result.stdout || "unknown rsync error"}`);
    }
}

function stripConsoleLogPrefix(line) {
    const markerIndex = line.indexOf(consoleLogMarker);
    if (markerIndex < 0) {
        return line;
    }

    return line.slice(markerIndex + consoleLogMarker.length).trimStart();
}

function runBuildAndRequireSuccess(command, args, timeoutMs = commandTimeoutMs) {
    const result = cp.spawnSync(command, args, {
        encoding: "utf8",
        timeout: timeoutMs
    });

    if (result.error && result.error.code === "ETIMEDOUT") {
        console.error(`ERROR: Command timed out after ${timeoutMs}ms: ${command} ${args.join(" ")}`);
        if (result.stdout && result.stdout.trim().length > 0) {
            console.error(result.stdout.trimEnd());
        }
        if (result.stderr && result.stderr.trim().length > 0) {
            console.error(result.stderr.trimEnd());
        }
        process.exit(1);
    }

    if (result.error) {
        throw result.error;
    }

    if (result.status !== 0) {
        console.error(`ERROR: Build command failed: ${command} ${args.join(" ")}`);
        if (result.stdout && result.stdout.trim().length > 0) {
            console.error(result.stdout.trimEnd());
        }
        if (result.stderr && result.stderr.trim().length > 0) {
            console.error(result.stderr.trimEnd());
        }
        process.exit(1);
    }
}

function buildTestRunnerApp() {
    const appBundlePath = path.join(
        derivedDataPath,
        "Build",
        "Products",
        configuration,
        "TestRunner.app"
    );
    const appResourcesPath = path.join(appBundlePath, "Contents", "Resources", "app");
    const appPath = path.join(appBundlePath, "Contents", "MacOS", "TestRunner");

    if (process.env.MACOS_TEST_CLEAN_BUILD === "1") {
        fs.rmSync(derivedDataPath, { recursive: true, force: true });
    }

    const nativeFingerprint = createBuildFingerprint(macosBuildInputs);
    const existingBuildState = readBuildState();
    const canReuseBuild = process.env.MACOS_TEST_CLEAN_BUILD !== "1" &&
        fs.existsSync(appPath) &&
        existingBuildState &&
        existingBuildState.nativeFingerprint === nativeFingerprint;

    console.log("Building...");
    if (!canReuseBuild) {
        const args = [
            "-project", projectPath,
            "-scheme", scheme,
            "-configuration", configuration,
            "-destination", "platform=macOS,arch=arm64",
            "-derivedDataPath", derivedDataPath,
            "build"
        ];
        runBuildAndRequireSuccess("xcodebuild", args, commandTimeoutMs);
    }

    syncAppResources(appResourcesPath);
    writeBuildState(nativeFingerprint);

    if (!fs.existsSync(appPath)) {
        console.error(`ERROR: Built app executable not found at expected path: ${appPath}`);
        process.exit(1);
    }

    return appPath;
}

function extractCount(xml, attribute) {
    const regex = new RegExp(`${attribute}="(\\d+)"`, "g");
    let total = 0;
    let match;
    while ((match = regex.exec(xml)) !== null) {
        total += Number(match[1]);
    }

    return total;
}

function main() {
    const { junitOutPath } = parseArgs();

    fs.mkdirSync(path.dirname(junitOutPath), { recursive: true });
    fs.mkdirSync(resultsDir, { recursive: true });

    const skipBuild = process.env.MACOS_TEST_SKIP_BUILD === "1";
    const appBinaryPath = skipBuild
        ? path.join(
            derivedDataPath,
            "Build",
            "Products",
            configuration,
            "TestRunner.app",
            "Contents",
            "MacOS",
            "TestRunner"
        )
        : buildTestRunnerApp();

    if (!fs.existsSync(appBinaryPath)) {
        console.error(`ERROR: App executable not found: ${appBinaryPath}`);
        process.exit(1);
    }

    const runArgs = ["-logjunit"];
    if (requestedTests.length > 0) {
        runArgs.push("-tests", requestedTests);
    }

    console.log(`Launching app and streaming logs: ${appBinaryPath} ${runArgs.join(" ")}`);

    const results = fs.createWriteStream(junitOutPath);
    let completedSuccessfully = false;
    let completionKillIssued = false;
    let junitBuffer = "";
    let appLaunched = false;
    let timeoutTimer = null;
    let inactivityTimer = null;

    function clearTimers() {
        if (timeoutTimer) {
            clearTimeout(timeoutTimer);
            timeoutTimer = null;
        }
        if (inactivityTimer) {
            clearTimeout(inactivityTimer);
            inactivityTimer = null;
        }
    }

    function failAndExit(message, processHandle) {
        console.error(message);
        clearTimers();
        results.end();
        if (processHandle && !processHandle.killed) {
            processHandle.kill("SIGKILL");
        }
        process.exit(1);
    }

    function scheduleInactivityTimeout(processHandle) {
        if (inactivityTimer) {
            clearTimeout(inactivityTimer);
        }

        inactivityTimer = setTimeout(() => {
            failAndExit(`ERROR: No logs received for ${inactivityTimeoutMs}ms after launch.`, processHandle);
        }, inactivityTimeoutMs);
    }

    timeoutTimer = setTimeout(() => {
        failAndExit(`ERROR: Launch timeout after ${testTimeoutMs}ms.`, null);
    }, testTimeoutMs);

    const child = cp.spawn(appBinaryPath, runArgs, {
        stdio: ["ignore", "pipe", "pipe"]
    });

    function createChunkHandler() {
        let leftover = "";

        return function handleChunk(chunk) {
            const text = chunk.toString();
            const chunks = leftover + text;
            const lines = chunks.split(/\r?\n/);

            for (let i = 0; i < lines.length - 1; i++) {
                const line = lines[i];
                process.stdout.write(`${stripConsoleLogPrefix(line)}\n`);

                if (appLaunched) {
                    scheduleInactivityTimeout(child);
                }

                if (!appLaunched && line.indexOf(launchedMarker) !== -1) {
                    appLaunched = true;
                    if (timeoutTimer) {
                        clearTimeout(timeoutTimer);
                    }
                    timeoutTimer = setTimeout(() => {
                        failAndExit(`ERROR: Tests run timeout after ${testTimeoutMs}ms.`, child);
                    }, testTimeoutMs);
                    scheduleInactivityTimeout(child);
                    console.log("Application launched. Start test run timeout.");
                }

                const prefixIndex = line.indexOf(junitPrefix);
                if (prefixIndex < 0) {
                    continue;
                }

                const data = line.slice(prefixIndex + junitPrefix.length);
                results.write(data + "\n");
                junitBuffer += data + "\n";

                if (emitJunitLogs) {
                    // Already printed via process.stdout.write(text), keep behavior toggled for parity.
                }

                if (data.indexOf(junitEndTag) !== -1) {
                    completedSuccessfully = true;
                    clearTimers();
                    if (!completionKillIssued && child && !child.killed) {
                        completionKillIssued = true;
                        child.kill("SIGKILL");
                    }
                }
            }

            leftover = lines[lines.length - 1];
        };
    }

    child.stdout.on("data", createChunkHandler());
    child.stderr.on("data", createChunkHandler());

    child.on("error", (error) => {
        failAndExit(`ERROR: Failed to start TestRunner process: ${error.message}`, child);
    });

    child.on("close", (code) => {
        clearTimers();
        results.end();

        if (!completedSuccessfully) {
            failAndExit(`ERROR: Test run failed before JUnit completion. Exit code: ${code}`, null);
            return;
        }

        const tests = extractCount(junitBuffer, "tests");
        const failures = extractCount(junitBuffer, "failures");
        const errors = extractCount(junitBuffer, "errors");
        const skipped = extractCount(junitBuffer, "skipped");

        console.log(`Summary: tests=${tests}, failures=${failures}, errors=${errors}, skipped=${skipped}`);
        console.log(`Test run finished. JUnit written to: ${junitOutPath}`);
        process.exit(failures > 0 || errors > 0 ? 1 : 0);
    });
}

main();
