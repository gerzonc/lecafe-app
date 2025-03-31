import { Card } from "@/components";
import { store$ } from "@/store";
import { observer } from "@legendapp/state/react";
import { useDrawerProgress } from "@react-navigation/drawer";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions, StyleSheet } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle
} from "react-native-reanimated";

const { width: wWidth, height: wHeight } = Dimensions.get("window");

const AnimatedGradient = Animated.createAnimatedComponent(LinearGradient);

export default observer(() => {
  const gradient$ = store$.currentGradient.get();
  const list$ = store$.list.get();
  const progress = useDrawerProgress();
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: interpolate(progress.value, [0, 1], [1, 0.8]) },
      { translateX: interpolate(progress.value, [0, 1], [0, -45]) }
    ],
    borderRadius: interpolate(progress.value, [0, 1], [0, 30])
  }));

  const handleRemove = (index: number) => {
    const filteredList = list$.filter((_, idx) => index !== idx);
    store$.list.set(filteredList);
  };

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <AnimatedGradient
        colors={gradient$.gradient}
        start={gradient$.start}
        end={gradient$.end}
        style={styles.gradient}
      />
      <Image
        source={require("../assets/images/ui/background-overlay.svg")}
        contentFit="contain"
        style={{ position: "absolute", width: wWidth, height: wHeight }}
      />
      {list$.map((item, index) => (
        <Card
          key={index.toString()}
          item={item}
          index={index}
          onSwipe={() => handleRemove(index)}
        />
      ))}
    </Animated.View>
  );
});

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
