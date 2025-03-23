#include "RuntimeConfig.h"

struct RuntimeConfig RuntimeConfig = {
    .BaseDir = "",
    .ApplicationPath = "",
    .MetadataPtr = nullptr,
    .IsDebug = false,
    .LogToSystemConsole = false,
};
