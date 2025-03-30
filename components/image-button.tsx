import { Image, type ImageSource } from "expo-image";
import { StyleSheet, View } from "react-native";
import { Pressable, type PressableProps } from "react-native-gesture-handler";
import { Text } from ".";

type TImage = "date" | "friendship" | "relationship";

interface Item {
  title: string;
  image: ImageSource;
  type: TImage;
}

interface Props extends PressableProps {
  item: Item;
}

export default function ImageButton({ item, onPress }: Props) {
  const height = item.type === "date" ? 32 : 52;
  const width = item.type === "date" ? 24 : 52;

  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={item.image} style={{ height, width }} />
        </View>
        <Text
          fontFamily="maven-pro"
          weight="bold"
          style={styles.text}
          adjustsFontSizeToFit
          numberOfLines={1}
        >
          {item.title}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center"
  },
  imageContainer: {
    backgroundColor: "rgba(255, 255, 255, 1)",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 120,
    height: 52,
    width: 52
  },
  text: {
    paddingTop: 4,
    lineHeight: 19
  }
});
