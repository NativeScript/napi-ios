/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />

declare const ODTrustTypeAnonymous: string;

declare const ODPacketEncryptionSSL: number;

declare const ODPacketEncryptionRequired: number;

declare const ODPacketEncryptionAllow: number;

declare const ODFrameworkErrorDomain: string;

declare const kODBackOffSeconds: string;

declare const kODPolicyAttributeDaysUntilExpiration: string;

declare const kODPolicyAttributeExpiresOnDayOfWeek: string;

declare const kODPolicyAttributeExpiresOnDate: string;

declare const kODPolicyAttributeEnableOnDate: string;

declare const kODPolicyAttributeLastPasswordChangeTime: string;

declare const kODPolicyAttributeLastAuthenticationTime: string;

declare const kODPolicyAttributeLastFailedAuthenticationTime: string;

declare const kODPolicyAttributeMaximumFailedAuthentications: string;

declare const kODPolicyAttributeFailedAuthentications: string;

declare const kODPolicyAttributeCurrentDayOfWeek: string;

declare const kODPolicyAttributeCurrentTimeOfDay: string;

declare const kODPolicyAttributePasswordHashes: string;

declare const kODPolicyAttributeRecordType: string;

declare const kODPolicyAttributeRecordName: string;

declare const kODPolicyCategoryPasswordContent: string;

declare const kODPolicyCategoryAuthentication: string;

declare const kODPolicyKeyContentDescription: string;

declare const kODPolicyKeyIdentifier: string;

declare const kODExpirationTimeNeverExpires: number;

declare const kODExpirationTimeExpired: number;

declare const kODPolicyTypeAccountMaximumMinutesOfNonUse: string;

declare const kODPolicyTypeAccountMaximumFailedLogins: string;

declare const kODPolicyTypeAccountExpiresOnDate: string;

declare const kODPolicyTypePasswordRequiresMixedCase: string;

declare const kODPolicyTypePasswordRequiresAlpha: string;

declare const kODPolicyTypePasswordMinimumNumberOfCharacters: string;

declare const kODAuthenticationTypeSetPolicyAsCurrent: string;

declare const kODAuthenticationTypeSetPasswordAsCurrent: string;

declare const kODAuthenticationTypeSetNTHash: string;

declare const kODAuthenticationTypeSetLMHash: string;

declare const kODAuthenticationTypeSetCertificateHashAsCurrent: string;

declare const kODAuthenticationTypeSMB_NT_Key: string;

declare const kODAuthenticationTypeSMB_LM_Key: string;

declare const kODAuthenticationTypeSMBWorkstationCredentialSessionKey: string;

declare const kODAuthenticationTypeReadSecureHash: string;

declare const kODAuthenticationTypeNewUserWithPolicy: string;

declare const kODAuthenticationTypeNTLMv2: string;

declare const kODAuthenticationTypeMSCHAP2: string;

declare const kODAuthenticationTypeMPPEMasterKeys: string;

declare const kODAuthenticationTypeKerberosTickets: string;

declare const kODAuthenticationTypeGetGlobalPolicy: string;

declare const kODAuthenticationTypeDeleteUser: string;

declare const kODAuthenticationTypeDIGEST_MD5: string;

declare const kODAuthenticationTypeChangePasswd: string;

declare const kODAuthenticationTypeCRAM_MD5: string;

declare const kODAuthenticationType2WayRandom: string;

declare const kODAttributeTypeAttrListValueRefs: string;

declare const kODAttributeTypeRecRefs: string;

declare const kODAttributeTypeNodeRefs: string;

declare const kODAttributeTypeAttrListRefCount: string;

declare const kODAttributeTypeRecRefCount: string;

declare const kODAttributeTypeProcessName: string;

declare const kODAttributeTypeVersion: string;

declare const kODAttributeTypeNumTableList: string;

declare const kODAttributeTypeConfigFile: string;

declare const kODAttributeTypeBuildVersion: string;

declare const kODAttributeTypeParentLocales: string;

declare const kODAttributeTypeLocaleRelay: string;

declare const kODAttributeTypeAdvertisedServices: string;

declare const kODAttributeTypeNodeOptions: string;

declare const kODAttributeTypeCustomSearchPath: string;

declare const kODAttributeTypeAutomaticSearchPath: string;

declare const kODAttributeTypeNetGroupTriplet: string;

declare const kODAttributeTypeSubNodes: string;

declare const kODAttributeTypeSchema: string;

declare const kODAttributeTypeRecordType: string;

declare const kODAttributeTypeAuthMethod: string;

declare const kODAttributeTypeTimePackage: string;

declare const kODAttributeTypeReadOnlyNode: string;

declare const kODAttributeTypePwdAgingPolicy: string;

declare const kODAttributeTypeOriginalHomeDirectory: string;

declare const kODAttributeTypeKerberosRealm: string;

declare const kODAttributeTypeCopyTimestamp: string;

declare const kODAttributeTypeAuthCredential: string;

declare const kODAttributeTypeAlias: string;

declare const kODAttributeTypeURL: string;

declare const kODAttributeTypeResourceType: string;

declare const kODAttributeTypeProtocols: string;

declare const kODAttributeTypeProfiles: string;

declare const kODAttributeTypePGPPublicKey: string;

declare const kODAttributeTypePagerNumber: string;

declare const kODAttributeTypeOrganizationName: string;

declare const kODAttributeTypeNickName: string;

declare const kODAttributeTypeIPAddress: string;

declare const kODAttributeTypeHTML: string;

declare const kODAttributeTypeGroupMembership: string;

declare const kODAttributeTypeGroupMembers: string;

declare const kODAttributeTypeGroup: string;

declare const kODAttributeTypeEMailContacts: string;

declare const kODAttributeTypeDNSName: string;

declare const kODAttributeTypeDepartment: string;

declare const kODAttributeTypeServicesLocator: string;

declare const kODAttributeTypeBootParams: string;

declare const kODAttributeTypeAuthenticationAuthority: string;

declare const kODAttributeTypeAreaCode: string;

declare const kODAttributeTypeAddressLine2: string;

declare const kODAttributeTypeAddressLine1: string;

declare const kODAttributeTypeNetworkNumber: string;

declare const kODAttributeTypeDirRefs: string;

declare const kODAttributeTypeRPCNumber: string;

declare const kODAttributeTypeXMLPlist: string;

declare const kODAttributeTypeWeblogURI: string;

declare const kODAttributeTypeVFSDumpFreq: string;

declare const kODAttributeTypeUserShell: string;

declare const kODAttributeTypeTrustInformation: string;

declare const kODAttributeTypeSetupOccupation: string;

declare const kODAttributeTypeSetupLocation: string;

declare const kODAttributeTypeSetupAutoRegister: string;

