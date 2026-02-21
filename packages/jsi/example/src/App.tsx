import { Text, View, StyleSheet, Button } from 'react-native';
import { multiply, nativescript_init } from 'nativescript-jsi';

const result = multiply(3, 7);

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>
      <Button
        title="Init NativeScript"
        onPress={() => {
          try {
            nativescript_init('abc');
          } catch (error) {
            console.log('Error initialising NativeScript:', error);
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
