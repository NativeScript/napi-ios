#ifndef UMBRELLA_H
#define UMBRELLA_H

#include <string>

std::string CreateUmbrellaHeader(const std::vector<std::string>& clangArgs,
                                 std::vector<std::string>& includePaths,
                                 std::vector<std::string>& frameworks);

#endif  // UMBRELLA_H
