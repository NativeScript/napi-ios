/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />
/// <reference path="./UIKit.d.ts" />
/// <reference path="./SpriteKit.d.ts" />
/// <reference path="./SceneKit.d.ts" />

declare const ARBlendShapeLocationEyeBlinkRight: string;

declare const ARBlendShapeLocationMouthShrugUpper: string;

declare const ARBlendShapeLocationMouthFrownRight: string;

declare const ARSCNDebugOptionShowFeaturePoints: interop.Enum<typeof SCNDebugOptions>;

declare const ARSkeletonJointNameLeftShoulder: string;

declare const ARSkeletonJointNameRightFoot: string;

declare const ARSkeletonJointNameLeftHand: string;

declare const ARBlendShapeLocationTongueOut: string;

declare const ARBlendShapeLocationNoseSneerLeft: string;

declare const ARBlendShapeLocationMouthUpperUpLeft: string;

declare const ARBlendShapeLocationMouthShrugLower: string;

declare const ARBlendShapeLocationMouthRollUpper: string;

declare const ARBlendShapeLocationMouthRollLower: string;

declare const ARBlendShapeLocationMouthRight: string;

declare const ARBlendShapeLocationMouthPressRight: string;

declare const ARBlendShapeLocationMouthLowerDownRight: string;

declare const ARBlendShapeLocationMouthLowerDownLeft: string;

declare const ARBlendShapeLocationMouthLeft: string;

declare const ARBlendShapeLocationMouthFrownLeft: string;

declare const ARBlendShapeLocationMouthDimpleLeft: string;

declare const ARBlendShapeLocationJawForward: string;

declare const ARBlendShapeLocationEyeWideRight: string;

declare const ARBlendShapeLocationEyeWideLeft: string;

declare const ARBlendShapeLocationEyeLookUpLeft: string;

declare const ARBlendShapeLocationEyeLookOutRight: string;

declare const ARBlendShapeLocationEyeLookInLeft: string;

declare const ARBlendShapeLocationCheekSquintLeft: string;

declare const ARBlendShapeLocationCheekPuff: string;

declare const ARBlendShapeLocationBrowDownRight: string;

declare const ARBlendShapeLocationBrowDownLeft: string;

declare const ARReferenceObjectArchiveExtension: string;

declare const ARErrorDomain: string;

declare const ARSCNDebugOptionShowWorldOrigin: interop.Enum<typeof SCNDebugOptions>;

declare const ARSkeletonJointNameHead: string;

declare const ARBlendShapeLocationEyeLookDownRight: string;

declare const ARBlendShapeLocationJawRight: string;

declare const ARBlendShapeLocationEyeBlinkLeft: string;

declare const ARBlendShapeLocationEyeSquintLeft: string;

declare const ARBlendShapeLocationMouthPressLeft: string;

declare const ARBlendShapeLocationBrowOuterUpRight: string;

declare const ARBlendShapeLocationMouthUpperUpRight: string;

declare const ARBlendShapeLocationMouthFunnel: string;

declare const ARBlendShapeLocationMouthSmileRight: string;

declare const ARBlendShapeLocationEyeLookOutLeft: string;

declare const ARBlendShapeLocationMouthDimpleRight: string;

declare const ARSkeletonJointNameLeftFoot: string;

declare const ARSkeletonJointNameRoot: string;

declare const ARBlendShapeLocationMouthPucker: string;

declare const ARBlendShapeLocationMouthStretchLeft: string;

declare const ARBlendShapeLocationMouthSmileLeft: string;

declare const ARBlendShapeLocationMouthStretchRight: string;

declare const ARBlendShapeLocationBrowOuterUpLeft: string;

declare const ARBlendShapeLocationEyeLookInRight: string;

declare const ARBlendShapeLocationMouthClose: string;

declare const ARBlendShapeLocationJawOpen: string;

declare const ARBlendShapeLocationEyeSquintRight: string;

declare const ARBlendShapeLocationNoseSneerRight: string;

declare const ARSkeletonJointNameRightHand: string;

declare const ARBlendShapeLocationBrowInnerUp: string;

declare const ARBlendShapeLocationEyeLookUpRight: string;

declare const ARBlendShapeLocationEyeLookDownLeft: string;

declare const ARBlendShapeLocationJawLeft: string;

declare const ARSkeletonJointNameRightShoulder: string;

declare const ARBlendShapeLocationCheekSquintRight: string;

declare const ARHitTestResultType: {
  FeaturePoint: 1,
  EstimatedHorizontalPlane: 2,
  EstimatedVerticalPlane: 4,
  ExistingPlane: 8,
  ExistingPlaneUsingExtent: 16,
  ExistingPlaneUsingGeometry: 32,
};

declare const ARMatteResolution: {
  Full: 0,
  Half: 1,
};

declare const ARAppClipCodeURLDecodingState: {
  Decoding: 0,
  Failed: 1,
  Decoded: 2,
};

declare const ARPlaneClassification: {
  None: 0,
  Wall: 1,
  Floor: 2,
  Ceiling: 3,
  Table: 4,
  Seat: 5,
  Window: 6,
  Door: 7,
};

declare const ARGeometryPrimitiveType: {
  Line: 0,
  Triangle: 1,
};

declare const ARWorldMappingStatus: {
  NotAvailable: 0,
  Limited: 1,
  Extending: 2,
  Mapped: 3,
};

declare const ARRaycastTargetAlignment: {
  Horizontal: 0,
  Vertical: 1,
  Any: 2,
};

declare const ARErrorCode: {
  UnsupportedConfiguration: 100,
  SensorUnavailable: 101,
  SensorFailed: 102,
  CameraUnauthorized: 103,
  MicrophoneUnauthorized: 104,
  LocationUnauthorized: 105,
  HighResolutionFrameCaptureInProgress: 106,
  HighResolutionFrameCaptureFailed: 107,
  WorldTrackingFailed: 200,
  GeoTrackingNotAvailableAtLocation: 201,
  GeoTrackingFailed: 202,
  InvalidReferenceImage: 300,
  InvalidReferenceObject: 301,
  InvalidWorldMap: 302,
  InvalidConfiguration: 303,
  InvalidCollaborationData: 304,
  InsufficientFeatures: 400,
  ObjectMergeFailed: 401,
  FileIOFailed: 500,
  RequestFailed: 501,
};

