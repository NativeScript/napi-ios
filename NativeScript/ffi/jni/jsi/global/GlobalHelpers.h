#ifndef JSI_GLOBALHELPERS_H_
#define JSI_GLOBALHELPERS_H_

#include "jni.h"
#include "Engine.h"
#include <string>
#include <map>
#include <utility>
#include <vector>

namespace tns {
std::string JsonStringifyObject(JsRuntime& rt, const JsValue& value, bool handleCircularReferences = true);

JsValue JsonParseString(JsRuntime& rt, const std::string& value);

struct JsStacktraceFrame {
    JsStacktraceFrame(): line(0), col(0) {}
    JsStacktraceFrame(
            int _line, int _col, std::string _filename, std::string _text
            ): line(_line), col(_col), filename(std::move(_filename)), text(std::move(_text)) {}

    int line;
    int col;
    std::string filename;
    std::string text;
};

// `error` is optional: pass nullptr to capture the current stack instead.
std::vector<JsStacktraceFrame> BuildStacktraceFrames(JsRuntime& rt, const JsValue* error, int size);

namespace GlobalHelpers {
    void onDisposeRuntime(JsRuntime& rt);
}
}

#endif /* JSI_GLOBALHELPERS_H_ */
