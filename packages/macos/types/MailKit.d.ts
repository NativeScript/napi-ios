/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />
/// <reference path="./AppKit.d.ts" />

declare const MEComposeSessionErrorDomain: string;

declare const MEMessageSecurityErrorDomain: string;

declare const MEMessageActionFlag: {
  None: 0,
  DefaultColor: 1,
  Red: 2,
  Orange: 3,
  Yellow: 4,
  Green: 5,
  Blue: 6,
  Purple: 7,
  Gray: 8,
};

declare const MEMessageSecurityErrorCode: {
  Encoding: 0,
  Decoding: 1,
};

declare const MEComposeSessionErrorCode: {
  Recipients: 0,
  Headers: 1,
  Body: 2,
};

declare const MEMessageEncryptionState: {
  Unknown: 0,
  NotEncrypted: 1,
  Encrypted: 2,
};

declare const MEMessageState: {
  Received: 0,
  Draft: 1,
  Sending: 2,
};

declare const MEMessageActionMessageColor: {
  None: 0,
  Green: 1,
  Yellow: 2,
  Orange: 3,
  Red: 4,
  Purple: 5,
  Blue: 6,
  Gray: 7,
};

declare const MEComposeUserAction: {
  NewMessage: 1,
  Reply: 2,
  ReplyAll: 3,
  Forward: 4,
};

declare interface MEMessageSecurityHandler extends MEMessageEncoder, MEMessageDecoder {
  extensionViewControllerForMessageSigners(messageSigners: NSArray<interop.Object> | Array<interop.Object>): MEExtensionViewController;

  extensionViewControllerForMessageContext(context: NSData): MEExtensionViewController;

  primaryActionClickedForMessageContextCompletionHandler(context: NSData, completionHandler: (p1: MEExtensionViewController) => void | null): void;
}

declare class MEMessageSecurityHandler extends NativeObject implements MEMessageSecurityHandler {
}

declare interface MEMessageEncoder extends NSObjectProtocol {
  getEncodingStatusForMessageComposeContextCompletionHandler(message: MEMessage, composeContext: MEComposeContext, completionHandler: (p1: MEOutgoingMessageEncodingStatus) => void): void;

  encodeMessageComposeContextCompletionHandler(message: MEMessage, composeContext: MEComposeContext, completionHandler: (p1: MEMessageEncodingResult) => void): void;
}

declare class MEMessageEncoder extends NativeObject implements MEMessageEncoder {
}

declare interface MEComposeSessionHandler extends NSObjectProtocol {
  mailComposeSessionDidBegin(session: MEComposeSession): void;

  mailComposeSessionDidEnd(session: MEComposeSession): void;

  viewControllerForSession(session: MEComposeSession): MEExtensionViewController;

  sessionAnnotateAddressesWithCompletionHandler?(session: MEComposeSession, completionHandler: (p1: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>) => void): void;

  sessionCanSendMessageWithCompletionHandler?(session: MEComposeSession, completion: (p1: NSError) => void | null): void;

  additionalHeadersForSession?(session: MEComposeSession): NSDictionary;
}

declare class MEComposeSessionHandler extends NativeObject implements MEComposeSessionHandler {
}

declare interface MEContentBlocker extends NSObjectProtocol {
  contentRulesJSON(): NSData;
}

declare class MEContentBlocker extends NativeObject implements MEContentBlocker {
}

declare interface MEMessageActionHandler extends NSObjectProtocol {
  decideActionForMessageCompletionHandler(message: MEMessage, completionHandler: (p1: MEMessageActionDecision) => void | null): void;

  readonly requiredHeaders?: NSArray;
}

declare class MEMessageActionHandler extends NativeObject implements MEMessageActionHandler {
}

declare interface MEExtension extends NSObjectProtocol {
  handlerForComposeSession?(session: MEComposeSession): MEComposeSessionHandler;

  handlerForMessageActions?(): MEMessageActionHandler;

  handlerForContentBlocker?(): MEContentBlocker;

  handlerForMessageSecurity?(): MEMessageSecurityHandler;
}

declare class MEExtension extends NativeObject implements MEExtension {
}

declare interface MEMessageDecoder extends NSObjectProtocol {
  decodedMessageForMessageData(data: NSData): MEDecodedMessage;
}

declare class MEMessageDecoder extends NativeObject implements MEMessageDecoder {
}

declare class MEComposeContext extends NSObject {
  readonly contextID: NSUUID;

  readonly originalMessage: MEMessage;

  readonly action: interop.Enum<typeof MEComposeUserAction>;

  readonly isEncrypted: boolean;

  readonly shouldEncrypt: boolean;

  readonly isSigned: boolean;

  readonly shouldSign: boolean;
}

declare class MEDecodedMessageBanner extends NSObject implements NSSecureCoding, NSCopying {
  readonly title: string;

  readonly primaryActionTitle: string;

  readonly dismissable: boolean;

  initWithTitlePrimaryActionTitleDismissable(title: string, primaryActionTitle: string, dismissable: boolean): this;

