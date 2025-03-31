import colors from "@/constants/colors";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Dimensions, Pressable, StyleSheet, View } from "react-native";

import Text from "./text";

const wHeight = Dimensions.get("screen").height;

type IconFamily = "MaterialIcons" | "FontAwesome";

interface Props {
  text: string;
  family?: IconFamily;
  iconName?:
    | keyof typeof MaterialCommunityIcons.glyphMap
    | keyof typeof MaterialIcons.glyphMap;
  customIcon?: React.ReactNode;
}

const MenuItem = ({ iconName, text, family, customIcon }: Props) => {
  const Icon =
    family === "MaterialIcons" ? MaterialIcons : MaterialCommunityIcons;

  return (
    <Pressable style={styles.menuUserItem}>
      <View style={styles.menuItemContainer}>
        <View style={styles.menuItemIcon}>
          {customIcon ? (
            customIcon
          ) : (
            <Icon
              name={iconName as keyof typeof Icon.glyphMap}
              size={24}
              color={colors.white}
            />
          )}
        </View>
        <Text fontFamily="maven-pro" weight="bold">
          {text}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  menuUserItem: {
    height: wHeight < 700 ? "10%" : "auto",
    paddingHorizontal: 22,
    justifyContent: "center"
  },
  menuItemContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  menuItemIcon: {
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    marginRight: 4,
    borderRadius: 20
  }
});

export default MenuItem;
