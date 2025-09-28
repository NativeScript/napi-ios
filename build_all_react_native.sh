#!/bin/bash

# Remember to run:
#
# $ npm run metagen ios-sim
# metadata-generator/metadata/metadata.ios-sim.arm64.h
# metadata-generator/metadata/metadata.ios-sim.arm64.nsmd
# metadata-generator/metadata/metadata.ios-sim.x86_64.h
# metadata-generator/metadata/metadata.ios-sim.x86_64.nsmd
#
# $ npm run metagen ios
# metadata-generator/metadata/metadata.ios.arm64.h
# metadata-generator/metadata/metadata.ios.arm64.nsmd
#
# $ npm run metagen macos
# metadata-generator/metadata/metadata.macos.arm64.h
# metadata-generator/metadata/metadata.macos.arm64.nsmd
# metadata-generator/metadata/metadata.macos.x86_64.h
# metadata-generator/metadata/metadata.macos.x86_64.nsmd

./build_all_ios.sh --no-engine --embed-metadata --macos
