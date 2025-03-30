import { Card } from "@/components";
import colors from "@/constants/colors";
import data from "@/services/data";
import { useDrawerProgress } from "@react-navigation/drawer";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions, StyleSheet } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle
} from "react-native-reanimated";

const { width: wWidth, height: wHeight } = Dimensions.get("window");

export default function App() {
  const progress = useDrawerProgress();
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: interpolate(progress.value, [0, 1], [1, 0.8]) },
      { translateX: interpolate(progress.value, [0, 1], [0, -45]) }
    ],
    borderRadius: interpolate(progress.value, [0, 1], [0, 30])
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <LinearGradient
        colors={colors.dateGradient}
        start={{ x: 0.4906, y: 1 }}
        end={{ x: 0.5094, y: 0 }}
        style={styles.gradient}
      />
      <Image
        source={require("../assets/images/ui/background-overlay.svg")}
        contentFit="contain"
        style={{ position: "absolute", width: wWidth, height: wHeight }}
      />
      {data.map((item, index) => <Card item={item} index={index} />).reverse()}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    paddingHorizontal: 16
  },
  gradient: {
    position: "absolute",
    width: wWidth,
    height: wHeight
  }
});