declare const ARCollaborationDataPriority: {
  Critical: 0,
  Optional: 1,
};

declare const ARSessionRunOptions: {
  ResetTracking: 1,
  RemoveExistingAnchors: 2,
  StopTrackedRaycasts: 4,
  ResetSceneReconstruction: 8,
};

declare const ARGeoTrackingStateReason: {
  None: 0,
  NotAvailableAtLocation: 1,
  NeedLocationPermissions: 2,
  WorldTrackingUnstable: 3,
  WaitingForLocation: 4,
  WaitingForAvailabilityCheck: 5,
  GeoDataNotLoaded: 6,
  DevicePointedTooLow: 7,
  VisualLocalizationFailed: 8,
};

declare const ARAltitudeSource: {
  Unknown: 0,
  Coarse: 1,
  Precise: 2,
  UserDefined: 3,
};

declare const AREnvironmentTexturing: {
  None: 0,
  Manual: 1,
  Automatic: 2,
};

declare const ARWorldAlignment: {
  Gravity: 0,
  GravityAndHeading: 1,
  Camera: 2,
};

declare const ARPlaneDetection: {
  None: 0,
  Horizontal: 1,
  Vertical: 2,
};

declare const ARTrackingState: {
  NotAvailable: 0,
  Limited: 1,
  Normal: 2,
};

declare const ARPlaneClassificationStatus: {
  NotAvailable: 0,
  Undetermined: 1,
  Unknown: 2,
  Known: 3,
};

declare const ARConfidenceLevel: {
  Low: 0,
  Medium: 1,
  High: 2,
};

declare const ARGeoTrackingAccuracy: {
  Undetermined: 0,
  Low: 1,
  Medium: 2,
  High: 3,
};

declare const ARGeoTrackingState: {
  NotAvailable: 0,
  Initializing: 1,
  Localizing: 2,
  Localized: 3,
};

declare const ARCoachingGoal: {
  Tracking: 0,
  HorizontalPlane: 1,
  VerticalPlane: 2,
  AnyPlane: 3,
  GeoTracking: 4,
};

declare const ARSceneReconstruction: {
  None: 0,
  Mesh: 1,
  MeshWithClassification: 3,
};

declare const ARMeshClassification: {
  None: 0,
  Wall: 1,
  Floor: 2,
  Ceiling: 3,
  Table: 4,
  Seat: 5,
  Window: 6,
  Door: 7,
};

declare const ARSegmentationClass: {
  None: 0,
  Person: -1,
};

declare const ARTrackingStateReason: {
  None: 0,
  Initializing: 1,
  ExcessiveMotion: 2,
  InsufficientFeatures: 3,
  Relocalizing: 4,
};

declare const ARPlaneAnchorAlignment: {
  Horizontal: 0,
  Vertical: 1,
};

declare const ARRaycastTarget: {
  ExistingPlaneGeometry: 0,
  ExistingPlaneInfinite: 1,
  EstimatedPlane: 2,
};

declare const ARFrameSemantics: {
  None: 0,
  PersonSegmentation: 1,
  PersonSegmentationWithDepth: 3,
  BodyDetection: 4,
  SceneDepth: 8,
  SmoothedSceneDepth: 16,
};

declare function ARSkeletonJointNameForRecognizedPointKey(recognizedPointKey: string): string;

declare interface ARAnchorCopying extends NSCopying {
  initWithAnchor(anchor: ARAnchor): this;
}

declare class ARAnchorCopying extends NativeObject implements ARAnchorCopying {
}

declare interface ARSKViewDelegate extends SKViewDelegate, ARSessionObserver {
  viewNodeForAnchor?(view: ARSKView, anchor: ARAnchor): SKNode;

  viewDidAddNodeForAnchor?(view: ARSKView, node: SKNode, anchor: ARAnchor): void;

  viewWillUpdateNodeForAnchor?(view: ARSKView, node: SKNode, anchor: ARAnchor): void;

  viewDidUpdateNodeForAnchor?(view: ARSKView, node: SKNode, anchor: ARAnchor): void;

  viewDidRemoveNodeForAnchor?(view: ARSKView, node: SKNode, anchor: ARAnchor): void;
}

declare class ARSKViewDelegate extends NativeObject implements ARSKViewDelegate {
}

declare interface ARSCNViewDelegate extends SCNSceneRendererDelegate, ARSessionObserver {
  rendererNodeForAnchor?(renderer: SCNSceneRenderer, anchor: ARAnchor): SCNNode;

  rendererDidAddNodeForAnchor?(renderer: SCNSceneRenderer, node: SCNNode, anchor: ARAnchor): void;

  rendererWillUpdateNodeForAnchor?(renderer: SCNSceneRenderer, node: SCNNode, anchor: ARAnchor): void;

  rendererDidUpdateNodeForAnchor?(renderer: SCNSceneRenderer, node: SCNNode, anchor: ARAnchor): void;

  rendererDidRemoveNodeForAnchor?(renderer: SCNSceneRenderer, node: SCNNode, anchor: ARAnchor): void;
}

declare class ARSCNViewDelegate extends NativeObject implements ARSCNViewDelegate {
}

declare interface ARSessionDelegate extends ARSessionObserver {
  sessionDidUpdateFrame?(session: ARSession, frame: ARFrame): void;

  sessionDidAddAnchors?(session: ARSession, anchors: NSArray<interop.Object> | Array<interop.Object>): void;

  sessionDidUpdateAnchors?(session: ARSession, anchors: NSArray<interop.Object> | Array<interop.Object>): void;

  sessionDidRemoveAnchors?(session: ARSession, anchors: NSArray<interop.Object> | Array<interop.Object>): void;
}

declare class ARSessionDelegate extends NativeObject implements ARSessionDelegate {
}

declare interface ARSessionObserver extends NSObjectProtocol {
  sessionDidFailWithError?(session: ARSession, error: NSError): void;

  sessionCameraDidChangeTrackingState?(session: ARSession, camera: ARCamera): void;

  sessionWasInterrupted?(session: ARSession): void;

  sessionInterruptionEnded?(session: ARSession): void;

  sessionShouldAttemptRelocalization?(session: ARSession): boolean;

  sessionDidOutputAudioSampleBuffer?(session: ARSession, audioSampleBuffer: interop.Object): void;

  sessionDidOutputCollaborationData?(session: ARSession, data: ARCollaborationData): void;