declare const kODAttributeTypeSetupAdvertising: string;

declare const kODAttributeTypeServiceType: string;

declare const kODAttributeTypeSMBSID: string;

declare const kODAttributeTypeSMBRID: string;

declare const kODAttributeTypeSMBLogonTime: string;

declare const kODAttributeTypeSMBLogoffTime: string;

declare const kODAttributeTypeSMBHomeDrive: string;

declare const kODAttributeTypeSMBHome: string;

declare const kODAttributeTypeRelativeDNPrefix: string;

declare const kODAttributeTypeRealUserID: string;

declare const kODAttributeTypePrintServiceUserData: string;

declare const kODAttributeTypePrintServiceInfoXML: string;

declare const kODAttributeTypePrintServiceInfoText: string;

declare const kODAttributeTypePrinterMakeAndModel: string;

declare const kODAttributeTypePrinter1284DeviceID: string;

declare const kODAttributeTypePrimaryComputerList: string;

declare const kODAttributeTypePresetUserIsAdmin: string;

declare const kODAttributeTypePort: string;

declare const kODAttributeTypePasswordServerLocation: string;

declare const kODAttributeTypePasswordServerList: string;

declare const kODAttributeTypeOwner: string;

declare const kODAttributeTypeNote: string;

declare const kODAttributeTypeMiddleName: string;

declare const kODAttributeTypeKerberosServices: string;

declare const kODAttributeTypeInternetAlias: string;

declare const kODAttributeTypeHomeLocOwner: string;

declare const kODAttributeTypeHomeDirectorySoftQuota: string;

declare const kODAttributeTypeHomeDirectoryQuota: string;

declare const kODAttributeTypeHardwareUUID: string;

declare const kODAttributeTypeFirstName: string;

declare const kODAttributeTypeDNSNameServer: string;

declare const kODAttributeTypeDNSDomain: string;

declare const kODAttributeTypeCertificateRevocationList: string;

declare const kODAttributeTypeCACertificate: string;

declare const kODAttributeTypeAllTypes: string;

declare const kODAttributeTypeAdminLimits: string;

declare const kODAttributeTypeMetaAugmentedAttributes: string;

declare const kODAttributeTypeNativeOnly: string;

declare const kODRecordTypeUsers: string;

declare const kODRecordTypeSharePoints: string;

declare const kODRecordTypeServer: string;

declare const kODRecordTypeSMBServer: string;

declare const kODRecordTypeResources: string;

declare const kODRecordTypeRecordTypes: string;

declare const kODRecordTypeQueryInformation: string;

declare const kODRecordTypeProtocols: string;

declare const kODRecordTypePrintService: string;

declare const kODRecordTypePresetUsers: string;

declare const kODRecordTypePresetComputers: string;

declare const kODRecordTypePeople: string;

declare const kODRecordTypeLocations: string;

declare const kODRecordTypeLDAPServer: string;

declare const kODRecordTypeFTPServer: string;

declare const kODRecordTypeFileMakerServers: string;

declare const kODRecordTypeConfiguration: string;

declare const kODRecordTypeComputers: string;

declare const kODRecordTypeComputerGroups: string;

declare const kODRecordTypeComputerLists: string;

declare const kODRecordTypeBootp: string;

declare const kODRecordTypeAutoServerSetup: string;

declare const kODRecordTypeAutomountMap: string;

declare const kODRecordTypeAutomount: string;

declare const kODRecordTypeAFPServer: string;

declare const kODMatchLessThan: number;

declare const kODMatchInsensitiveEndsWith: number;

declare const kODMatchInsensitiveEqualTo: number;

declare const kODMatchEndsWith: number;

declare const kODMatchBeginsWith: number;

declare const kODMatchEqualTo: number;

declare const kODMatchAny: number;

declare const kODNodeTypeConfigure: number;

declare const kODNodeTypeNetwork: number;

declare const kODModuleConfigOptionManInTheMiddle: interop.Pointer;

declare const kODSessionProxyUsername: interop.Pointer;

declare const kODErrorDomainFramework: interop.Pointer;

declare const kODAuthenticationTypeNodeNativeClearTextOK: string;

declare const kODNodeTypeContacts: number;

declare const kODAuthenticationTypeGetKerberosPrincipal: string;

declare const kODNodeOptionsQuerySkippedSubnode: interop.Pointer;

declare const kODAttributeTypeMetaAutomountMap: string;

declare const kODPolicyTypePasswordMaximumAgeInMinutes: string;

declare const kODAttributeTypeMCXFlags: string;

declare const kODRecordTypeEthernets: string;

declare const kODRecordTypeNetworks: string;

declare const kODMatchInsensitiveContains: number;

declare const kODAttributeTypeNodeSASLRealm: string;

declare const kODAttributeTypeDateRecordCreated: string;

declare const kODAttributeTypeCountry: string;

declare const kODSessionProxyPassword: interop.Pointer;

declare const ODTrustTypeUsingCredentials: string;

declare const kODSessionProxyPort: interop.Pointer;

declare const kODAttributeTypeBuilding: string;

declare const kODAttributeTypeSMBUserWorkstations: string;

declare const kODAttributeTypeUserCertificate: string;

declare const kODAttributeTypeAuthorityRevocationList: string;

declare const kODAttributeTypeEMailAddress: string;

declare const kODPolicyAttributeCurrentDate: string;

declare const kODPolicyKeyParameters: string;

declare const kODAttributeTypeAccessControlEntry: string;

declare const kODAttributeTypeMIME: string;

declare const kODAuthenticationTypeSetPassword: string;

declare const kODAuthenticationTypeWithAuthorizationRef: string;

declare const kODModuleConfigOptionPacketEncryption: interop.Pointer;

declare const kODAttributeTypeDirRefCount: string;

declare const kODAttributeTypePIDValue: string;

declare const kODAttributeTypeProtocolNumber: string;

declare const kODRecordTypePresetComputerLists: string;

declare const kODAttributeTypeBirthday: string;

declare const kODPolicyTypePasswordMaximumNumberOfCharacters: string;

declare const kODAttributeTypeExpire: string;

declare const kODAttributeTypeNameSuffix: string;

declare const kODAttributeTypeSMBGroupRID: string;

declare const kODAttributeTypeTimeToLive: string;

declare const kODAttributeTypeAutomountInformation: string;

declare const kODRecordTypePresetComputerGroups: string;

declare const kODAuthenticationTypeSecureHash: string;

declare const kODAttributeTypePostalAddressContacts: string;

declare const kODAttributeTypeStreet: string;

declare const kODRecordTypeNetDomains: string;

declare const kODAttributeTypeIPv6Address: string;

declare const kODAttributeTypeMobileNumber: string;

declare const kODAttributeTypeNetworkInterfaces: string;

