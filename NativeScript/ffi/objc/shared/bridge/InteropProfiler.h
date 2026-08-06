// Interop call profiling (NS_NS_HOST_PROFILE): global counters for the count
// and cumulative duration of every ffi dispatch, so host-lifecycle profiling
// can attribute each phase's cost to bridged native calls. C++17 inline
// variables at global scope — the engine TUs include the bridge sources inside
// an anonymous namespace, so these must live in their own header included at
// file scope to get one shared definition across TUs.
//
// gCallsAlways is a separate, always-on counterpart to gCalls: gCalls/gNs
// only increment when NS_NS_HOST_PROFILE is set (that flag also turns on
// verbose NSLog profiling elsewhere, which perturbs the very volume it's
// measuring). gCallsAlways is a single relaxed atomic increment with no
// timing, no branch on the profiling flag, and no allocation -- safe to
// leave live in every build so pop-perf gating has a trustworthy,
// non-self-perturbing interop-call count.
#pragma once

#include <atomic>
#include <cstdint>

namespace nsInteropProfiler {
inline std::atomic<uint64_t> gCalls{0};
inline std::atomic<uint64_t> gNs{0};
inline std::atomic<uint64_t> gCallsAlways{0};
}  // namespace nsInteropProfiler
