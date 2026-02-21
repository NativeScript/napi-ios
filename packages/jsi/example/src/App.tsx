import { Text, View, StyleSheet, Button, Platform } from 'react-native';
import {
  getArch,
  getMainBundleResourcePath,
  multiply,
  nativescript_init,
} from 'nativescript-jsi';

const result = multiply(3, 7);

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>
      <Button
        title="Init NativeScript"
        onPress={() => {
          try {
            console.log('metadataFileName', getMetadataFileName());
            nativescript_init(
              `${getMainBundleResourcePath()}/${getMetadataFileName()}`
            );
          } catch (error) {
            console.log('Error initialising NativeScript:', error);
          }
        }}
      />
    </View>
  );
}

function getMetadataFileName() {
  if (Platform.OS === 'ios') {
    const { isDevice, supportedCpuArchitectures } = require('expo-device');

    const arch = supportedCpuArchitectures.some((arch: string) =>
      arch.toLowerCase().includes('arm64') ? 'arm64' : 'x84_64'
    );
    return `metadata.ios${isDevice ? '' : '-sim'}.${arch}.nsmd`;
  }

  if (Platform.OS === 'macos') {
    return `metadata.macos.${getArch()}.nsmd`;
  }

  throw new Error('This example only supports iOS and macOS.');
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
