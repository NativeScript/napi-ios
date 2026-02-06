#include "IR.h"
#include "TSEmitter.h"

namespace metagen {

std::string MemberDecl::toString() {
  TSFile file;
  MemberDecl &decl = *this;
  file.write(decl, false);
  return file.toString();
}

static std::string signatureString(const MemberDecl& decl) {
  MemberDecl copy = decl;
  copy.overloads.clear();
  copy.overloadSignatureKeys.clear();
  copy.tsIgnore = false;
  copy.optional = false;
  TSFile file;
  file.write(copy, false);
  return file.toString();
}

void MemberDecl::addOverloadFrom(const MemberDecl& member) {
  if (member.kind != kMemberMethod || member.name != name ||
      member.isStatic != isStatic) {
    return;
  }

  MemberDecl overload = member;
  overload.overloads.clear();
  overload.overloadSignatureKeys.clear();
  overload.tsIgnore = false;
  overload.optional = false;

  const std::string newSig = signatureString(overload);
  if (std::find(overloadSignatureKeys.begin(), overloadSignatureKeys.end(),
                newSig) != overloadSignatureKeys.end()) {
    return;
  }

  overloadSignatureKeys.emplace_back(newSig);
  overloads.emplace_back(std::move(overload));
}

void TSFile::write(MemberDecl &decl, bool isInterface,
                   std::vector<std::string> *classTypeParameters) {
  if (decl.kind == kMemberMethod) {
    auto writeSignature = [&](const MemberDecl& method) {
      std::string line;
      if (method.isStatic) {
        line += "static ";
      }
      line += method.name;

      bool staticReturnsThis =
          method.isStatic && method.returnType.kind == kTypeInstanceObject;
      if (staticReturnsThis) {
        line += "<";
        if (classTypeParameters != nullptr && !classTypeParameters->empty()) {
          for (const std::string &param : *classTypeParameters) {
            line += param + ", ";
          }
        }
        line += "This extends abstract new (...args: any) => any>";
      } else if (method.isStatic && classTypeParameters != nullptr &&
                 !classTypeParameters->empty()) {
        line += "<";
        for (size_t i = 0; i < classTypeParameters->size(); i++) {
          line += classTypeParameters->at(i);
          if (i < classTypeParameters->size() - 1) {
            line += ", ";
          }
        }
        line += ">";
      }
      if (isInterface && method.optional) {
        line += "?";
      }
      line += "(";
      if (staticReturnsThis) {
        line += "this: This";
        if (!method.parameters.empty()) {
          line += ", ";
        }
      }
      std::unordered_set<std::string> paramNames;
      for (size_t i = 0; i < method.parameters.size(); i++) {
        if (i > 0) {
          line += ", ";
        }
        const auto& param = method.parameters[i];
        std::string paramName = param.name;
        if (paramNames.contains(paramName)) {
          paramName += "_";
        }
        paramNames.emplace(paramName);
        line += paramName;
        line += ": ";
        line += typeToString(param.type, method.isStatic, false);
      }
      line += "): ";
      line += typeToString(method.returnType, method.isStatic, true);
      line += ";";

      if (method.tsIgnore) {
        // Due to inconsistencies between Objective-C and TypeScript type
        // systems, we have to use this annotation to prevent the TypeScript
        // compiler from complaining about how one type doesn't satisfy another.
        code.write("// @ts-ignore MemberDecl.tsIgnore");
      }

      code.write(line);
    };

    for (const auto& overload : decl.overloads) {
      writeSignature(overload);
    }
    writeSignature(decl);
  } else if (decl.kind == kMemberProperty) {
    auto getterType = typeToString(decl.propertyType, decl.isStatic, true);
    auto setterType = typeToString(decl.propertyType, decl.isStatic, false);

    if (!decl.isReadonly && getterType != setterType) {
      if (decl.optional && isInterface) {
        getterType += " | undefined";
        setterType += " | undefined";
      }
      std::string line;
      if (decl.isStatic) {
        line += "static ";
      }
      line += "get ";
      line += decl.name;
      line += "(): ";
      line += decl.propertyType.kind == kTypeInstanceObject && decl.isStatic
                  ? decl.parentClassName
                  : getterType;
      line += ";";
      if (decl.tsIgnore) {
        code.write("// @ts-ignore MemberDecl.tsIgnore");
      }
      code.write(line);

      line = "";
      if (decl.isStatic) {
        line += "static ";
      }
      line += "set ";
      line += decl.name;

      line += "(value: ";
      line += decl.propertyType.kind == kTypeInstanceObject && decl.isStatic
                  ? decl.parentClassName
                  : setterType;
      line += ");";
      if (decl.tsIgnore) {
        code.write("// @ts-ignore MemberDecl.tsIgnore");
      }
      code.write(line);
    } else {
      std::string line;
      if (decl.isStatic) {
        line += "static ";
      }
      if (decl.isReadonly) {
        line += "readonly ";
      }
      line += decl.name;
      if (isInterface && decl.optional) {
        line += "?";
      }
      line += ": ";
      line += decl.propertyType.kind == kTypeInstanceObject && decl.isStatic
                  ? decl.parentClassName
                  : getterType;
      line += ";";

      if (decl.tsIgnore) {
        code.write("// @ts-ignore MemberDecl.tsIgnore");
      }

      code.write(line);
    }
  } else {
    assert(false && "Unknown class member type");
  }
}

} // namespace metagen
