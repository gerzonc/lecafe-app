import { StyleSheet, View } from "react-native";
import { Text } from "react-native-gesture-handler";

export default function Card() {
  return (
    <View style={styles.container}>
      <Text>Some name</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  }
})