declare const kODAttributeTypeHomePhoneNumber: string;

declare const kODAttributeTypeModificationTimestamp: string;

declare const kODAttributeTypePhoneContacts: string;

declare const kODAttributeTypeTotalSize: string;

declare const kODAttributeTypeUserSMIMECertificate: string;

declare const kODAttributeTypeAttrListValueRefCount: string;

declare const kODAttributeTypePrinterLPRQueue: string;

declare const kODPolicyAttributeExpiresAtTimeOfDay: string;

declare const kODAttributeTypeGUID: string;

declare const kODAuthenticationTypeSetWorkstationPassword: string;

declare const kODAttributeTypeRecordName: string;

declare const kODAttributeTypeOrganizationInfo: string;

declare const kODAttributeTypeAllAttributes: string;

declare const kODAttributeTypeLDAPSearchBaseSuffix: string;

declare const kODRecordTypeWebServer: string;

declare const kODAuthenticationTypeSMBNTv2UserSessionKey: string;

declare const kODAttributeTypeMCXSettings: string;

declare const kODAttributeTypeOperatingSystem: string;

declare const kODAttributeTypeOperatingSystemVersion: string;

declare const kODPolicyAttributeNewPasswordRequiredTime: string;

declare const kODAttributeTypePostalCode: string;

declare const kODAttributeTypeComputers: string;

declare const kODPolicyTypePasswordChangeRequired: string;

declare const kODRecordTypeHosts: string;

declare const kODAttributeTypeMetaAmbiguousName: string;

declare const kODRecordTypePrintServiceUser: string;

declare const kODAttributeTypeLDAPWriteReplicas: string;

declare const kODAttributeTypeSMBKickoffTime: string;

declare const ODSessionProxyPort: string;

declare const kODPolicyAttributeCreationTime: string;

declare const kODPolicyAttributePasswordHistory: string;

declare const kODAuthenticationTypeSetGlobalPolicy: string;

declare const kODAttributeTypeMailAttribute: string;

declare const kODAttributeTypeMapCoordinates: string;

declare const kODAuthenticationTypeSetPolicy: string;

declare const kODAttributeTypeJobTitle: string;

declare const kODAttributeTypeCompany: string;

declare const kODRecordTypeNetGroups: string;

declare const ODSessionProxyAddress: string;

declare const kODAttributeTypeOriginalNFSHomeDirectory: string;

declare const kODPolicyTypePasswordRequiresSymbol: string;

declare const kODAttributeTypePrinterLPRHost: string;

declare const kODAttributeTypePasswordPolicyOptions: string;

declare const kODAttributeTypeMapURI: string;

declare const kODAttributeTypeTotalRefCount: string;

declare const kODRecordTypeAliases: string;

declare const kODAttributeTypeKeywords: string;

declare const kODAttributeTypePassword: string;

declare const kODAttributeTypeRelationships: string;

declare const kODAttributeTypeIPAddressAndENetAddress: string;

declare const kODAttributeTypeAuthenticationHint: string;

declare const kODAttributeTypePluginIndex: string;

declare const kODAttributeTypeContactPerson: string;

declare const ODSessionProxyPassword: string;

declare const kODAttributeTypeIMHandle: string;

declare const kODPolicyTypePasswordCannotBeAccountName: string;

declare const kODAttributeTypeCreationTimestamp: string;

declare const kODAttributeTypeUserPKCS12Data: string;

declare const kODAttributeTypeFullName: string;

declare const kODAttributeTypePhoneNumber: string;

declare const kODPolicyAttributeEnableAtTimeOfDay: string;

declare const kODRecordTypeRPC: string;

declare const kODAttributeTypeOriginalNodeName: string;

declare const kODAttributeTypeKDCConfigData: string;

declare const kODAttributeTypeMetaRecordName: string;

declare const kODAttributeTypeMetaNodeLocation: string;

declare const kODAttributeTypeNamePrefix: string;

declare const kODAttributeTypeDataStamp: string;

declare const kODAttributeTypeProfilesTimestamp: string;

declare const kODAuthenticationTypeClearTextReadOnly: string;

declare const kODAttributeTypeSMBPWDLastSet: string;

declare const kODAttributeTypeHomeDirectory: string;

declare const kODAttributeTypeJPEGPhoto: string;

declare const kODPolicyTypeAccountMaximumMinutesUntilDisabled: string;

declare const kODAttributeTypeCrossCertificatePair: string;

declare const kODModuleConfigOptionQueryTimeout: interop.Pointer;

declare const kODAttributeTypeAttrListRefs: string;

declare const kODPolicyAttributeCurrentTime: string;

declare const kODPolicyTypeAccountMinutesUntilFailedLoginReset: string;

declare const ODSessionProxyUsername: string;

declare const kODAttributeTypeStandardOnly: string;

declare const kODRecordTypeMounts: string;

declare const kODAttributeTypeFunctionalState: string;

declare const kODAuthenticationTypeCrypt: string;

declare const kODAttributeTypePostalAddress: string;

declare const kODAttributeTypePrimaryComputerGUID: string;

declare const kODAuthenticationTypeAPOP: string;

declare const kODAttributeTypePrimaryLocale: string;

declare const kODAttributeTypeSMBScriptPath: string;

declare const kODAttributeTypeSearchPath: string;

declare const kODRecordTypeServices: string;

declare const kODAttributeTypeNFSHomeDirectory: string;

declare const kODAttributeTypeContactGUID: string;

declare const kODAuthenticationTypeMPPEPrimaryKeys: string;

declare const kODAuthenticationTypeSMB_NT_WithUserSessionKey: string;

declare const kODAttributeTypeGroupServices: string;

declare const kODPolicyAttributeExpiresEveryNDays: string;

declare const kODAttributeTypeSMBAcctFlags: string;

declare const kODAuthenticationTypeGetEffectivePolicy: string;

declare const kODMatchContains: number;

declare const kODAuthenticationTypeSMB_NT_UserSessionKey: string;

declare const kODAuthenticationTypeNewUser: string;

declare const kODAttributeTypeLocation: string;

declare const kODAttributeTypeState: string;

declare const kODModuleConfigOptionPacketSigning: interop.Pointer;

declare const kODAttributeTypePicture: string;

declare const kODAttributeTypeCity: string;

declare const kODAttributeTypeOwnerGUID: string;

declare const kODAttributeTypePrinterURI: string;

declare const kODAttributeTypeAltSecurityIdentities: string;

declare const kODAttributeTypeENetAddress: string;

declare const kODAttributeTypeLDAPReadReplicas: string;

declare const kODAttributeTypeVFSLinkDir: string;

declare const kODAttributeTypeSMBPrimaryGroupSID: string;

declare const kODPolicyKeyPolicySatisfied: string;

declare const kODAuthenticationTypeSetUserName: string;

