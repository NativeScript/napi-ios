describe("Native API JSI bridge", function () {
    function apiOrPending() {
        var api = global.__nativeScriptNativeApi;
        if (!api) {
            pending("Native API JSI bridge is only installed for Hermes.");
        }
        return api;
    }

    afterEach(function () {
        TNSClearOutput();
    });

    it("exposes the Hermes JSI host object", function () {
        var api = apiOrPending();

        expect(api.runtime).toBe("jsi");
        expect(api.backend).toBe("hermes");
        expect(api.metadata.classes).toBeGreaterThan(0);
        expect(api.metadata.functions).toBeGreaterThan(0);
        expect(api.getClass("NSObject").available).toBe(true);
    });

    it("calls metadata-backed C functions through pure JSI", function () {
        var api = apiOrPending();
        var fn = api.getFunction("functionWithInt");

        expect(typeof fn).toBe("function");
        expect(fn(42)).toBe(42);
        expect(TNSGetOutput()).toBe("42");
    });

    it("sends Objective-C selectors through pure JSI", function () {
        var api = apiOrPending();
        var primitives = api.getClass("TNSPrimitives").alloc().invoke("init");

        expect(primitives.methodWithInt(24)).toBe(24);
        expect(TNSGetOutput()).toBe("24");
    });
});