  sessionDidChangeGeoTrackingStatus?(session: ARSession, geoTrackingStatus: ARGeoTrackingStatus): void;
}

declare class ARSessionObserver extends NativeObject implements ARSessionObserver {
}

declare interface ARTrackable extends NSObjectProtocol {
  readonly isTracked: boolean;
}

declare class ARTrackable extends NativeObject implements ARTrackable {
}

declare interface ARCoachingOverlayViewDelegate extends NSObjectProtocol {
  coachingOverlayViewDidRequestSessionReset?(coachingOverlayView: ARCoachingOverlayView): void;

  coachingOverlayViewWillActivate?(coachingOverlayView: ARCoachingOverlayView): void;

  coachingOverlayViewDidDeactivate?(coachingOverlayView: ARCoachingOverlayView): void;
}

declare class ARCoachingOverlayViewDelegate extends NativeObject implements ARCoachingOverlayViewDelegate {
}

declare interface ARSessionProviding extends NSObjectProtocol {
  readonly session: ARSession;
}

declare class ARSessionProviding extends NativeObject implements ARSessionProviding {
}

declare class ARLightEstimate extends NSObject {
  readonly ambientIntensity: number;

  readonly ambientColorTemperature: number;
}

declare class ARMatteGenerator extends NSObject {
  initWithDeviceMatteResolution(device: MTLDevice, matteResolution: interop.Enum<typeof ARMatteResolution>): this;

  generateMatteFromFrameCommandBuffer(frame: ARFrame, commandBuffer: MTLCommandBuffer): MTLTexture;

  generateDilatedDepthFromFrameCommandBuffer(frame: ARFrame, commandBuffer: MTLCommandBuffer): MTLTexture;
}

declare class ARWorldTrackingConfiguration extends ARConfiguration {
  autoFocusEnabled: boolean;

  environmentTexturing: interop.Enum<typeof AREnvironmentTexturing>;

  wantsHDREnvironmentTextures: boolean;

  planeDetection: interop.Enum<typeof ARPlaneDetection>;

  initialWorldMap: ARWorldMap;

  detectionImages: NSSet;

  automaticImageScaleEstimationEnabled: boolean;

  maximumNumberOfTrackedImages: number;

  detectionObjects: NSSet;

  collaborationEnabled: boolean;

  static readonly supportsUserFaceTracking: boolean;

  userFaceTrackingEnabled: boolean;

  appClipCodeTrackingEnabled: boolean;

  static readonly supportsAppClipCodeTracking: boolean;

  static supportsSceneReconstruction(sceneReconstruction: interop.Enum<typeof ARSceneReconstruction>): boolean;

  sceneReconstruction: interop.Enum<typeof ARSceneReconstruction>;

  init(): this;

  static new<This extends abstract new (...args: any) => any>(this: This): InstanceType<This>;

  isAutoFocusEnabled(): boolean;

  setAutoFocusEnabled(autoFocusEnabled: boolean): void;

  setEnvironmentTexturing(environmentTexturing: interop.Enum<typeof AREnvironmentTexturing>): void;

  setWantsHDREnvironmentTextures(wantsHDREnvironmentTextures: boolean): void;

  setPlaneDetection(planeDetection: interop.Enum<typeof ARPlaneDetection>): void;

  setInitialWorldMap(initialWorldMap: ARWorldMap): void;

  setDetectionImages(detectionImages: NSSet | null): void;

  setAutomaticImageScaleEstimationEnabled(automaticImageScaleEstimationEnabled: boolean): void;

  setMaximumNumberOfTrackedImages(maximumNumberOfTrackedImages: number): void;

  setDetectionObjects(detectionObjects: NSSet): void;

  isCollaborationEnabled(): boolean;

  setCollaborationEnabled(collaborationEnabled: boolean): void;

  setUserFaceTrackingEnabled(userFaceTrackingEnabled: boolean): void;

  setAppClipCodeTrackingEnabled(appClipCodeTrackingEnabled: boolean): void;

  setSceneReconstruction(sceneReconstruction: interop.Enum<typeof ARSceneReconstruction>): void;
}

declare class ARCoachingOverlayView extends UIView {
  delegate: ARCoachingOverlayViewDelegate;

  sessionProvider: NSObject;

  session: ARSession;

  goal: interop.Enum<typeof ARCoachingGoal>;

  activatesAutomatically: boolean;

  readonly isActive: boolean;

  setActiveAnimated(active: boolean, animated: boolean): void;

  setDelegate(delegate: ARCoachingOverlayViewDelegate | null): void;

  setSessionProvider(sessionProvider: NSObject | null): void;

  setSession(session: ARSession | null): void;

  setGoal(goal: interop.Enum<typeof ARCoachingGoal>): void;

  setActivatesAutomatically(activatesAutomatically: boolean): void;
}

declare class ARSKView extends SKView implements ARSessionProviding {
  delegate: NSObject;

  session: ARSession;

  anchorForNode(node: SKNode): ARAnchor;

  nodeForAnchor(anchor: ARAnchor): SKNode;

  hitTestTypes(point: CGPoint, types: interop.Enum<typeof ARHitTestResultType>): NSArray;

  setDelegate(delegate: NSObject | null): void;

  setSession(session: ARSession): void;

  isEqual(object: interop.Object): boolean;

  readonly hash: number;

  readonly superclass: interop.Object;

  class(): interop.Object;

  self(): this;

  performSelector(aSelector: string): interop.Object;

  performSelectorWithObject(aSelector: string, object: interop.Object): interop.Object;

  performSelectorWithObjectWithObject(aSelector: string, object1: interop.Object, object2: interop.Object): interop.Object;

  readonly isProxy: boolean;

  isKindOfClass(aClass: interop.Object): boolean;

  isMemberOfClass(aClass: interop.Object): boolean;

  conformsToProtocol(aProtocol: interop.PointerConvertible): boolean;

  respondsToSelector(aSelector: string): boolean;

  retain(): this;

  release(): void;

  autorelease(): this;

  retainCount(): number;

  readonly zone: interop.Pointer;

  readonly description: string;

  readonly debugDescription: string;
}

declare class ARBodyAnchor extends ARAnchor implements ARTrackable {
  readonly skeleton: ARSkeleton3D;

  readonly estimatedScaleFactor: number;

  readonly isTracked: boolean;

  isEqual(object: interop.Object): boolean;

  readonly hash: number;

