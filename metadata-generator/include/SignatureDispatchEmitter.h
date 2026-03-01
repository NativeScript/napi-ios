#pragma once

#include <string>

#include "MetadataWriter.h"

namespace metagen {

void writeSignatureDispatchBindings(const MDMetadataWriter& writer,
                                   const std::string& outputPath);

}  // namespace metagen
