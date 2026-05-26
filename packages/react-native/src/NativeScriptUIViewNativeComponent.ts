import type {HostComponent, ViewProps} from 'react-native';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';

export interface NativeProps extends ViewProps {
  nativeViewHandle?: string;
  debugName?: string;
}

export default codegenNativeComponent<NativeProps>(
  'NativeScriptUIView',
) as HostComponent<NativeProps>;
