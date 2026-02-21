package org.nativescript.jsi

import com.facebook.react.bridge.ReactApplicationContext

class NativescriptJsiModule(reactContext: ReactApplicationContext) :
  NativeNativescriptJsiSpec(reactContext) {

  override fun multiply(a: Double, b: Double): Double {
    return a * b
  }

  override fun getArch() {
    // iOS-specific API. Let's just stub it on Android.
    return "unknown";
  }

  override fun getMainBundleResourcePath() {
    // iOS-specific API. Let's just stub it on Android.
    return "";
  }

  override fun nativescript_init(metadata_path: String?) {
    // NativeScript JSI is not currently supported on Android. For now, we just
    // no-op.
  }

  companion object {
    const val NAME = NativeNativescriptJsiSpec.NAME
  }
}
