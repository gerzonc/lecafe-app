import colors from "@/constants/colors";
import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";
import { Pressable, type PressableProps } from "react-native-gesture-handler";
import Text from "./text";

interface Props extends PressableProps {
  item: Section;
  active: boolean;
}

export default function ImageButton({ item, active, onPress }: Props) {
  const height = item.type === "date" ? 32 : 52;
  const width = item.type === "date" ? 24 : 52;

  return (
    <Pressable onPress={onPress}>
      <View style={[styles.container, { opacity: active ? 1 : 0.5 }]}>
        <View
          style={{
            borderWidth: active ? 1 : 0,
            borderColor: colors.pastelPink,
            borderRadius: 120
          }}
        >
          <View style={{ padding: 3 }}>
            <View style={styles.imageContainer}>
              <Image source={item.image} style={{ height, width }} />
            </View>
          </View>
        </View>
        <Text
          fontFamily="maven-pro"
          weight="bold"
          style={styles.text}
          adjustsFontSizeToFit
          numberOfLines={1}
        >
          {active ? item.title : ""}
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
