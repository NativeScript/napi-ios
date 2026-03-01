#!/bin/bash
set -e
source "$(dirname "$0")/build_utils.sh"

V8_VERSION="10.3.22"

GCLIENT_SYNC_ARGS="
    --deps=ios 
    --reset
    --with_branch_head
    --revision $V8_VERSION
    --delete_unversioned_trees
"

checkpoint "Fetching V8 Version: $V8_VERSION"

echo running: gclient config --name v8 --unmanaged "https://chromium.googlesource.com/v8/v8.git"
gclient config --name v8 --unmanaged "https://chromium.googlesource.com/v8/v8.git"

checkpoint "Syncing V8"
echo running: gclient sync ${GCLIENT_SYNC_ARGS}
gclient sync ${GCLIENT_SYNC_ARGS}

checkpoint "V8 fetch complete (no local patches are applied)."
