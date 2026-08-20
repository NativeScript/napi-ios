import type {HostComponent, ViewProps} from 'react-native';
import type {
  DirectEventHandler,
  Int32,
} from 'react-native/Libraries/Types/CodegenTypes';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';

export type HostReadyEvent = {
  hostReadyId: string;
  hostId: string;
  nativeViewHandle: string;
  childrenViewHandle: string;
  controllerHandle: string;
  hasChildren: boolean;
};

export interface NativeProps extends ViewProps {
  hostId?: string;
  hostReadyId?: string;
  nativeViewHandle?: string;
  childrenViewHandle?: string;
  controllerHandle?: string;
  detachControllerView?: boolean;
  debugName?: string;
  updateRevision?: Int32;
  mountedRevision?: Int32;
  onHostReady?: DirectEventHandler<HostReadyEvent>;
}

export default codegenNativeComponent<NativeProps>(
  'NativeScriptUIView',
) as HostComponent<NativeProps>;