  readonly superclass: interop.Object;

  class(): interop.Object;

  self(): this;

  performSelector(aSelector: string): interop.Object;

  performSelectorWithObject(aSelector: string, object: interop.Object): interop.Object;

  performSelectorWithObjectWithObject(aSelector: string, object1: interop.Object, object2: interop.Object): interop.Object;

  readonly isProxy: boolean;

  isKindOfClass(aClass: interop.Object): boolean;

  isMemberOfClass(aClass: interop.Object): boolean;

  conformsToProtocol(aProtocol: interop.PointerConvertible): boolean;

  respondsToSelector(aSelector: string): boolean;

  retain(): this;

  release(): void;

  autorelease(): this;

  retainCount(): number;

  readonly zone: interop.Pointer;

  readonly description: string;

  readonly debugDescription: string;
}

declare class ARBody2D extends NSObject {
  readonly skeleton: ARSkeleton2D;
}

declare class ARSkeletonDefinition extends NSObject {
  static readonly defaultBody3DSkeletonDefinition: ARSkeletonDefinition;

  static readonly defaultBody2DSkeletonDefinition: ARSkeletonDefinition;

  readonly jointCount: number;

  readonly jointNames: NSArray;

  readonly parentIndices: NSArray;

  readonly neutralBodySkeleton3D: ARSkeleton3D;

  indexForJointName(jointName: string): number;
}

declare class ARAppClipCodeAnchor extends ARAnchor implements ARTrackable {
  readonly url: NSURL;

  readonly urlDecodingState: interop.Enum<typeof ARAppClipCodeURLDecodingState>;

  readonly radius: number;

  readonly isTracked: boolean;

  isEqual(object: interop.Object): boolean;

  readonly hash: number;

  readonly superclass: interop.Object;

  class(): interop.Object;

  self(): this;

  performSelector(aSelector: string): interop.Object;

  performSelectorWithObject(aSelector: string, object: interop.Object): interop.Object;

  performSelectorWithObjectWithObject(aSelector: string, object1: interop.Object, object2: interop.Object): interop.Object;

  readonly isProxy: boolean;

  isKindOfClass(aClass: interop.Object): boolean;

  isMemberOfClass(aClass: interop.Object): boolean;

  conformsToProtocol(aProtocol: interop.PointerConvertible): boolean;

  respondsToSelector(aSelector: string): boolean;

  retain(): this;

  release(): void;

  autorelease(): this;

  retainCount(): number;

  readonly zone: interop.Pointer;

  readonly description: string;

  readonly debugDescription: string;
}

declare class ARPlaneGeometry extends NSObject implements NSSecureCoding {
  readonly vertexCount: number;

  readonly vertices: interop.Pointer;

  readonly textureCoordinateCount: number;

  readonly textureCoordinates: interop.Pointer;

  readonly triangleCount: number;

  readonly triangleIndices: interop.Pointer;

  readonly boundaryVertexCount: number;

  readonly boundaryVertices: interop.Pointer;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class ARPlaneAnchor extends ARAnchor {
  static readonly classificationSupported: boolean;

  readonly alignment: interop.Enum<typeof ARPlaneAnchorAlignment>;

  readonly center: unknown /* ext vector */;

  readonly extent: unknown /* ext vector */;

  readonly planeExtent: ARPlaneExtent;

  readonly geometry: ARPlaneGeometry;

  readonly classificationStatus: interop.Enum<typeof ARPlaneClassificationStatus>;

  readonly classification: interop.Enum<typeof ARPlaneClassification>;

  static isClassificationSupported(): boolean;
}

declare class ARPlaneExtent extends NSObject implements NSSecureCoding {
  readonly rotationOnYAxis: number;

  readonly width: number;

  readonly height: number;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class ARParticipantAnchor extends ARAnchor {
}

declare class ARObjectAnchor extends ARAnchor {
  readonly referenceObject: ARReferenceObject;
}

declare class ARGeometrySource extends NSObject implements NSSecureCoding {
  readonly buffer: MTLBuffer;

  readonly count: number;

  readonly format: interop.Enum<typeof MTLVertexFormat>;

  readonly componentsPerVector: number;

  readonly offset: number;

  readonly stride: number;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class ARMeshAnchor extends ARAnchor {
  readonly geometry: ARMeshGeometry;
}

declare class ARFaceGeometry extends NSObject implements NSSecureCoding, NSCopying {
  readonly vertexCount: number;

  readonly vertices: interop.Pointer;

  readonly textureCoordinateCount: number;

  readonly textureCoordinates: interop.Pointer;

  readonly triangleCount: number;

  readonly triangleIndices: interop.Pointer;

  initWithBlendShapes(blendShapes: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>): this;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class AREnvironmentProbeAnchor extends ARAnchor {
  readonly environmentTexture: MTLTexture;

  readonly extent: unknown /* ext vector */;

  initWithTransformExtent(transform: simd_float4x4, extent: unknown /* ext vector */): this;

  initWithNameTransformExtent(name: string, transform: simd_float4x4, extent: unknown /* ext vector */): this;
}

declare class ARReferenceObject extends NSObject implements NSSecureCoding {
  name: string;

  readonly center: unknown /* ext vector */;

  readonly extent: unknown /* ext vector */;

  readonly scale: unknown /* ext vector */;

  readonly resourceGroupName: string;

  readonly rawFeaturePoints: ARPointCloud;

  static referenceObjectsInGroupNamedBundle(name: string, bundle: NSBundle | null): NSSet;

  initWithArchiveURLError(url: NSURL, error: interop.PointerConvertible): this;

  exportObjectToURLPreviewImageError(url: NSURL, previewImage: UIImage | null, error: interop.PointerConvertible): boolean;

  referenceObjectByApplyingTransform(transform: simd_float4x4): ARReferenceObject;

  referenceObjectByMergingObjectError(object: ARReferenceObject, error: interop.PointerConvertible): ARReferenceObject;

  setName(name: string | null): void;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class ARReferenceImage extends NSObject {
  name: string;

  readonly physicalSize: CGSize;

  readonly resourceGroupName: string;

  validateWithCompletionHandler(completionHandler: (p1: NSError) => void | null): void;

  initWithCGImageOrientationPhysicalWidth(image: interop.Object, orientation: interop.Enum<typeof CGImagePropertyOrientation>, physicalWidth: number): this;

  initWithPixelBufferOrientationPhysicalWidth(pixelBuffer: interop.Object, orientation: interop.Enum<typeof CGImagePropertyOrientation>, physicalWidth: number): this;

  static referenceImagesInGroupNamedBundle(name: string, bundle: NSBundle | null): NSSet;

  setName(name: string | null): void;
}

declare class ARRaycastResult extends NSObject {
  readonly worldTransform: simd_float4x4;

