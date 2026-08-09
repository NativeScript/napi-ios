#include <cctype>
#include <cstring>

#include "IR.h"

namespace {

bool hasOwnershipWord(const std::string& functionName, const char* word) {
  size_t pos = functionName.find(word);
  while (pos != std::string::npos) {
    const size_t after = pos + std::strlen(word);
    const unsigned char next =
        after < functionName.size()
            ? static_cast<unsigned char>(functionName[after])
            : 0;
    const bool endsWord = after == functionName.size() || !std::islower(next);
    if (endsWord) {
      return true;
    }
    pos = functionName.find(word, pos + 1);
  }
  return false;
}

bool nameImpliesRetainedCFReturn(const std::string& functionName) {
  return hasOwnershipWord(functionName, "Create") ||
         hasOwnershipWord(functionName, "Copy");
}

}  // namespace

namespace metagen {

FunctionDecl::FunctionDecl(CXCursor cursor) {
  framework = getFrameworkName(cursor);
  if (gCaptureAvailability) {
    availability = getAvailabilityInfo(cursor);
  }

  CXString cxname = clang_getCursorSpelling(cursor);
  name = clang_getCString(cxname);
  clang_disposeString(cxname);

  CXType cxtype = clang_getCursorType(cursor);
  CXType resultType = clang_getResultType(cxtype);
  returnType = TypeSpec(resultType);

  returnOwned = cursorHasReturnsRetainedAttribute(cursor);

  if (!returnOwned) {
    CXType canonicalResultType = clang_getCanonicalType(resultType);
    const bool returnsObjCObject =
        canonicalResultType.kind == CXType_ObjCObjectPointer;
    if (!returnsObjCObject && nameImpliesRetainedCFReturn(name)) {
      returnOwned = true;
    }
  }

  auto argc = clang_Cursor_getNumArguments(cursor);
  if (argc > 0) {
    parameters.reserve(static_cast<size_t>(argc));
  }

  for (int i = 0; i < argc; i++) {
    ParameterDecl parameter;
    auto arg = clang_Cursor_getArgument(cursor, i);
    auto argName = clang_getCursorSpelling(arg);
    parameter.name = jsifyName(clang_getCString(argName));
    clang_disposeString(argName);
    auto argType = clang_getCursorType(arg);
    if (parameter.name.empty()) {
      parameter.name = "p" + std::to_string(i + 1);
    }
    parameter.type = TypeSpec(argType);
    parameters.emplace_back(std::move(parameter));
  }

  isVariadic = clang_Cursor_isVariadic(cursor);
}

}  // namespace metagen
