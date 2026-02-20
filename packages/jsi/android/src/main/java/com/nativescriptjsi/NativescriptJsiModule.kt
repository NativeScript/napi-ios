package org.nativescript.jsi

import com.facebook.react.bridge.ReactApplicationContext

class NativescriptJsiModule(reactContext: ReactApplicationContext) :
  NativeNativescriptJsiSpec(reactContext) {

  override fun multiply(a: Double, b: Double): Double {
    return a * b
  }

  companion object {
    const val NAME = NativeNativescriptJsiSpec.NAME
  }
}