  readonly target: interop.Enum<typeof ARRaycastTarget>;

  readonly targetAlignment: interop.Enum<typeof ARRaycastTargetAlignment>;

  readonly anchor: ARAnchor;
}

declare class ARPointCloud extends NSObject implements NSSecureCoding {
  readonly count: number;

  readonly points: interop.Pointer;

  readonly identifiers: interop.Pointer;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class ARDirectionalLightEstimate extends ARLightEstimate {
  readonly sphericalHarmonicsCoefficients: NSData;

  readonly primaryLightDirection: unknown /* ext vector */;

  readonly primaryLightIntensity: number;
}

declare class ARFrame extends NSObject implements NSCopying {
  readonly timestamp: number;

  readonly capturedImage: interop.Object;

  readonly exifData: NSDictionary;

  readonly cameraGrainTexture: MTLTexture;

  readonly cameraGrainIntensity: number;

  readonly capturedDepthData: AVDepthData;

  readonly capturedDepthDataTimestamp: number;

  readonly camera: ARCamera;

  readonly anchors: NSArray;

  readonly lightEstimate: ARLightEstimate;

  readonly rawFeaturePoints: ARPointCloud;

  readonly worldMappingStatus: interop.Enum<typeof ARWorldMappingStatus>;

  readonly segmentationBuffer: interop.Object;

  readonly estimatedDepthData: interop.Object;

  readonly detectedBody: ARBody2D;

  readonly geoTrackingStatus: ARGeoTrackingStatus;

  readonly sceneDepth: ARDepthData;

  readonly smoothedSceneDepth: ARDepthData;

  hitTestTypes(point: CGPoint, types: interop.Enum<typeof ARHitTestResultType>): NSArray;

  raycastQueryFromPointAllowingTargetAlignment(point: CGPoint, target: interop.Enum<typeof ARRaycastTarget>, alignment: interop.Enum<typeof ARRaycastTargetAlignment>): ARRaycastQuery;

  displayTransformForOrientationViewportSize(orientation: interop.Enum<typeof UIInterfaceOrientation>, viewportSize: CGSize): CGAffineTransform;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class ARRaycastQuery extends NSObject {
  readonly origin: unknown /* ext vector */;

  readonly direction: unknown /* ext vector */;

  readonly target: interop.Enum<typeof ARRaycastTarget>;

  readonly targetAlignment: interop.Enum<typeof ARRaycastTargetAlignment>;

  initWithOriginDirectionAllowingTargetAlignment(origin: unknown /* ext vector */, direction: unknown /* ext vector */, target: interop.Enum<typeof ARRaycastTarget>, alignment: interop.Enum<typeof ARRaycastTargetAlignment>): this;
}

declare class ARHitTestResult extends NSObject {
  readonly type: interop.Enum<typeof ARHitTestResultType>;

  readonly distance: number;

  readonly localTransform: simd_float4x4;

  readonly worldTransform: simd_float4x4;

  readonly anchor: ARAnchor;
}

declare class ARSession extends NSObject {
  readonly identifier: NSUUID;

  delegate: ARSessionDelegate;

  delegateQueue: NSObject;

  readonly currentFrame: ARFrame;

  readonly configuration: ARConfiguration;

  runWithConfiguration(configuration: ARConfiguration): void;

  runWithConfigurationOptions(configuration: ARConfiguration, options: interop.Enum<typeof ARSessionRunOptions>): void;

  pause(): void;

  addAnchor(anchor: ARAnchor): void;

  removeAnchor(anchor: ARAnchor): void;

  setWorldOrigin(relativeTransform: simd_float4x4): void;

  getCurrentWorldMapWithCompletionHandler(completionHandler: (p1: ARWorldMap, p2: NSError) => void | null): void;

  createReferenceObjectWithTransformCenterExtentCompletionHandler(transform: simd_float4x4, center: unknown /* ext vector */, extent: unknown /* ext vector */, completionHandler: (p1: ARReferenceObject, p2: NSError) => void | null): void;

  raycast(query: ARRaycastQuery): NSArray;

  trackedRaycastUpdateHandler(query: ARRaycastQuery, updateHandler: (p1: NSArray<interop.Object> | Array<interop.Object>) => void): ARTrackedRaycast;

  updateWithCollaborationData(collaborationData: ARCollaborationData): void;

  getGeoLocationForPointCompletionHandler(position: unknown /* ext vector */, completionHandler: (p1: CLLocationCoordinate2D, p2: number, p3: NSError) => void | null): void;

  captureHighResolutionFrameWithCompletion(completion: (p1: ARFrame, p2: NSError) => void | null): void;

  setDelegate(delegate: ARSessionDelegate | null): void;

  setDelegateQueue(delegateQueue: NSObject | null): void;
}

declare class ARGeoTrackingStatus extends NSObject implements NSCopying, NSSecureCoding {
  readonly state: interop.Enum<typeof ARGeoTrackingState>;

  readonly accuracy: interop.Enum<typeof ARGeoTrackingAccuracy>;

