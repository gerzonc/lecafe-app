import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import {
  type GestureResponderEvent,
  Pressable,
  StyleSheet,
  type ViewStyle,
  type StyleProp
} from "react-native";

type IconFamily = "MaterialIcons" | "FontAwesome";

interface IconButtonProps {
  onPress?: (event: GestureResponderEvent) => void;
  family: IconFamily;
  name: keyof typeof FontAwesome.glyphMap | keyof typeof MaterialIcons.glyphMap;
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
}

const iconComponents = {
  MaterialIcons,
  FontAwesome
};

export default function IconButton({
  onPress,
  family,
  name,
  size = 24,
  color = "black",
  style
}: IconButtonProps) {
  const Icon = family === "MaterialIcons" ? MaterialIcons : FontAwesome;
  return (
    <Pressable onPress={onPress} style={[styles.button, style]}>
      <Icon
        name={name as keyof typeof Icon.glyphMap}
        size={size}
        color={color}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center"
  }
});