declare const kODAttributeTypeResourceInfo: string;

declare const kODPolicyTypePasswordRequiresNumeric: string;

declare const kODAttributeTypeFWVersion: string;

declare const kODAttributeTypeConfigAvailable: string;

declare const kODAuthenticationTypeGetPolicy: string;

declare const kODAttributeTypePrinterType: string;

declare const kODNodeTypeLocalNodes: number;

declare const kODSessionProxyAddress: interop.Pointer;

declare const kODAttributeTypeVFSPassNo: string;

declare const kODPolicyAttributeEnableOnDayOfWeek: string;

declare const kODPolicyTypePasswordSelfModification: string;

declare const ODPacketSigningDisabled: number;

declare const kODSessionDefault: interop.Object;

declare const kODPolicyAttributePassword: string;

declare const kODAttributeTypeNTDomainComputerAccount: string;

declare const kODAuthenticationTypeSetUserData: string;

declare const kODRecordTypeQTSServer: string;

declare const kODAuthenticationTypeNodeNativeNoClearText: string;

declare const kODAuthenticationTypeGetUserName: string;

declare const kODAttributeTypeFaxNumber: string;

declare const kODMatchGreaterThan: number;

declare const kODAttributeTypeNodePath: string;

declare const kODAttributeTypePasswordPlus: string;

declare const kODRecordTypeGroups: string;

declare const kODAttributeTypeUniqueID: string;

declare const kODAttributeTypeLastName: string;

declare const kODRecordTypePrinters: string;

declare const kODAttributeTypePrimaryGroupID: string;

declare const kODRecordTypeAttributeTypes: string;

declare const kODPolicyAttributePasswordHistoryDepth: string;

declare const kODMatchInsensitiveBeginsWith: number;

declare const kODAuthenticationTypeWriteSecureHash: string;

declare const kODAttributeTypeSearchPolicy: string;

declare const kODAttributeTypeNestedGroups: string;

declare const kODPolicyKeyEvaluationDetails: string;

declare const kODAttributeTypeNodeRefCount: string;

declare const kODAttributeTypePrimaryNTDomain: string;

declare const kODRecordTypePresetGroups: string;

declare const kODPolicyCategoryPasswordChange: string;

declare const kODAttributeTypeVFSOpts: string;

declare const kODAuthenticationTypeClearText: string;

declare const ODPacketSigningRequired: number;

declare const kODAuthenticationType2WayRandomChangePasswd: string;

declare const kODAuthenticationTypeGetUserData: string;

declare const kODAttributeTypeCoreFWVersion: string;

declare const kODAttributeTypeAddressLine3: string;

declare const ODPacketSigningAllow: number;

declare const kODRecordTypeHostServices: string;

declare const kODRecordTypeNFS: string;

declare const kODRecordTypeCertificateAuthorities: string;

declare const ODPacketEncryptionDisabled: number;

declare const kODModuleConfigOptionConnectionSetupTimeout: interop.Pointer;

declare const kODAttributeTypeNetGroups: string;

declare const kODAuthenticationTypeNTLMv2WithSessionKey: string;

declare const kODPolicyKeyContent: string;

declare const kODAttributeTypeKDCAuthKey: string;

declare const kODAttributeTypeMapGUID: string;

declare const kODAttributeTypeComment: string;

declare const kODRecordTypeAugments: string;

declare const kODAttributeTypePrinterXRISupported: string;

declare const kODAttributeTypeSMBProfilePath: string;

declare const kODAttributeTypeCapacity: string;

declare const kODAttributeTypeLocaleSubnets: string;

declare const kODPolicyTypePasswordHistory: string;

declare const kODModuleConfigOptionConnectionIdleDisconnect: interop.Pointer;

declare const kODNodeTypeAuthentication: number;

declare const ODTrustTypeJoined: string;

declare const kODAttributeTypePlugInInfo: string;

declare const kODAttributeTypeLocalOnlySearchPath: string;

declare const kODAttributeTypeVFSType: string;

declare const ODFrameworkErrors: {
  Success: 0,
  SessionLocalOnlyDaemonInUse: 1000,
  SessionNormalDaemonInUse: 1001,
  SessionDaemonNotRunning: 1002,
  SessionDaemonRefused: 1003,
  SessionProxyCommunicationError: 1100,
  SessionProxyVersionMismatch: 1101,
  SessionProxyIPUnreachable: 1102,
  SessionProxyUnknownHost: 1103,
  NodeUnknownName: 2000,
  NodeUnknownType: 2001,
  NodeDisabled: 2002,
  NodeConnectionFailed: 2100,
  NodeUnknownHost: 2200,
  QuerySynchronize: 3000,
  QueryInvalidMatchType: 3100,
  QueryUnsupportedMatchType: 3101,
  QueryTimeout: 3102,
  RecordReadOnlyNode: 4000,
  RecordPermissionError: 4001,
  RecordParameterError: 4100,
  RecordInvalidType: 4101,
  RecordAlreadyExists: 4102,
  RecordTypeDisabled: 4103,
  RecordNoLongerExists: 4104,
  RecordAttributeUnknownType: 4200,
  RecordAttributeNotFound: 4201,
  RecordAttributeValueSchemaError: 4202,
  RecordAttributeValueNotFound: 4203,
  CredentialsInvalid: 5000,
  CredentialsMethodNotSupported: 5100,
  CredentialsNotAuthorized: 5101,
  CredentialsParameterError: 5102,
  CredentialsOperationFailed: 5103,
  CredentialsServerUnreachable: 5200,
  CredentialsServerNotFound: 5201,
  CredentialsServerError: 5202,
  CredentialsServerTimeout: 5203,
  CredentialsContactPrimary: 5204,
  CredentialsContactMaster: 5204,
  CredentialsServerCommunicationError: 5205,
  CredentialsAccountNotFound: 5300,
  CredentialsAccountDisabled: 5301,
  CredentialsAccountExpired: 5302,
  CredentialsAccountInactive: 5303,
  CredentialsAccountTemporarilyLocked: 5304,
  CredentialsAccountLocked: 5305,
  CredentialsPasswordExpired: 5400,
  CredentialsPasswordChangeRequired: 5401,
  CredentialsPasswordQualityFailed: 5402,
  CredentialsPasswordTooShort: 5403,
  CredentialsPasswordTooLong: 5404,
  CredentialsPasswordNeedsLetter: 5405,
  CredentialsPasswordNeedsDigit: 5406,
  CredentialsPasswordChangeTooSoon: 5407,
  CredentialsPasswordUnrecoverable: 5408,
  CredentialsInvalidLogonHours: 5500,
  CredentialsInvalidComputer: 5501,
  PolicyUnsupported: 6000,
  PolicyOutOfRange: 6001,
  PluginOperationNotSupported: 10000,
  PluginError: 10001,
  DaemonError: 10002,
  PluginOperationTimeout: 10003,
};

