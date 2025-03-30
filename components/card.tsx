import type { ImageSource } from "expo-image";
import { StyleSheet, View } from "react-native";
import { Text } from ".";

interface Item {
  name: string;
  lastName: string;
  age: number;
  location: string;
  image: ImageSource;
}

interface Props {
  item: Item;
  index: number;
}

export default function Card({ item, index }: Props) {
  return (
    <View style={styles.container}>
      <Text>
        {item.name} {item.lastName}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    alignItems: "center",
    height: "84%",
    width: "84%",
    backgroundColor: "red"
  }
});