  readonly stateReason: interop.Enum<typeof ARGeoTrackingStateReason>;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class ARBodyTrackingConfiguration extends ARConfiguration {
  autoFocusEnabled: boolean;

  initialWorldMap: ARWorldMap;

  environmentTexturing: interop.Enum<typeof AREnvironmentTexturing>;

  wantsHDREnvironmentTextures: boolean;

  planeDetection: interop.Enum<typeof ARPlaneDetection>;

  detectionImages: NSSet;

  automaticImageScaleEstimationEnabled: boolean;

  automaticSkeletonScaleEstimationEnabled: boolean;

  maximumNumberOfTrackedImages: number;

  appClipCodeTrackingEnabled: boolean;

  static readonly supportsAppClipCodeTracking: boolean;

  init(): this;

  static new<This extends abstract new (...args: any) => any>(this: This): InstanceType<This>;

  isAutoFocusEnabled(): boolean;

  setAutoFocusEnabled(autoFocusEnabled: boolean): void;

  setInitialWorldMap(initialWorldMap: ARWorldMap | null): void;

  setEnvironmentTexturing(environmentTexturing: interop.Enum<typeof AREnvironmentTexturing>): void;

  setWantsHDREnvironmentTextures(wantsHDREnvironmentTextures: boolean): void;

  setPlaneDetection(planeDetection: interop.Enum<typeof ARPlaneDetection>): void;

  setDetectionImages(detectionImages: NSSet): void;

  setAutomaticImageScaleEstimationEnabled(automaticImageScaleEstimationEnabled: boolean): void;

  setAutomaticSkeletonScaleEstimationEnabled(automaticSkeletonScaleEstimationEnabled: boolean): void;

  setMaximumNumberOfTrackedImages(maximumNumberOfTrackedImages: number): void;

  setAppClipCodeTrackingEnabled(appClipCodeTrackingEnabled: boolean): void;
}

declare class ARConfiguration extends NSObject implements NSCopying {
  static readonly isSupported: boolean;

  static readonly supportedVideoFormats: NSArray;

  videoFormat: ARVideoFormat;

  worldAlignment: interop.Enum<typeof ARWorldAlignment>;

  lightEstimationEnabled: boolean;

  providesAudioData: boolean;

  frameSemantics: interop.Enum<typeof ARFrameSemantics>;

  static supportsFrameSemantics(frameSemantics: interop.Enum<typeof ARFrameSemantics>): boolean;

  static readonly configurableCaptureDeviceForPrimaryCamera: AVCaptureDevice;

  static readonly recommendedVideoFormatFor4KResolution: ARVideoFormat;

  static readonly recommendedVideoFormatForHighResolutionFrameCapturing: ARVideoFormat;

  videoHDRAllowed: boolean;

  setVideoFormat(videoFormat: ARVideoFormat): void;

  setWorldAlignment(worldAlignment: interop.Enum<typeof ARWorldAlignment>): void;

  isLightEstimationEnabled(): boolean;

  setLightEstimationEnabled(lightEstimationEnabled: boolean): void;

  setProvidesAudioData(providesAudioData: boolean): void;

  setFrameSemantics(frameSemantics: interop.Enum<typeof ARFrameSemantics>): void;

