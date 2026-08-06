import type {HostComponent, ViewProps} from 'react-native';
import type {
  Double,
  DirectEventHandler,
  Int32,
} from 'react-native/Libraries/Types/CodegenTypes';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';

export type HostReadyEvent = {
  hostReadyId: string;
  hostId: string;
  componentViewHandle: string;
  nativeViewHandle: string;
  childrenViewHandle: string;
  controllerHandle: string;
  hasChildren: boolean;
  visibleDescendantCount: Int32;
  windowAttached: boolean;
};

export interface NativeProps extends ViewProps {
  hostId?: string;
  hostReadyId?: string;
  nativeViewHandle?: string;
  childrenViewHandle?: string;
  controllerHandle?: string;
  attachNativeView?: boolean;
  attachControllerToParent?: boolean;
  adoptHostViewAsControllerView?: boolean;
  collectChildren?: boolean;
  detachControllerFromParent?: boolean;
  detachControllerView?: boolean;
  disableDetachedChildrenTouchHandler?: boolean;
  disableUIKitHostWindowAttachRefresh?: boolean;
  emitOffWindowHostReady?: boolean;
  ignoreHostReadyWindowAttachment?: boolean;
  externalDetachedChildrenOwner?: boolean;
  fabricLifecycleCallbacks?: boolean;
  immediateTransactionCommit?: boolean;
  deferTransactionCommitOnRemovals?: boolean;
  mountChildrenDirectlyToChildrenView?: boolean;
  layoutDirectChildrenToChildrenViewBounds?: boolean;
  pinNativeViewToHost?: boolean;
  preserveDetachedChildrenLayout?: boolean;
  detachedChildrenContentOffsetX?: Double;
  detachedChildrenContentOffsetY?: Double;
  debugName?: string;
  uikitHostPropsJson?: string;
  uikitHostPropsRevision?: Int32;
  updateRevision?: Int32;
  mountedRevision?: Int32;
  onHostReady?: DirectEventHandler<HostReadyEvent>;
}

export default codegenNativeComponent<NativeProps>(
  'NativeScriptUIView',
) as HostComponent<NativeProps>;
