import { useDrawerProgress } from "@react-navigation/drawer";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { Pressable } from "react-native-gesture-handler";
import Animated, {
  interpolate,
  useAnimatedStyle
} from "react-native-reanimated";
import FilterIcon from "./icons/filter";
import MenuIcon from "./icons/menu";

export default function Header() {
  const navigation = useNavigation();
  const progress = useDrawerProgress();
  const animatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(progress.value, [0, 0.4], [1, 0]);
    const scale = interpolate(progress.value, [0, 0.4], [1, 0.9]);
    return {
      opacity,
      transform: [{ scale }]
    };
  });

  const handleOpenDrawer = () =>
    navigation.dispatch(DrawerActions.openDrawer());

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Pressable onPress={handleOpenDrawer}>
        <MenuIcon />
      </Pressable>
      <Pressable onPress={() => {}}>
        <FilterIcon />
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
});