  setVideoHDRAllowed(videoHDRAllowed: boolean): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class ARCamera extends NSObject implements NSCopying {
  readonly transform: simd_float4x4;

  readonly eulerAngles: unknown /* ext vector */;

  readonly trackingState: interop.Enum<typeof ARTrackingState>;

  readonly trackingStateReason: interop.Enum<typeof ARTrackingStateReason>;

  readonly intrinsics: simd_float3x3;

  readonly imageResolution: CGSize;

  readonly exposureDuration: number;

  readonly exposureOffset: number;

  readonly projectionMatrix: simd_float4x4;

  projectionMatrixForOrientationViewportSizeZNearZFar(orientation: interop.Enum<typeof UIInterfaceOrientation>, viewportSize: CGSize, zNear: number, zFar: number): simd_float4x4;

  projectPointOrientationViewportSize(point: unknown /* ext vector */, orientation: interop.Enum<typeof UIInterfaceOrientation>, viewportSize: CGSize): CGPoint;

  unprojectPointOntoPlaneWithTransformOrientationViewportSize(point: CGPoint, planeTransform: simd_float4x4, orientation: interop.Enum<typeof UIInterfaceOrientation>, viewportSize: CGSize): unknown /* ext vector */;

  viewMatrixForOrientation(orientation: interop.Enum<typeof UIInterfaceOrientation>): simd_float4x4;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class ARDepthData extends NSObject {
  readonly depthMap: interop.Object;

  readonly confidenceMap: interop.Object;
}

declare class ARFaceAnchor extends ARAnchor implements ARTrackable {
  readonly geometry: ARFaceGeometry;

  readonly leftEyeTransform: simd_float4x4;

  readonly rightEyeTransform: simd_float4x4;

  readonly lookAtPoint: unknown /* ext vector */;

  readonly blendShapes: NSDictionary;

  readonly isTracked: boolean;

  isEqual(object: interop.Object): boolean;

  readonly hash: number;

  readonly superclass: interop.Object;

  class(): interop.Object;

  self(): this;

  performSelector(aSelector: string): interop.Object;

  performSelectorWithObject(aSelector: string, object: interop.Object): interop.Object;

  performSelectorWithObjectWithObject(aSelector: string, object1: interop.Object, object2: interop.Object): interop.Object;

  readonly isProxy: boolean;

  isKindOfClass(aClass: interop.Object): boolean;

  isMemberOfClass(aClass: interop.Object): boolean;

  conformsToProtocol(aProtocol: interop.PointerConvertible): boolean;

  respondsToSelector(aSelector: string): boolean;

  retain(): this;

  release(): void;

  autorelease(): this;

  retainCount(): number;

  readonly zone: interop.Pointer;

  readonly description: string;

  readonly debugDescription: string;
}

declare class ARCollaborationData extends NSObject implements NSSecureCoding {
  readonly priority: interop.Enum<typeof ARCollaborationDataPriority>;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class ARGeoAnchor extends ARAnchor implements ARTrackable {
  readonly coordinate: CLLocationCoordinate2D;

  readonly altitude: number;

  readonly altitudeSource: interop.Enum<typeof ARAltitudeSource>;

  initWithCoordinate(coordinate: CLLocationCoordinate2D): this;

  initWithCoordinateAltitude(coordinate: CLLocationCoordinate2D, altitude: number): this;

  initWithNameCoordinate(name: string, coordinate: CLLocationCoordinate2D): this;

  initWithNameCoordinateAltitude(name: string, coordinate: CLLocationCoordinate2D, altitude: number): this;

  readonly isTracked: boolean;

  isEqual(object: interop.Object): boolean;

  readonly hash: number;

  readonly superclass: interop.Object;

  class(): interop.Object;

  self(): this;

  performSelector(aSelector: string): interop.Object;

  performSelectorWithObject(aSelector: string, object: interop.Object): interop.Object;

  performSelectorWithObjectWithObject(aSelector: string, object1: interop.Object, object2: interop.Object): interop.Object;

  readonly isProxy: boolean;

  isKindOfClass(aClass: interop.Object): boolean;

  isMemberOfClass(aClass: interop.Object): boolean;

  conformsToProtocol(aProtocol: interop.PointerConvertible): boolean;

  respondsToSelector(aSelector: string): boolean;

  retain(): this;

  release(): void;

  autorelease(): this;

  retainCount(): number;

  readonly zone: interop.Pointer;

  readonly description: string;

  readonly debugDescription: string;
}

declare class ARMeshGeometry extends NSObject implements NSSecureCoding {
  readonly vertices: ARGeometrySource;

  readonly normals: ARGeometrySource;

  readonly faces: ARGeometryElement;

  readonly classification: ARGeometrySource;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class ARVideoFormat extends NSObject implements NSCopying {
  readonly captureDevicePosition: interop.Enum<typeof AVCaptureDevicePosition>;

  readonly captureDeviceType: string;

  readonly imageResolution: CGSize;

  readonly framesPerSecond: number;

  readonly isRecommendedForHighResolutionFrameCapturing: boolean;

  readonly videoHDRSupported: boolean;

  isVideoHDRSupported(): boolean;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class ARSkeleton2D extends ARSkeleton {
  readonly jointLandmarks: interop.Pointer;

  landmarkForJointNamed(jointName: string): unknown /* ext vector */;
}

// @ts-ignore ClassDecl.tsIgnore
declare class ARSCNView extends SCNView implements ARSessionProviding {
  // @ts-ignore MemberDecl.tsIgnore
  delegate: ARSCNViewDelegate;

  session: ARSession;

  scene: SCNScene;

  automaticallyUpdatesLighting: boolean;

  rendersCameraGrain: boolean;

  rendersMotionBlur: boolean;

  anchorForNode(node: SCNNode): ARAnchor;

  nodeForAnchor(anchor: ARAnchor): SCNNode;

  hitTestTypes(point: CGPoint, types: interop.Enum<typeof ARHitTestResultType>): NSArray;

  unprojectPointOntoPlaneWithTransform(point: CGPoint, planeTransform: simd_float4x4): unknown /* ext vector */;

  raycastQueryFromPointAllowingTargetAlignment(point: CGPoint, target: interop.Enum<typeof ARRaycastTarget>, alignment: interop.Enum<typeof ARRaycastTargetAlignment>): ARRaycastQuery;

  // @ts-ignore MemberDecl.tsIgnore
  setDelegate(delegate: ARSCNViewDelegate | null): void;

  setSession(session: ARSession): void;

  // @ts-ignore MemberDecl.tsIgnore
  setScene(scene: SCNScene): void;

  setAutomaticallyUpdatesLighting(automaticallyUpdatesLighting: boolean): void;

  setRendersCameraGrain(rendersCameraGrain: boolean): void;

  setRendersMotionBlur(rendersMotionBlur: boolean): void;

  isEqual(object: interop.Object): boolean;

  readonly hash: number;

  readonly superclass: interop.Object;

  class(): interop.Object;

  self(): this;

  performSelector(aSelector: string): interop.Object;

  performSelectorWithObject(aSelector: string, object: interop.Object): interop.Object;

  performSelectorWithObjectWithObject(aSelector: string, object1: interop.Object, object2: interop.Object): interop.Object;

  readonly isProxy: boolean;

  isKindOfClass(aClass: interop.Object): boolean;

  isMemberOfClass(aClass: interop.Object): boolean;

  conformsToProtocol(aProtocol: interop.PointerConvertible): boolean;

  respondsToSelector(aSelector: string): boolean;

  retain(): this;

  release(): void;

  autorelease(): this;

  retainCount(): number;

  readonly zone: interop.Pointer;

  readonly description: string;

  readonly debugDescription: string;
}

declare class ARObjectScanningConfiguration extends ARConfiguration {
  autoFocusEnabled: boolean;

  planeDetection: interop.Enum<typeof ARPlaneDetection>;

  init(): this;

  static new<This extends abstract new (...args: any) => any>(this: This): InstanceType<This>;

  isAutoFocusEnabled(): boolean;

  setAutoFocusEnabled(autoFocusEnabled: boolean): void;

  setPlaneDetection(planeDetection: interop.Enum<typeof ARPlaneDetection>): void;
}

declare class ARImageAnchor extends ARAnchor implements ARTrackable {
  readonly referenceImage: ARReferenceImage;

  readonly estimatedScaleFactor: number;

  readonly isTracked: boolean;

  isEqual(object: interop.Object): boolean;

  readonly hash: number;

  readonly superclass: interop.Object;

  class(): interop.Object;

  self(): this;

  performSelector(aSelector: string): interop.Object;

  performSelectorWithObject(aSelector: string, object: interop.Object): interop.Object;

  performSelectorWithObjectWithObject(aSelector: string, object1: interop.Object, object2: interop.Object): interop.Object;

  readonly isProxy: boolean;

  isKindOfClass(aClass: interop.Object): boolean;

  isMemberOfClass(aClass: interop.Object): boolean;

  conformsToProtocol(aProtocol: interop.PointerConvertible): boolean;

  respondsToSelector(aSelector: string): boolean;

  retain(): this;

  release(): void;

  autorelease(): this;

  retainCount(): number;

  readonly zone: interop.Pointer;

  readonly description: string;

  readonly debugDescription: string;
}

declare class ARPositionalTrackingConfiguration extends ARConfiguration {
  planeDetection: interop.Enum<typeof ARPlaneDetection>;

  initialWorldMap: ARWorldMap;

  init(): this;

  static new<This extends abstract new (...args: any) => any>(this: This): InstanceType<This>;

  setPlaneDetection(planeDetection: interop.Enum<typeof ARPlaneDetection>): void;

  setInitialWorldMap(initialWorldMap: ARWorldMap | null): void;
}

declare class ARTrackedRaycast extends NSObject {
  stopTracking(): void;
}

declare class ARFaceTrackingConfiguration extends ARConfiguration {
  static readonly supportedNumberOfTrackedFaces: number;

  maximumNumberOfTrackedFaces: number;

  static readonly supportsWorldTracking: boolean;

  worldTrackingEnabled: boolean;

  init(): this;

  static new<This extends abstract new (...args: any) => any>(this: This): InstanceType<This>;

  setMaximumNumberOfTrackedFaces(maximumNumberOfTrackedFaces: number): void;

  isWorldTrackingEnabled(): boolean;

  setWorldTrackingEnabled(worldTrackingEnabled: boolean): void;
}

declare class ARImageTrackingConfiguration extends ARConfiguration {
  autoFocusEnabled: boolean;

  trackingImages: NSSet;

  maximumNumberOfTrackedImages: number;

  init(): this;

  static new<This extends abstract new (...args: any) => any>(this: This): InstanceType<This>;

  isAutoFocusEnabled(): boolean;

  setAutoFocusEnabled(autoFocusEnabled: boolean): void;

  setTrackingImages(trackingImages: NSSet): void;

  setMaximumNumberOfTrackedImages(maximumNumberOfTrackedImages: number): void;
}

declare class ARSCNPlaneGeometry extends SCNGeometry {
  static planeGeometryWithDevice<This extends abstract new (...args: any) => any>(this: This, device: MTLDevice): InstanceType<This>;

  updateFromPlaneGeometry(planeGeometry: ARPlaneGeometry): void;
}

declare class ARGeometryElement extends NSObject implements NSSecureCoding {
  readonly buffer: MTLBuffer;

  readonly count: number;

  readonly bytesPerIndex: number;

  readonly indexCountPerPrimitive: number;

  readonly primitiveType: interop.Enum<typeof ARGeometryPrimitiveType>;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class ARSkeleton3D extends ARSkeleton {
  readonly jointModelTransforms: interop.Pointer;

  readonly jointLocalTransforms: interop.Pointer;

  modelTransformForJointName(jointName: string): simd_float4x4;

  localTransformForJointName(jointName: string): simd_float4x4;
}

declare class ARWorldMap extends NSObject implements NSCopying, NSSecureCoding {
  readonly center: unknown /* ext vector */;

  readonly extent: unknown /* ext vector */;

  get anchors(): NSArray;
  set anchors(value: NSArray<interop.Object> | Array<interop.Object>);

  readonly rawFeaturePoints: ARPointCloud;

  setAnchors(anchors: NSArray<interop.Object> | Array<interop.Object>): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class ARSCNFaceGeometry extends SCNGeometry {
  static faceGeometryWithDevice<This extends abstract new (...args: any) => any>(this: This, device: MTLDevice): InstanceType<This>;

  static faceGeometryWithDeviceFillMesh<This extends abstract new (...args: any) => any>(this: This, device: MTLDevice, fillMesh: boolean): InstanceType<This>;

  updateFromFaceGeometry(faceGeometry: ARFaceGeometry): void;
}

declare class ARGeoTrackingConfiguration extends ARConfiguration {
  environmentTexturing: interop.Enum<typeof AREnvironmentTexturing>;

  wantsHDREnvironmentTextures: boolean;

  planeDetection: interop.Enum<typeof ARPlaneDetection>;

  detectionImages: NSSet;

  automaticImageScaleEstimationEnabled: boolean;

  maximumNumberOfTrackedImages: number;

  detectionObjects: NSSet;

  appClipCodeTrackingEnabled: boolean;

  static readonly supportsAppClipCodeTracking: boolean;

  static checkAvailabilityWithCompletionHandler(completionHandler: (p1: boolean, p2: NSError) => void | null): void;

  static checkAvailabilityAtCoordinateCompletionHandler(coordinate: CLLocationCoordinate2D, completionHandler: (p1: boolean, p2: NSError) => void | null): void;

  init(): this;

  static new<This extends abstract new (...args: any) => any>(this: This): InstanceType<This>;

  setEnvironmentTexturing(environmentTexturing: interop.Enum<typeof AREnvironmentTexturing>): void;

  setWantsHDREnvironmentTextures(wantsHDREnvironmentTextures: boolean): void;

  setPlaneDetection(planeDetection: interop.Enum<typeof ARPlaneDetection>): void;

  setDetectionImages(detectionImages: NSSet | null): void;

  setAutomaticImageScaleEstimationEnabled(automaticImageScaleEstimationEnabled: boolean): void;

  setMaximumNumberOfTrackedImages(maximumNumberOfTrackedImages: number): void;

  setDetectionObjects(detectionObjects: NSSet): void;

  setAppClipCodeTrackingEnabled(appClipCodeTrackingEnabled: boolean): void;
}

declare class AROrientationTrackingConfiguration extends ARConfiguration {
  autoFocusEnabled: boolean;

  init(): this;

  static new<This extends abstract new (...args: any) => any>(this: This): InstanceType<This>;

  isAutoFocusEnabled(): boolean;

  setAutoFocusEnabled(autoFocusEnabled: boolean): void;
}

declare class ARAnchor extends NSObject implements ARAnchorCopying, NSSecureCoding {
  readonly identifier: NSUUID;

  readonly name: string;

  readonly sessionIdentifier: NSUUID;

  readonly transform: simd_float4x4;

  initWithTransform(transform: simd_float4x4): this;

  initWithNameTransform(name: string, transform: simd_float4x4): this;

  initWithAnchor(anchor: ARAnchor): this;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class ARQuickLookPreviewItem extends NSObject implements QLPreviewItem {
  initWithFileAtURL(url: NSURL): this;

  canonicalWebPageURL: NSURL;

  allowsContentScaling: boolean;

  setCanonicalWebPageURL(canonicalWebPageURL: NSURL | null): void;

  setAllowsContentScaling(allowsContentScaling: boolean): void;

  readonly previewItemURL: NSURL;

  readonly previewItemTitle: string;

  isEqual(object: interop.Object): boolean;

  readonly hash: number;

  readonly superclass: interop.Object;

  class(): interop.Object;

  self(): this;

  performSelector(aSelector: string): interop.Object;

  performSelectorWithObject(aSelector: string, object: interop.Object): interop.Object;

  performSelectorWithObjectWithObject(aSelector: string, object1: interop.Object, object2: interop.Object): interop.Object;

  readonly isProxy: boolean;

  isKindOfClass(aClass: interop.Object): boolean;

  isMemberOfClass(aClass: interop.Object): boolean;

  conformsToProtocol(aProtocol: interop.PointerConvertible): boolean;

  respondsToSelector(aSelector: string): boolean;

  retain(): this;

  release(): void;

  autorelease(): this;

  retainCount(): number;

  readonly zone: interop.Pointer;

  readonly description: string;

  readonly debugDescription: string;
}

declare class ARSkeleton extends NSObject {
  readonly definition: ARSkeletonDefinition;

  readonly jointCount: number;

  isJointTracked(jointIndex: number): boolean;
}