  isDismissable(): boolean;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class MEMessageSigner extends NSObject implements NSSecureCoding {
  readonly emailAddresses: NSArray;

  readonly label: string;

  readonly context: NSData;

  initWithEmailAddressesSignatureLabelContext(emailAddresses: NSArray<interop.Object> | Array<interop.Object>, label: string, context: NSData | null): this;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class MEMessageSecurityInformation extends NSObject implements NSSecureCoding {
  readonly signers: NSArray;

  readonly isEncrypted: boolean;

  readonly signingError: NSError;

  readonly encryptionError: NSError;

  readonly shouldBlockRemoteContent: boolean;

  readonly localizedRemoteContentBlockingReason: string;

  initWithSignersIsEncryptedSigningErrorEncryptionError(signers: NSArray<interop.Object> | Array<interop.Object>, isEncrypted: boolean, signingError: NSError | null, encryptionError: NSError | null): this;

  initWithSignersIsEncryptedSigningErrorEncryptionErrorShouldBlockRemoteContentLocalizedRemoteContentBlockingReason(signers: NSArray<interop.Object> | Array<interop.Object>, isEncrypted: boolean, signingError: NSError | null, encryptionError: NSError | null, shouldBlockRemoteContent: boolean, localizedRemoteContentBlockingReason: string | null): this;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class MEOutgoingMessageEncodingStatus extends NSObject implements NSSecureCoding {
  readonly canSign: boolean;

  readonly canEncrypt: boolean;

  readonly securityError: NSError;

  readonly addressesFailingEncryption: NSArray;

  initWithCanSignCanEncryptSecurityErrorAddressesFailingEncryption(canSign: boolean, canEncrypt: boolean, securityError: NSError | null, addressesFailingEncryption: NSArray<interop.Object> | Array<interop.Object>): this;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class MEMessageEncodingResult extends NSObject implements NSSecureCoding {
  readonly encodedMessage: MEEncodedOutgoingMessage;

  readonly signingError: NSError;

  readonly encryptionError: NSError;

  initWithEncodedMessageSigningErrorEncryptionError(encodedMessage: MEEncodedOutgoingMessage | null, signingError: NSError | null, encryptionError: NSError | null): this;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class MEDecodedMessage extends NSObject implements NSSecureCoding {
  readonly rawData: NSData;

  readonly securityInformation: MEMessageSecurityInformation;

  readonly context: NSData;

  readonly banner: MEDecodedMessageBanner;

  initWithDataSecurityInformationContext(rawData: NSData | null, securityInformation: MEMessageSecurityInformation, context: NSData | null): this;

  initWithDataSecurityInformationContextBanner(rawData: NSData | null, securityInformation: MEMessageSecurityInformation, context: NSData | null, banner: MEDecodedMessageBanner | null): this;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class MEEncodedOutgoingMessage extends NSObject implements NSSecureCoding {
  initWithRawDataIsSignedIsEncrypted(rawData: NSData, isSigned: boolean, isEncrypted: boolean): this;

  readonly rawData: NSData;

  readonly isSigned: boolean;

  readonly isEncrypted: boolean;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class MEComposeSession extends NSObject implements NSSecureCoding {
  readonly sessionID: NSUUID;

  readonly mailMessage: MEMessage;

  readonly composeContext: MEComposeContext;

  reloadSession(): void;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class MEMessage extends NSObject implements NSSecureCoding {
  readonly state: interop.Enum<typeof MEMessageState>;

  readonly encryptionState: interop.Enum<typeof MEMessageEncryptionState>;

  readonly subject: string;

  readonly fromAddress: MEEmailAddress;

  readonly toAddresses: NSArray;

  readonly ccAddresses: NSArray;

  readonly bccAddresses: NSArray;

  readonly replyToAddresses: NSArray;

  readonly allRecipientAddresses: NSArray;

  readonly dateSent: NSDate;

  readonly dateReceived: NSDate;

  readonly headers: NSDictionary;

  readonly rawData: NSData;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class MEExtensionViewController extends NSViewController {
}

declare class MEAddressAnnotation extends NSObject implements NSSecureCoding {
  static errorWithLocalizedDescription(localizedDescription: string): MEAddressAnnotation;

  static warningWithLocalizedDescription(localizedDescription: string): MEAddressAnnotation;

  static successWithLocalizedDescription(localizedDescription: string): MEAddressAnnotation;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class MEMessageActionDecision extends NSObject implements NSSecureCoding {
  static readonly invokeAgainWithBody: MEMessageActionDecision;

  static decisionApplyingAction<This extends abstract new (...args: any) => any>(this: This, action: MEMessageAction): InstanceType<This>;

  static decisionApplyingActions<This extends abstract new (...args: any) => any>(this: This, actions: NSArray<interop.Object> | Array<interop.Object>): InstanceType<This>;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class MEMessageAction extends NSObject implements NSSecureCoding {
  static readonly moveToTrashAction: MEMessageAction;

  static readonly moveToArchiveAction: MEMessageAction;

  static readonly moveToJunkAction: MEMessageAction;

  static readonly markAsReadAction: MEMessageAction;

  static readonly markAsUnreadAction: MEMessageAction;

  static flagActionWithFlag<This extends abstract new (...args: any) => any>(this: This, flag: interop.Enum<typeof MEMessageActionFlag>): InstanceType<This>;

  static setBackgroundColorActionWithColor<This extends abstract new (...args: any) => any>(this: This, color: interop.Enum<typeof MEMessageActionMessageColor>): InstanceType<This>;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class MEEmailAddress extends NSObject implements NSSecureCoding, NSCopying {
  readonly rawString: string;

  readonly addressString: string;

  initWithRawString(rawString: string): this;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class MEExtensionManager extends NSObject {
  static reloadContentBlockerWithIdentifierCompletionHandler(identifier: string, completionHandler: (p1: NSError) => void | null): void;

  static reloadVisibleMessagesWithCompletionHandler(completionHandler: (p1: NSError) => void | null): void;
}

