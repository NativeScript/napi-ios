/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />

declare const UTTypeGeoJSON: UTType;

declare const UTTypeEPUB: UTType;

declare const UTTypeX509Certificate: UTType;

declare const UTTypeEmailMessage: UTType;

declare const UTTypeContact: UTType;

declare const UTTypeZIP: UTType;

declare const UTTypeBZ2: UTType;

declare const UTTypeArchive: UTType;

declare const UTTypeUnixExecutable: UTType;

declare const UTTypeApplicationExtension: UTType;

declare const UTTypeApplication: UTType;

declare const UTTypeXPCService: UTType;

declare const UTTypeQuickLookGenerator: UTType;

declare const UTTypeSpotlightImporter: UTType;

declare const UTTypePluginBundle: UTType;

declare const UTTypeBundle: UTType;

declare const UTTypeFolder: UTType;

declare const UTTypeMIDI: UTType;

declare const UTTypeAIFF: UTType;

declare const UTTypeAVI: UTType;

declare const UTTypeMPEG4Audio: UTType;

declare const UTTypeMPEG4Movie: UTType;

declare const UTTypeMPEG2Video: UTType;

declare const UTTypePerlScript: UTType;

declare const UTTypeAudiovisualContent: UTType;

declare const UTTypeRealityFile: UTType;

declare const UTTypeJPEGXL: UTType;

declare const UTTypeDNG: UTType;

declare const UTTypeEXR: UTType;

declare const UTTypeSVG: UTType;

declare const UTTypeRAWImage: UTType;

declare const UTTypeICO: UTType;

declare const UTTypeBMP: UTType;

declare const UTTypePNG: UTType;

declare const UTTypeJPEG: UTType;

declare const UTTypeWebArchive: UTType;

declare const UTTypeXMLPropertyList: UTType;

declare const UTTypePropertyList: UTType;

declare const UTTypeJSON: UTType;

declare const UTTypeMakefile: UTType;

declare const UTTypeJavaScript: UTType;

declare const UTTypeOSAScriptBundle: UTType;

declare const UTTypeOSAScript: UTType;

declare const UTTypeAppleScript: UTType;

declare const UTTypeScript: UTType;

declare const UTTypeDatabase: UTType;

declare const UTTypeHTML: UTType;

declare const UTTypeUTF8TabSeparatedText: UTType;

declare const UTTypeTabSeparatedText: UTType;

declare const UTTypeUTF16ExternalPlainText: UTType;

declare const UTTypeURL: UTType;

declare const UTTypeSymbolicLink: UTType;

declare const UTTypeData: UTType;

declare const UTTypeDiskImage: UTType;

declare const UTTypeHEIC: UTType;

declare const UTTypeGIF: UTType;

declare const UTTypeFlatRTFD: UTType;

declare const UTTypeCommaSeparatedText: UTType;

declare const UTTypeCHeader: UTType;

declare const UTTypePKCS12: UTType;

declare const UTTypeVCard: UTType;

declare const UTTypeMovie: UTType;

declare const UTTypeICNS: UTType;

declare const UTTypeImage: UTType;

declare const UTTypePlainText: UTType;

declare const UTTypeText: UTType;

declare const UTTypeShellScript: UTType;

declare const UTTypeSwiftSource: UTType;

declare const UTTypeGZIP: UTType;

declare const UTTypeMessage: UTType;

declare const UTTypeLog: UTType;

declare const UTTypeAssemblyLanguageSource: UTType;

declare const UTTypeInternetShortcut: UTType;

declare const UTTypeXML: UTType;

declare const UTTypeUSD: UTType;

declare const UTTypeRTF: UTType;

declare const UTTypeExecutable: UTType;

declare const UTTypeFont: UTType;

declare const UTTypeQuickTimeMovie: UTType;

declare const UTTypeFileURL: UTType;

declare const UTTypeAudio: UTType;

declare const UTTypeLinkPresentationMetadata: UTType;

declare const UTTypeApplicationBundle: UTType;

declare const UTTypeM3UPlaylist: UTType;

declare const UTTagClassMIMEType: string;

declare const UTTypeCPlusPlusSource: UTType;

declare const UTTypeAppleArchive: UTType;

declare const UTTypeAHAP: UTType;

declare const UTTypeDelimitedText: UTType;

declare const UTTypePDF: UTType;

declare const UTTypeWAV: UTType;

declare const UTTypeToDoItem: UTType;

declare const UTTypeCSS: UTType;

declare const UTTypeWebP: UTType;

declare const UTTypeContent: UTType;