declare class __ODSession {
  constructor(init?: __ODSession);
}

declare class __ODRecord {
  constructor(init?: __ODRecord);
}

declare class __ODQuery {
  constructor(init?: __ODQuery);
}

declare class __ODNode {
  constructor(init?: __ODNode);
}

declare class __ODContext {
  constructor(init?: __ODContext);
}

declare function ODContextGetTypeID(): number;

declare function ODNodeGetTypeID(): number;

declare function ODNodeCreateWithNodeType(allocator: interop.Object, session: interop.Object, nodeType: number, error: interop.PointerConvertible): interop.Object;

declare function ODNodeCreateWithName(allocator: interop.Object, session: interop.Object, nodeName: interop.Object, error: interop.PointerConvertible): interop.Object;

declare function ODNodeCreateCopy(allocator: interop.Object, node: interop.Object, error: interop.PointerConvertible): interop.Object;

declare function ODNodeCopySubnodeNames(node: interop.Object, error: interop.PointerConvertible): interop.Object;

declare function ODNodeCopyUnreachableSubnodeNames(node: interop.Object, error: interop.PointerConvertible): interop.Object;

declare function ODNodeGetName(node: interop.Object): interop.Object;

declare function ODNodeCopyDetails(node: interop.Object, keys: interop.Object, error: interop.PointerConvertible): interop.Object;

declare function ODNodeCopySupportedRecordTypes(node: interop.Object, error: interop.PointerConvertible): interop.Object;

declare function ODNodeCopySupportedAttributes(node: interop.Object, recordType: string, error: interop.PointerConvertible): interop.Object;

declare function ODNodeSetCredentials(node: interop.Object, recordType: string, recordName: interop.Object, password: interop.Object, error: interop.PointerConvertible): boolean;

declare function ODNodeSetCredentialsExtended(node: interop.Object, recordType: string, authType: string, authItems: interop.Object, outAuthItems: interop.PointerConvertible, outContext: interop.PointerConvertible, error: interop.PointerConvertible): boolean;

declare function ODNodeSetCredentialsUsingKerberosCache(node: interop.Object, cacheName: interop.Object, error: interop.PointerConvertible): boolean;

declare function ODNodeCreateRecord(node: interop.Object, recordType: string, recordName: interop.Object, attributeDict: interop.Object, error: interop.PointerConvertible): interop.Object;

declare function ODNodeCopyRecord(node: interop.Object, recordType: string, recordName: interop.Object, attributes: interop.Object, error: interop.PointerConvertible): interop.Object;

declare function ODNodeCustomCall(node: interop.Object, customCode: number, data: interop.Object, error: interop.PointerConvertible): interop.Object;

declare function ODNodeCustomFunction(node: interop.Object, function$: interop.Object, payload: interop.Object, error: interop.PointerConvertible): interop.Object;

declare function ODNodeCopyPolicies(node: interop.Object, error: interop.PointerConvertible): interop.Object;

declare function ODNodeCopySupportedPolicies(node: interop.Object, error: interop.PointerConvertible): interop.Object;

declare function ODNodeSetPolicies(node: interop.Object, policies: interop.Object, error: interop.PointerConvertible): boolean;

declare function ODNodeSetPolicy(node: interop.Object, policyType: string, value: interop.Object, error: interop.PointerConvertible): boolean;

declare function ODNodeRemovePolicy(node: interop.Object, policyType: string, error: interop.PointerConvertible): boolean;

declare function ODNodeAddAccountPolicy(node: interop.Object, policy: interop.Object, category: string, error: interop.PointerConvertible): boolean;

declare function ODNodeRemoveAccountPolicy(node: interop.Object, policy: interop.Object, category: string, error: interop.PointerConvertible): boolean;

declare function ODNodeSetAccountPolicies(node: interop.Object, policies: interop.Object, error: interop.PointerConvertible): boolean;

declare function ODNodeCopyAccountPolicies(node: interop.Object, error: interop.PointerConvertible): interop.Object;

declare function ODNodePasswordContentCheck(node: interop.Object, password: interop.Object, recordName: interop.Object, error: interop.PointerConvertible): boolean;

declare function ODQueryGetTypeID(): number;

declare function ODQueryCreateWithNode(allocator: interop.Object, node: interop.Object, recordTypeOrList: interop.Object, attribute: string, matchType: number, queryValueOrList: interop.Object, returnAttributeOrList: interop.Object, maxResults: number, error: interop.PointerConvertible): interop.Object;

declare function ODQueryCreateWithNodeType(allocator: interop.Object, nodeType: number, recordTypeOrList: interop.Object, attribute: string, matchType: number, queryValueOrList: interop.Object, returnAttributeOrList: interop.Object, maxResults: number, error: interop.PointerConvertible): interop.Object;

declare function ODQueryCopyResults(query: interop.Object, allowPartialResults: boolean, error: interop.PointerConvertible): interop.Object;

declare function ODQuerySynchronize(query: interop.Object): void;

declare function ODQuerySetCallback(query: interop.Object, callback: (p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: interop.PointerConvertible) => void, userInfo: interop.PointerConvertible): void;

declare function ODQueryScheduleWithRunLoop(query: interop.Object, runLoop: interop.Object, runLoopMode: interop.Object): void;

declare function ODQueryUnscheduleFromRunLoop(query: interop.Object, runLoop: interop.Object, runLoopMode: interop.Object): void;

declare function ODQuerySetDispatchQueue(query: interop.Object, queue: NSObject): void;

declare function ODRecordGetTypeID(): number;

declare function ODRecordSetNodeCredentials(record: interop.Object, username: interop.Object, password: interop.Object, error: interop.PointerConvertible): boolean;

declare function ODRecordSetNodeCredentialsExtended(record: interop.Object, recordType: string, authType: string, authItems: interop.Object, outAuthItems: interop.PointerConvertible, outContext: interop.PointerConvertible, error: interop.PointerConvertible): boolean;

declare function ODRecordSetNodeCredentialsUsingKerberosCache(record: interop.Object, cacheName: interop.Object, error: interop.PointerConvertible): boolean;

declare function ODRecordCopyPasswordPolicy(allocator: interop.Object, record: interop.Object, error: interop.PointerConvertible): interop.Object;

declare function ODRecordVerifyPassword(record: interop.Object, password: interop.Object, error: interop.PointerConvertible): boolean;

declare function ODRecordVerifyPasswordExtended(record: interop.Object, authType: string, authItems: interop.Object, outAuthItems: interop.PointerConvertible, outContext: interop.PointerConvertible, error: interop.PointerConvertible): boolean;

