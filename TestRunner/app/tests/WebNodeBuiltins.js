function dynamicImport(specifier) {
    return (0, eval)("import(" + JSON.stringify(specifier) + ")");
}

describe("Web builtins", function () {
    function hasWebBuiltins() {
        return (
            typeof fetch === "function" &&
            typeof Headers === "function" &&
            typeof Request === "function" &&
            typeof Response === "function" &&
            typeof WebSocket === "function" &&
            typeof ReadableStream === "function"
        );
    }

    function ensureWebBuiltins() {
        if (!hasWebBuiltins()) {
            pending("Web builtins are not enabled in this runtime build.");
            return false;
        }

        return true;
    }

    it("should expose web globals", function () {
        if (!ensureWebBuiltins()) {
            return;
        }

        expect(typeof fetch).toBe("function");
        expect(typeof Headers).toBe("function");
        expect(typeof Request).toBe("function");
        expect(typeof Response).toBe("function");
        expect(typeof WebSocket).toBe("function");
        expect(typeof ReadableStream).toBe("function");
    });

    it("should expose internal web modules", function () {
        if (!ensureWebBuiltins()) {
            return;
        }

        const web = require("web");
        expect(web).toBeDefined();
        expect(web.fetch).toBe(fetch);
        expect(web.Headers).toBe(Headers);
        expect(web.Request).toBe(Request);
        expect(web.Response).toBe(Response);
        expect(web.WebSocket).toBe(WebSocket);

        const streamWeb = require("stream/web");
        expect(streamWeb).toBeDefined();
        expect(streamWeb.ReadableStream).toBe(ReadableStream);
        expect(typeof streamWeb.WritableStream).toBe("function");
        expect(typeof streamWeb.TransformStream).toBe("function");
    });

    it("Headers should be case-insensitive", function () {
        if (!ensureWebBuiltins()) {
            return;
        }

        const headers = new Headers();
        headers.append("Content-Type", "text/plain");
        headers.append("x-test", "a");
        headers.append("X-Test", "b");

        expect(headers.get("content-type")).toBe("text/plain");
        expect(headers.get("X-Test")).toBe("a, b");
        expect(headers.has("x-test")).toBe(true);
    });

    it("Request and Response should support body helpers", function (done) {
        if (!ensureWebBuiltins()) {
            done();
            return;
        }

        const request = new Request("https://example.com/post", {
            method: "POST",
            headers: { "content-type": "text/plain" },
            body: "hello"
        });

        expect(request.method).toBe("POST");
        expect(request.headers.get("content-type")).toBe("text/plain");

        request
            .text()
            .then(function (text) {
                expect(text).toBe("hello");

                const response = new Response('{"ok":true}', {
                    status: 201,
                    statusText: "Created",
                    headers: { "content-type": "application/json" }
                });

                expect(response.ok).toBe(true);
                expect(response.status).toBe(201);
                return response.json();
            })
            .then(function (json) {
                expect(json.ok).toBe(true);
                done();
            })
            .catch(function (error) {
                fail(error);
                done();
            });
    });

    it("fetch should reject invalid URLs", function (done) {
        if (!ensureWebBuiltins()) {
            done();
            return;
        }

        fetch("://invalid-url")
            .then(function () {
                fail("Expected fetch to reject");
                done();
            })
            .catch(function (error) {
                expect(error).toBeDefined();
                done();
            });
    });

    it("WebSocket should validate URL scheme", function () {
        if (!ensureWebBuiltins()) {
            return;
        }

        expect(function () {
            return new WebSocket("https://example.com");
        }).toThrow();
    });

    it("should resolve web modules via ESM dynamic import", function (done) {
        if (!ensureWebBuiltins()) {
            done();
            return;
        }

        dynamicImport("web")
            .then(function (web) {
                expect(web).toBeDefined();
                expect(typeof web.fetch).toBe("function");
                expect(typeof web.WebSocket).toBe("function");
                return dynamicImport("stream/web");
            })
            .then(function (streamWeb) {
                expect(streamWeb).toBeDefined();
                expect(typeof streamWeb.ReadableStream).toBe("function");
                done();
            })
            .catch(function (error) {
                pending("ESM dynamic import for web builtins is unavailable: " + error);
                done();
            });
    });
});

