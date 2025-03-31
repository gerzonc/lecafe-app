import colors from "@/constants/colors";
import { store$ } from "@/store";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { observer } from "@legendapp/state/react";
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

export default observer(function Header() {
  const navigation = useNavigation();
  const progress = useDrawerProgress();
  const isFullscreen$ = store$.isFullscreen.get();
  const animatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(progress.value, [0, 0.4], [1, 0]);
    const scale = interpolate(progress.value, [0, 0.4], [1, 0.9]);
    return {
      opacity,
      transform: [{ scale }]
    };
  });

  const handleOpenDrawer = () => {
    if (isFullscreen$) {
      store$.isFullscreen.set(false);
    } else {
      navigation.dispatch(DrawerActions.openDrawer());
    }
  };

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Pressable onPress={handleOpenDrawer}>
        {isFullscreen$ ? (
          <MaterialIcons name="close" size={28} color={colors.white} />
        ) : (
          <MenuIcon />
        )}
      </Pressable>
      <Pressable onPress={() => {}}>
        {isFullscreen$ ? (
          <MaterialCommunityIcons
            name="dots-vertical"
            size={28}
            color={colors.white}
          />
        ) : (
          <FilterIcon />
        )}
      </Pressable>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
});