declare function ODRecordChangePassword(record: interop.Object, oldPassword: interop.Object, newPassword: interop.Object, error: interop.PointerConvertible): boolean;

declare function ODRecordGetRecordType(record: interop.Object): interop.Object;

declare function ODRecordGetRecordName(record: interop.Object): interop.Object;

declare function ODRecordCopyValues(record: interop.Object, attribute: string, error: interop.PointerConvertible): interop.Object;

declare function ODRecordSetValue(record: interop.Object, attribute: string, valueOrValues: interop.Object, error: interop.PointerConvertible): boolean;

declare function ODRecordAddValue(record: interop.Object, attribute: string, value: interop.Object, error: interop.PointerConvertible): boolean;

declare function ODRecordRemoveValue(record: interop.Object, attribute: string, value: interop.Object, error: interop.PointerConvertible): boolean;

declare function ODRecordCopyDetails(record: interop.Object, attributes: interop.Object, error: interop.PointerConvertible): interop.Object;

declare function ODRecordSynchronize(record: interop.Object, error: interop.PointerConvertible): boolean;

declare function ODRecordDelete(record: interop.Object, error: interop.PointerConvertible): boolean;

declare function ODRecordAddMember(group: interop.Object, member: interop.Object, error: interop.PointerConvertible): boolean;

declare function ODRecordRemoveMember(group: interop.Object, member: interop.Object, error: interop.PointerConvertible): boolean;

declare function ODRecordContainsMember(group: interop.Object, member: interop.Object, error: interop.PointerConvertible): boolean;

declare function ODRecordCopyPolicies(record: interop.Object, error: interop.PointerConvertible): interop.Object;

declare function ODRecordCopyEffectivePolicies(record: interop.Object, error: interop.PointerConvertible): interop.Object;

declare function ODRecordCopySupportedPolicies(record: interop.Object, error: interop.PointerConvertible): interop.Object;

declare function ODRecordSetPolicies(record: interop.Object, policies: interop.Object, error: interop.PointerConvertible): boolean;

declare function ODRecordSetPolicy(record: interop.Object, policy: string, value: interop.Object, error: interop.PointerConvertible): boolean;

declare function ODRecordRemovePolicy(record: interop.Object, policy: string, error: interop.PointerConvertible): boolean;

declare function ODRecordAddAccountPolicy(record: interop.Object, policy: interop.Object, category: string, error: interop.PointerConvertible): boolean;

declare function ODRecordRemoveAccountPolicy(record: interop.Object, policy: interop.Object, category: string, error: interop.PointerConvertible): boolean;

declare function ODRecordSetAccountPolicies(record: interop.Object, policies: interop.Object, error: interop.PointerConvertible): boolean;

declare function ODRecordCopyAccountPolicies(record: interop.Object, error: interop.PointerConvertible): interop.Object;

declare function ODRecordAuthenticationAllowed(record: interop.Object, error: interop.PointerConvertible): boolean;

declare function ODRecordPasswordChangeAllowed(record: interop.Object, newPassword: interop.Object, error: interop.PointerConvertible): boolean;

declare function ODRecordWillPasswordExpire(record: interop.Object, willExpireIn: number): boolean;

declare function ODRecordWillAuthenticationsExpire(record: interop.Object, willExpireIn: number): boolean;

declare function ODRecordSecondsUntilPasswordExpires(record: interop.Object): number;

declare function ODRecordSecondsUntilAuthenticationsExpire(record: interop.Object): number;

declare function ODSessionGetTypeID(): number;

declare function ODSessionCreate(allocator: interop.Object, options: interop.Object, error: interop.PointerConvertible): interop.Object;

declare function ODSessionCopyNodeNames(allocator: interop.Object, session: interop.Object, error: interop.PointerConvertible): interop.Object;

declare interface ODQueryDelegate extends NSObjectProtocol {
  queryFoundResultsError(inQuery: ODQuery, inResults: NSArray<interop.Object> | Array<interop.Object>, inError: NSError): void;
}

declare class ODQueryDelegate extends NativeObject implements ODQueryDelegate {
}

declare class ODNode extends NSObject {
  static nodeWithSessionTypeError<This extends abstract new (...args: any) => any>(this: This, inSession: ODSession, inType: number, outError: interop.PointerConvertible): InstanceType<This>;

  static nodeWithSessionNameError<This extends abstract new (...args: any) => any>(this: This, inSession: ODSession, inName: string, outError: interop.PointerConvertible): InstanceType<This>;

  initWithSessionTypeError(inSession: ODSession, inType: number, outError: interop.PointerConvertible): this;

  initWithSessionNameError(inSession: ODSession, inName: string, outError: interop.PointerConvertible): this;

  subnodeNamesAndReturnError(outError: interop.PointerConvertible): NSArray;

  unreachableSubnodeNamesAndReturnError(outError: interop.PointerConvertible): NSArray;

  readonly nodeName: string;

  nodeDetailsForKeysError(inKeys: NSArray<interop.Object> | Array<interop.Object>, outError: interop.PointerConvertible): NSDictionary;

  supportedRecordTypesAndReturnError(outError: interop.PointerConvertible): NSArray;

  supportedAttributesForRecordTypeError(inRecordType: string, outError: interop.PointerConvertible): NSArray;

  setCredentialsWithRecordTypeRecordNamePasswordError(inRecordType: string, inRecordName: string, inPassword: string, outError: interop.PointerConvertible): boolean;

  setCredentialsWithRecordTypeAuthenticationTypeAuthenticationItemsContinueItemsContextError(inRecordType: string, inType: string, inItems: NSArray<interop.Object> | Array<interop.Object>, outItems: interop.PointerConvertible, outContext: interop.PointerConvertible, outError: interop.PointerConvertible): boolean;

  setCredentialsUsingKerberosCacheError(inCacheName: string, outError: interop.PointerConvertible): boolean;

  createRecordWithRecordTypeNameAttributesError(inRecordType: string, inRecordName: string, inAttributes: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>, outError: interop.PointerConvertible): ODRecord;

  recordWithRecordTypeNameAttributesError(inRecordType: string, inRecordName: string, inAttributes: interop.Object, outError: interop.PointerConvertible): ODRecord;

  customCallSendDataError(inCustomCode: number, inSendData: NSData, outError: interop.PointerConvertible): NSData;

  customFunctionPayloadError(function$: string, payload: interop.Object, error: interop.PointerConvertible): interop.Object;

  readonly configuration: ODConfiguration;

  policiesAndReturnError(error: interop.PointerConvertible): NSDictionary;

  supportedPoliciesAndReturnError(error: interop.PointerConvertible): NSDictionary;

  setPoliciesError(policies: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>, error: interop.PointerConvertible): boolean;

  setPolicyValueError(policy: string, value: interop.Object, error: interop.PointerConvertible): boolean;

