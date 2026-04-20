describe("Metadata", function () {
    it("where method in category is implemented with property, the property access and modification should work and the method should be 'hidden'.", function () {
        var object = TNSPropertyMethodConflictClass.alloc().init();
        expect(object.conflict).toBe(false);
    });

    it("Swift objects should be marshalled correctly", function () {
        expect(global.TNSSwiftLikeFactory).toBeDefined();
        expect(global.TNSSwiftLikeFactory.name).toBe("TNSSwiftLikeFactory");
        const swiftLikeObj = TNSSwiftLikeFactory.create();
        expect(swiftLikeObj.constructor).toBe(global.TNSSwiftLike);
        expect(swiftLikeObj.constructor.name).toBe("_TtC17NativeScriptTests12TNSSwiftLike");
        const runtimeName = NSString.stringWithUTF8String(class_getName(swiftLikeObj.constructor)).toString();
        expect([
            "_TtC17NativeScriptTests12TNSSwiftLike",
            "NativeScriptTests.TNSSwiftLike"
        ].indexOf(runtimeName) !== -1).toBe(true);
    });
});