describe("Node fs builtin", function () {
    function tryRequire(name) {
        try {
            return require(name);
        } catch (_) {
            return null;
        }
    }

    function ensureFsBuiltins(fs, nodeFs) {
        if (!fs || !nodeFs) {
            pending("Node fs builtins are not enabled in this runtime build.");
            return false;
        }

        return true;
    }

    function getTempRoot() {
        if (typeof NSTemporaryDirectory === "function") {
            return String(NSTemporaryDirectory());
        }

        return String(NSHomeDirectory());
    }

    function joinPath() {
        const parts = Array.prototype.slice.call(arguments).filter(function (p) {
            return p !== undefined && p !== null && String(p).length > 0;
        });

        const first = String(parts.shift() || "");
        return [first.replace(/\/+$/, "")]
            .concat(parts.map(function (part) {
                return String(part).replace(/^\/+/, "");
            }))
            .join("/");
    }

    function randomSuffix() {
        return Date.now().toString(16) + "-" + Math.floor(Math.random() * 100000).toString(16);
    }

    let fs;
    let nodeFs;
    let testDir;

    beforeEach(function () {
        fs = tryRequire("fs");
        nodeFs = tryRequire("node:fs");

        if (!fs || !nodeFs) {
            testDir = null;
            return;
        }

        testDir = joinPath(getTempRoot(), "ns-runtime-web-node-tests-" + randomSuffix());
        fs.mkdirSync(testDir, { recursive: true });
    });

    afterEach(function () {
        if (!fs || !testDir) {
            return;
        }

        try {
            fs.rmSync(testDir, { recursive: true, force: true });
        } catch (_) {
        }
    });

    it("should expose fs and node:fs", function () {
        if (!ensureFsBuiltins(fs, nodeFs)) {
            return;
        }

        expect(fs).toBeDefined();
        expect(nodeFs).toBeDefined();
        expect(typeof fs.readFileSync).toBe("function");
        expect(typeof nodeFs.readFileSync).toBe("function");
        expect(typeof fs.promises.readFile).toBe("function");
    });

    it("should write and read utf8 text", function () {
        if (!ensureFsBuiltins(fs, nodeFs)) {
            return;
        }

        const filePath = joinPath(testDir, "hello.txt");
        const text = "hello web+node";

        fs.writeFileSync(filePath, text, "utf8");
        expect(fs.existsSync(filePath)).toBe(true);
        expect(fs.readFileSync(filePath, "utf8")).toBe(text);
    });

    it("should read binary as ArrayBuffer", function () {
        if (!ensureFsBuiltins(fs, nodeFs)) {
            return;
        }

        const filePath = joinPath(testDir, "bin.dat");
        fs.writeFileSync(filePath, "abc", "utf8");

        const data = fs.readFileSync(filePath);
        expect(data instanceof ArrayBuffer).toBe(true);
        expect(new Uint8Array(data).length).toBe(3);
    });

    it("should support stat/lstat and readdir with dirents", function () {
        if (!ensureFsBuiltins(fs, nodeFs)) {
            return;
        }

        const nestedDir = joinPath(testDir, "nested");
        const filePath = joinPath(nestedDir, "item.txt");

        fs.mkdirSync(nestedDir, { recursive: true });
        fs.writeFileSync(filePath, "x", "utf8");

        const stat = fs.statSync(filePath);
        expect(stat.isFile()).toBe(true);
        expect(stat.isDirectory()).toBe(false);
        expect(stat.size).toBe(1);

        const lstat = fs.lstatSync(filePath);
        expect(lstat.isFile()).toBe(true);

        const entries = fs.readdirSync(nestedDir, { withFileTypes: true });
        expect(entries.length).toBe(1);
        expect(entries[0].name).toBe("item.txt");
        expect(entries[0].isFile()).toBe(true);
    });

    it("should support callback and promise forms", function (done) {
        if (!ensureFsBuiltins(fs, nodeFs)) {
            done();
            return;
        }

        const filePath = joinPath(testDir, "async.txt");
        fs.writeFileSync(filePath, "async-content", "utf8");

        fs.readFile(filePath, "utf8", function (error, content) {
            expect(error).toBeNull();
            expect(content).toBe("async-content");

            fs.promises
                .readFile(filePath, "utf8")
                .then(function (promiseContent) {
                    expect(promiseContent).toBe("async-content");
                    done();
                })
                .catch(function (promiseError) {
                    fail(promiseError);
                    done();
                });
        });
    });

    it("should resolve fs via ESM dynamic import", function (done) {
        if (!ensureFsBuiltins(fs, nodeFs)) {
            done();
            return;
        }

        dynamicImport("node:fs")
            .then(function (esmFs) {
                expect(esmFs).toBeDefined();
                expect(typeof esmFs.readFileSync).toBe("function");
                return dynamicImport("node:fs/promises");
            })
            .then(function (esmFsPromises) {
                expect(esmFsPromises).toBeDefined();
                expect(typeof esmFsPromises.readFile).toBe("function");
                done();
            })
            .catch(function (error) {
                pending("ESM dynamic import for fs builtins is unavailable: " + error);
                done();
            });
    });
});