  removePolicyError(policy: string, error: interop.PointerConvertible): boolean;

  addAccountPolicyToCategoryError(policy: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>, category: string, error: interop.PointerConvertible): boolean;

  removeAccountPolicyFromCategoryError(policy: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>, category: string, error: interop.PointerConvertible): boolean;

  setAccountPoliciesError(policies: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>, error: interop.PointerConvertible): boolean;

  accountPoliciesAndReturnError(error: interop.PointerConvertible): NSDictionary;

  passwordContentCheckForRecordNameError(password: string, recordName: string, error: interop.PointerConvertible): boolean;
}

declare class ODRecordMap extends NSObject {
  native: string;

  get odPredicate(): NSDictionary;
  set odPredicate(value: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>);

  readonly attributes: NSDictionary;

  readonly standardAttributeTypes: NSArray;

  static recordMap<This extends abstract new (...args: any) => any>(this: This): InstanceType<This>;

  attributeMapForStandardAttribute(standardAttribute: string): ODAttributeMap;

  setAttributeMapForStandardAttribute(attributeMap: ODAttributeMap, standardAttribute: string): void;

  setNative(native: string): void;

  setOdPredicate(odPredicate: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>): void;
}

declare class ODMappings extends NSObject {
  comment: string;

  templateName: string;

  identifier: string;

  readonly recordTypes: NSArray;

  function$: string;

  get functionAttributes(): NSArray;
  set functionAttributes(value: NSArray<interop.Object> | Array<interop.Object>);

  static mappings<This extends abstract new (...args: any) => any>(this: This): InstanceType<This>;

  recordMapForStandardRecordType(stdType: string): ODRecordMap;

  setRecordMapForStandardRecordType(map: ODRecordMap, stdType: string): void;

  setComment(comment: string): void;

  setTemplateName(templateName: string): void;

  setIdentifier(identifier: string): void;

  function(): string;

  setFunction(function$: string): void;

  setFunctionAttributes(functionAttributes: NSArray<interop.Object> | Array<interop.Object>): void;
}

declare class ODConfiguration extends NSObject {
  nodeName: string;

  comment: string;

  defaultMappings: ODMappings;

  templateName: string;

  get virtualSubnodes(): NSArray;
  set virtualSubnodes(value: NSArray<interop.Object> | Array<interop.Object>);

  hideRegistration: boolean;

  preferredDestinationHostName: string;

  preferredDestinationHostPort: number;

  readonly trustAccount: string;

  readonly trustMetaAccount: string;

  readonly trustKerberosPrincipal: string;

  readonly trustType: string;

  readonly trustUsesMutualAuthentication: boolean;

  readonly trustUsesKerberosKeytab: boolean;

  readonly trustUsesSystemKeychain: boolean;

  packetSigning: number;

  packetEncryption: number;

  manInTheMiddleProtection: boolean;

  queryTimeoutInSeconds: number;

  connectionSetupTimeoutInSeconds: number;

  connectionIdleTimeoutInSeconds: number;

  get defaultModuleEntries(): NSArray;
  set defaultModuleEntries(value: NSArray<interop.Object> | Array<interop.Object>);

  get authenticationModuleEntries(): NSArray;
  set authenticationModuleEntries(value: NSArray<interop.Object> | Array<interop.Object>);

  get discoveryModuleEntries(): NSArray;
  set discoveryModuleEntries(value: NSArray<interop.Object> | Array<interop.Object>);

  get generalModuleEntries(): NSArray;
  set generalModuleEntries(value: NSArray<interop.Object> | Array<interop.Object>);

  static configuration<This extends abstract new (...args: any) => any>(this: This): InstanceType<This>;

  static suggestedTrustAccount(hostname: string): string;

  static suggestedTrustPassword(length: number): string;

  saveUsingAuthorizationError(authorization: SFAuthorization, error: interop.PointerConvertible): boolean;

  addTrustTypeTrustAccountTrustPasswordUsernamePasswordJoinExistingError(trustType: string, account: string, accountPassword: string, username: string, password: string, join: boolean, error: interop.PointerConvertible): boolean;

  removeTrustUsingUsernamePasswordDeleteTrustAccountError(username: string, password: string, deleteAccount: boolean, error: interop.PointerConvertible): boolean;

  setNodeName(nodeName: string): void;

  setComment(comment: string): void;

  setDefaultMappings(defaultMappings: ODMappings): void;

  setTemplateName(templateName: string): void;

  setVirtualSubnodes(virtualSubnodes: NSArray<interop.Object> | Array<interop.Object>): void;

  setHideRegistration(hideRegistration: boolean): void;

  setPreferredDestinationHostName(preferredDestinationHostName: string): void;

  setPreferredDestinationHostPort(preferredDestinationHostPort: number): void;

  setPacketSigning(packetSigning: number): void;

  setPacketEncryption(packetEncryption: number): void;

  setManInTheMiddleProtection(manInTheMiddleProtection: boolean): void;

  setQueryTimeoutInSeconds(queryTimeoutInSeconds: number): void;

  setConnectionSetupTimeoutInSeconds(connectionSetupTimeoutInSeconds: number): void;

  setConnectionIdleTimeoutInSeconds(connectionIdleTimeoutInSeconds: number): void;

  setDefaultModuleEntries(defaultModuleEntries: NSArray<interop.Object> | Array<interop.Object>): void;

  setAuthenticationModuleEntries(authenticationModuleEntries: NSArray<interop.Object> | Array<interop.Object>): void;

  setDiscoveryModuleEntries(discoveryModuleEntries: NSArray<interop.Object> | Array<interop.Object>): void;

  setGeneralModuleEntries(generalModuleEntries: NSArray<interop.Object> | Array<interop.Object>): void;
}

declare class ODRecord extends NSObject {
  setNodeCredentialsPasswordError(inUsername: string, inPassword: string, outError: interop.PointerConvertible): boolean;

  setNodeCredentialsWithRecordTypeAuthenticationTypeAuthenticationItemsContinueItemsContextError(inRecordType: string, inType: string, inItems: NSArray<interop.Object> | Array<interop.Object>, outItems: interop.PointerConvertible, outContext: interop.PointerConvertible, outError: interop.PointerConvertible): boolean;

  setNodeCredentialsUsingKerberosCacheError(inCacheName: string, outError: interop.PointerConvertible): boolean;

  passwordPolicyAndReturnError(outError: interop.PointerConvertible): NSDictionary;

  verifyPasswordError(inPassword: string, outError: interop.PointerConvertible): boolean;

  verifyExtendedWithAuthenticationTypeAuthenticationItemsContinueItemsContextError(inType: string, inItems: NSArray<interop.Object> | Array<interop.Object>, outItems: interop.PointerConvertible, outContext: interop.PointerConvertible, outError: interop.PointerConvertible): boolean;

