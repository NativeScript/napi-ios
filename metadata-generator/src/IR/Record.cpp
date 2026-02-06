#include "IR.h"
#include <string>

namespace metagen {

StructDecl::StructDecl(CXCursor cursor) {
  framework = getFrameworkName(cursor);

  CXString cxname = clang_getCursorSpelling(cursor);
  name = transformStructName(clang_getCString(cxname));
  clang_disposeString(cxname);

  size = clang_Type_getSizeOf(clang_getCursorType(cursor));

  clang_visitChildren(
      cursor,
      [](CXCursor cursor, CXCursor, CXClientData clientData) {
        if (!isAvailable(cursor)) {
          return CXChildVisit_Continue;
        }

        auto decl = (StructDecl *)clientData;

        CXCursorKind kind = clang_getCursorKind(cursor);

        switch (kind) {
        case CXCursor_FieldDecl: {
          StructFieldDecl field;
          CXString cxName = clang_getCursorSpelling(cursor);
          field.name = clang_getCString(cxName);
          clang_disposeString(cxName);
          auto type = clang_getCursorType(cursor);
          field.type = TypeSpec(type);
          field.type.isNullable = true;
          field.offset = clang_Cursor_getOffsetOfField(cursor) / 8;
          decl->fields.emplace_back(field);
          break;
        }

        default:
          break;
        }

        return CXChildVisit_Continue;
      },
      this);
}

UnionDecl::UnionDecl(CXCursor cursor) {
  framework = getFrameworkName(cursor);

  CXString cxname = clang_getCursorSpelling(cursor);
  name = transformStructName(clang_getCString(cxname));
  clang_disposeString(cxname);

  size = clang_Type_getSizeOf(clang_getCursorType(cursor));

  clang_visitChildren(
      cursor,
      [](CXCursor cursor, CXCursor, CXClientData clientData) {
        if (!isAvailable(cursor)) {
          return CXChildVisit_Continue;
        }

        auto decl = (UnionDecl *)clientData;

        CXCursorKind kind = clang_getCursorKind(cursor);

        switch (kind) {
        case CXCursor_FieldDecl: {
          UnionFieldDecl field;
          CXString cxName = clang_getCursorSpelling(cursor);
          field.name = clang_getCString(cxName);
          clang_disposeString(cxName);
          auto type = clang_getCursorType(cursor);
          field.type = TypeSpec(type);
          field.type.isNullable = true;
          decl->fields.emplace_back(field);
          break;
        }

        default:
          break;
        }

        return CXChildVisit_Continue;
      },
      this);
}

void MetadataFactory::processRecordRefs() {
  while (!referencedRecords.empty()) {
    std::unordered_set<std::string> refs;
    refs.swap(referencedRecords);

    for (const std::string &name : refs) {
      if (unions.contains(name) || structs.contains(name)) {
        continue;
      }

      auto skippedStructIt = skippedStructs.find(name);
      if (skippedStructIt != skippedStructs.end()) {
        auto [inserted, _] = structs.try_emplace(name, skippedStructIt->second);
        postProcessStruct(inserted->second);
      } else if (auto skippedUnionIt = skippedUnions.find(name);
                 skippedUnionIt != skippedUnions.end()) {
        auto [inserted, _] = unions.try_emplace(name, skippedUnionIt->second);
        postProcessUnion(inserted->second);
      } else {
        std::cerr << "ERROR: Unknown record " << name << std::endl;
      }
    }
  }
}

} // namespace metagen