declare const UTTypeVolume: UTType;

declare const UTTypeHEIF: UTType;

declare const UTTypeDirectory: UTType;

declare const UTTypeURLBookmarkData: UTType;

declare const UTTypePythonScript: UTType;

declare const UTTypeEXE: UTType;

declare const UTType3DContent: UTType;

declare const UTTypeResolvable: UTType;

declare const UTTypeARReferenceObject: UTType;

declare const UTTypeRubyScript: UTType;

declare const UTTypeUSDZ: UTType;

declare const UTTypeBinaryPropertyList: UTType;

declare const UTTypeFramework: UTType;

declare const UTTypeLivePhoto: UTType;

declare const UTTypeObjectiveCSource: UTType;

declare const UTTypeAppleProtectedMPEG4Audio: UTType;

declare const UTTypeItem: UTType;

declare const UTTypeBookmark: UTType;

declare const UTTypeUTF16PlainText: UTType;

declare const UTTypeMP3: UTType;

declare const UTTypePlaylist: UTType;

declare const UTTypeSceneKitScene: UTType;

declare const UTTypePackage: UTType;

declare const UTTypeYAML: UTType;

declare const UTTypeCalendarEvent: UTType;

declare const UTTypeMountPoint: UTType;

declare const UTTypeSpreadsheet: UTType;

declare const UTTypeAliasFile: UTType;

declare const UTTypeCPlusPlusHeader: UTType;

declare const UTTypeHEICS: UTType;

declare const UTTypeTarArchive: UTType;

declare const UTTypeAppleProtectedMPEG4Video: UTType;

declare const UTTagClassFilenameExtension: string;

declare const UTTypeSourceCode: UTType;

declare const UTTypePHPScript: UTType;

declare const UTTypeVideo: UTType;

declare const UTTypeMPEG2TransportStream: UTType;

declare const UTTypeMPEG: UTType;

declare const UTTypePresentation: UTType;

declare const UTTypeCSource: UTType;

declare const UTTypeUTF8PlainText: UTType;

declare const UTTypeTIFF: UTType;

declare const UTTypeInternetLocation: UTType;

declare const UTTypeCompositeContent: UTType;

declare const UTTypeSystemPreferencesPane: UTType;

declare const UTTypeRTFD: UTType;

declare const UTTypeObjectiveCPlusPlusSource: UTType;

declare class UTType extends NSObject implements NSCopying, NSSecureCoding {
  static typeWithIdentifier<This extends abstract new (...args: any) => any>(this: This, identifier: string): InstanceType<This>;

  static typeWithFilenameExtension<This extends abstract new (...args: any) => any>(this: This, filenameExtension: string): InstanceType<This>;

  static typeWithFilenameExtensionConformingToType<This extends abstract new (...args: any) => any>(this: This, filenameExtension: string, supertype: UTType): InstanceType<This>;

  static typeWithMIMEType<This extends abstract new (...args: any) => any>(this: This, mimeType: string): InstanceType<This>;

  static typeWithMIMETypeConformingToType<This extends abstract new (...args: any) => any>(this: This, mimeType: string, supertype: UTType): InstanceType<This>;

  readonly identifier: string;

  readonly preferredFilenameExtension: string;

  readonly preferredMIMEType: string;

  readonly localizedDescription: string;

  readonly version: NSNumber;

  readonly referenceURL: NSURL;

  readonly dynamic: boolean;

  readonly declared: boolean;

  readonly publicType: boolean;

  isDynamic(): boolean;

  isDeclared(): boolean;

  isPublicType(): boolean;

  conformsToType(type: UTType): boolean;

  isSupertypeOfType(type: UTType): boolean;

  isSubtypeOfType(type: UTType): boolean;

  readonly supertypes: NSSet;

  static typeWithTagTagClassConformingToType<This extends abstract new (...args: any) => any>(this: This, tag: string, tagClass: string, supertype: UTType | null): InstanceType<This>;

  static typesWithTagTagClassConformingToType(tag: string, tagClass: string, supertype: UTType | null): NSArray;

  readonly tags: NSDictionary;

  static exportedTypeWithIdentifier(identifier: string): UTType;

  static exportedTypeWithIdentifierConformingToType(identifier: string, parentType: UTType): UTType;

  static importedTypeWithIdentifier(identifier: string): UTType;

  static importedTypeWithIdentifierConformingToType(identifier: string, parentType: UTType): UTType;

  static readonly SHSignatureContentType: UTType;

  static readonly SHCustomCatalogContentType: UTType;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

