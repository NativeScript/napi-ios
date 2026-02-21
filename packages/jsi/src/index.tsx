import NativescriptJsi from './NativeNativescriptJsi';

export function multiply(a: number, b: number): number {
  return NativescriptJsi.multiply(a, b);
}

/**
 * @deprecated This is a convenience API for use by this library's example app
 * to help get the path to the bundled metadata. Normally this API would be
 * provided via expo-device or something.
 *
 * @platform iOS and macOS. Returns "unknown" on Android.
 */
export function getArch(): string {
  return NativescriptJsi.getArch();
}

/**
 * @deprecated This is a convenience API for use by this library's example app
 * to help get the path to the bundled metadata. Normally this API would be
 * provided via expo-file-system or something.
 *
 * @platform iOS and macOS. Returns empty string on Android.
 */
export function getMainBundleResourcePath(): string {
  return NativescriptJsi.getMainBundleResourcePath();
}

/**
 * Initialise NativeScript JSI. This installs its bindings to the Objective-C
 * runtime. It will bind to whatever APIs are referenced in in the metadata
 * bundle.
 *
 * @platform Only currently supported on iOS and macOS. Will no-op on Android.
 *
 * @param metadata_path A path to the metadata bundle (or null, if you'd
 * rather use metadata_ptr).
 */
export function nativescript_init(metadata_path: string | null): void {
  return NativescriptJsi.nativescript_init(metadata_path);
}
