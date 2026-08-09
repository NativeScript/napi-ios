#include <cstdio>
#include <filesystem>

#include "JSONEmitter.h"

namespace metagen {

namespace {

std::string jsonEscape(const std::string& value) {
  std::string out;
  out.reserve(value.size() + 8);
  for (char c : value) {
    switch (c) {
      case '"':
        out += "\\\"";
        break;
      case '\\':
        out += "\\\\";
        break;
      case '\n':
        out += "\\n";
        break;
      case '\r':
        out += "\\r";
        break;
      case '\t':
        out += "\\t";
        break;
      default:
        if (static_cast<unsigned char>(c) < 0x20) {
          char buf[8];
          std::snprintf(buf, sizeof(buf), "\\u%04x", c);
          out += buf;
        } else {
          out += c;
        }
    }
  }
  return out;
}

// Appends `"availability":{...}` (with leading comma) when there is data.
void appendAvailability(std::string& out, const AvailabilityInfo& info) {
  if (!info.hasData()) {
    return;
  }
  out += ",\"availability\":{";
  bool first = true;
  auto field = [&](const char* key, const std::string& value) {
    if (value.empty()) return;
    if (!first) out += ",";
    first = false;
    out += "\"";
    out += key;
    out += "\":\"";
    out += jsonEscape(value);
    out += "\"";
  };
  field("introduced", info.introduced);
  field("deprecated", info.deprecated);
  field("obsoleted", info.obsoleted);
  field("message", info.message);
  if (info.unavailable) {
    if (!first) out += ",";
    out += "\"unavailable\":true";
  }
  out += "}";
}

}  // namespace

std::string& JSONEmitter::ensureBuffer(const std::string& framework) {
  auto [it, inserted] = buffers.try_emplace(framework);
  if (inserted) {
    std::string& out = it->second;
    out += "{\"format\":\"nativescript-metadata-json@1\"";
    const char* platform = platformNameForAvailability(gAvailabilityPlatform);
    if (platform != nullptr) {
      out += ",\"platform\":\"";
      out += platform;
      out += "\"";
    }
    out += ",\"framework\":\"";
    out += jsonEscape(framework);
    out += "\",\"symbols\":[";
  } else {
    it->second += ",";
  }
  return it->second;
}

void JSONEmitter::writeSymbolHeader(std::string& out, const std::string& name,
                                    const char* kind,
                                    const AvailabilityInfo& availability) {
  out += "\n{\"name\":\"";
  out += jsonEscape(name);
  out += "\",\"kind\":\"";
  out += kind;
  out += "\"";
  appendAvailability(out, availability);
}

void JSONEmitter::writeMembers(std::string& out,
                               std::vector<MemberDecl>& members) {
  bool wroteAny = false;
  for (auto& member : members) {
    const std::string& selector = member.kind == kMemberMethod
                                      ? member.methodSelector
                                      : member.getterSelector;
    if (member.name.empty() ||
        (selector.empty() && !member.availability.hasData())) {
      continue;
    }
    out += wroteAny ? ",\n" : ",\"members\":[\n";
    wroteAny = true;
    out += "{\"jsName\":\"";
    out += jsonEscape(member.name);
    out += "\",\"kind\":\"";
    out += member.kind == kMemberMethod ? "method" : "property";
    out += "\"";
    if (!selector.empty()) {
      out += ",\"selector\":\"";
      out += jsonEscape(selector);
      out += "\"";
    }
    if (member.kind == kMemberProperty && !member.isReadonly &&
        !member.setterSelector.empty()) {
      out += ",\"setterSelector\":\"";
      out += jsonEscape(member.setterSelector);
      out += "\"";
    }
    if (member.isStatic) {
      out += ",\"static\":true";
    }
    appendAvailability(out, member.availability);
    out += "}";
  }
  if (wroteAny) {
    out += "]";
  }
}

void JSONEmitter::write() {
  for (auto& var : factory.variables) {
    std::string& out = ensureBuffer(var.second.framework);
    writeSymbolHeader(out, var.second.name, "const", var.second.availability);
    out += "}";
  }

  for (auto& enm : factory.enums) {
    std::string& out = ensureBuffer(enm.second.framework);
    writeSymbolHeader(out, enm.second.name, "enum", enm.second.availability);
    out += "}";
  }

  for (auto& strct : factory.structs) {
    std::string& out = ensureBuffer(strct.second.framework);
    writeSymbolHeader(out, strct.second.name, "struct",
                      strct.second.availability);
    out += "}";
  }

  for (auto& un : factory.unions) {
    std::string& out = ensureBuffer(un.second.framework);
    writeSymbolHeader(out, un.second.name, "union", un.second.availability);
    out += "}";
  }

  for (auto& func : factory.functions) {
    std::string& out = ensureBuffer(func.framework);
    writeSymbolHeader(out, func.name, "function", func.availability);
    out += "}";
  }

  for (auto& proto : factory.protocols) {
    std::string& out = ensureBuffer(proto.second.framework);
    writeSymbolHeader(out, proto.second.name, "protocol",
                      proto.second.availability);
    writeMembers(out, proto.second.members);
    out += "}";
  }

  for (auto& cls : factory.classes) {
    if (cls.first.empty()) {
      continue;
    }
    std::string& out = ensureBuffer(cls.second.framework);
    writeSymbolHeader(out, cls.second.name, "class", cls.second.availability);
    writeMembers(out, cls.second.members);
    out += "}";
  }

  std::error_code dirError;
  std::filesystem::create_directories(outDir, dirError);

  for (auto& [framework, buffer] : buffers) {
    buffer += "\n]}\n";
    std::string path = outDir + "/" + framework + ".json";
    auto file = std::fopen(path.c_str(), "w");
    if (file == nullptr) {
      std::fprintf(stderr, "JSONEmitter: failed to open %s for writing\n",
                   path.c_str());
      continue;
    }
    std::fwrite(buffer.data(), 1, buffer.size(), file);
    std::fclose(file);
  }
}

}  // namespace metagen