  changePasswordToPasswordError(oldPassword: string, newPassword: string, outError: interop.PointerConvertible): boolean;

  synchronizeAndReturnError(outError: interop.PointerConvertible): boolean;

  readonly recordType: string;

  readonly recordName: string;

  recordDetailsForAttributesError(inAttributes: NSArray<interop.Object> | Array<interop.Object>, outError: interop.PointerConvertible): NSDictionary;

  valuesForAttributeError(inAttribute: string, outError: interop.PointerConvertible): NSArray;

  setValueForAttributeError(inValueOrValues: interop.Object, inAttribute: string, outError: interop.PointerConvertible): boolean;

  removeValuesForAttributeError(inAttribute: string, outError: interop.PointerConvertible): boolean;

  addValueToAttributeError(inValue: interop.Object, inAttribute: string, outError: interop.PointerConvertible): boolean;

  removeValueFromAttributeError(inValue: interop.Object, inAttribute: string, outError: interop.PointerConvertible): boolean;

  deleteRecordAndReturnError(outError: interop.PointerConvertible): boolean;

  policiesAndReturnError(error: interop.PointerConvertible): NSDictionary;

  effectivePoliciesAndReturnError(error: interop.PointerConvertible): NSDictionary;

  supportedPoliciesAndReturnError(error: interop.PointerConvertible): NSDictionary;

  setPoliciesError(policies: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>, error: interop.PointerConvertible): boolean;

  setPolicyValueError(policy: string, value: interop.Object, error: interop.PointerConvertible): boolean;

  removePolicyError(policy: string, error: interop.PointerConvertible): boolean;

  addAccountPolicyToCategoryError(policy: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>, category: string, error: interop.PointerConvertible): boolean;

  removeAccountPolicyFromCategoryError(policy: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>, category: string, error: interop.PointerConvertible): boolean;

  setAccountPoliciesError(policies: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>, error: interop.PointerConvertible): boolean;

  accountPoliciesAndReturnError(error: interop.PointerConvertible): NSDictionary;

  authenticationAllowedAndReturnError(error: interop.PointerConvertible): boolean;

  passwordChangeAllowedError(newPassword: string, error: interop.PointerConvertible): boolean;

  willPasswordExpire(willExpireIn: number): boolean;

  willAuthenticationsExpire(willExpireIn: number): boolean;

  readonly secondsUntilPasswordExpires: number;

  readonly secondsUntilAuthenticationsExpire: number;

  addMemberRecordError(inRecord: ODRecord, outError: interop.PointerConvertible): boolean;

  removeMemberRecordError(inRecord: ODRecord, outError: interop.PointerConvertible): boolean;

  isMemberRecordError(inRecord: ODRecord, outError: interop.PointerConvertible): boolean;
}

declare class ODAttributeMap extends NSObject {
  customQueryFunction: string;

  customTranslationFunction: string;

  get customAttributes(): NSArray;
  set customAttributes(value: NSArray<interop.Object> | Array<interop.Object>);

  value: string;

  static attributeMapWithValue<This extends abstract new (...args: any) => any>(this: This, value: string): InstanceType<This>;

  static attributeMapWithStaticValue<This extends abstract new (...args: any) => any>(this: This, staticValue: string): InstanceType<This>;

  setStaticValue(staticValue: string): void;

  setVariableSubstitution(variableSubstitution: string): void;

  setCustomQueryFunction(customQueryFunction: string): void;

  setCustomTranslationFunction(customTranslationFunction: string): void;

  setCustomAttributes(customAttributes: NSArray<interop.Object> | Array<interop.Object>): void;

  setValue(value: string): void;
}

declare class ODModuleEntry extends NSObject {
  mappings: ODMappings;

  readonly supportedOptions: NSArray;

  name: string;

  xpcServiceName: string;

  uuidString: string;

  static moduleEntryWithNameXpcServiceName<This extends abstract new (...args: any) => any>(this: This, name: string, xpcServiceName: string): InstanceType<This>;

  setOptionValue(optionName: string, value: interop.Object): void;

  option(optionName: string): interop.Object;

  setMappings(mappings: ODMappings): void;

  setName(name: string): void;

  setXpcServiceName(xpcServiceName: string): void;

  setUuidString(uuidString: string): void;
}

declare class ODQuery extends NSObject implements NSCopying {
  static queryWithNodeForRecordTypesAttributeMatchTypeQueryValuesReturnAttributesMaximumResultsError(inNode: ODNode, inRecordTypeOrList: interop.Object, inAttribute: string, inMatchType: number, inQueryValueOrList: interop.Object, inReturnAttributeOrList: interop.Object, inMaximumResults: number, outError: interop.PointerConvertible): ODQuery;

  initWithNodeForRecordTypesAttributeMatchTypeQueryValuesReturnAttributesMaximumResultsError(inNode: ODNode, inRecordTypeOrList: interop.Object, inAttribute: string, inMatchType: number, inQueryValueOrList: interop.Object, inReturnAttributeOrList: interop.Object, inMaximumResults: number, outError: interop.PointerConvertible): this;

  resultsAllowingPartialError(inAllowPartialResults: boolean, outError: interop.PointerConvertible): NSArray;

  delegate: ODQueryDelegate;

  scheduleInRunLoopForMode(inRunLoop: NSRunLoop, inMode: string): void;

  removeFromRunLoopForMode(inRunLoop: NSRunLoop, inMode: string): void;

  synchronize(): void;

  operationQueue: NSOperationQueue;

  setDelegate(delegate: ODQueryDelegate): void;

  setOperationQueue(operationQueue: NSOperationQueue): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class ODSession extends NSObject {
  static defaultSession(): ODSession;

  static sessionWithOptionsError<This extends abstract new (...args: any) => any>(this: This, inOptions: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>, outError: interop.PointerConvertible): InstanceType<This>;

  initWithOptionsError(inOptions: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>, outError: interop.PointerConvertible): this;

  nodeNamesAndReturnError(outError: interop.PointerConvertible): NSArray;

  readonly configurationTemplateNames: NSArray;

  readonly mappingTemplateNames: NSArray;

  configurationAuthorizationAllowingUserInteractionError(allowInteraction: boolean, error: interop.PointerConvertible): SFAuthorization;

  configurationForNodename(nodename: string): ODConfiguration;

  addConfigurationAuthorizationError(configuration: ODConfiguration, authorization: SFAuthorization, error: interop.PointerConvertible): boolean;

  deleteConfigurationAuthorizationError(configuration: ODConfiguration, authorization: SFAuthorization, error: interop.PointerConvertible): boolean;

  deleteConfigurationWithNodenameAuthorizationError(nodename: string, authorization: SFAuthorization, error: interop.PointerConvertible): boolean;
}

