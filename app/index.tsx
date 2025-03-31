import { observer } from "@legendapp/state/react";
import { useDrawerProgress } from "@react-navigation/drawer";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
  interpolate,
  useAnimatedStyle
} from "react-native-reanimated";

import { Card, Header } from "@/components";
import colors from "@/constants/colors";
import { store$ } from "@/store";

const { width: wWidth, height: wHeight } = Dimensions.get("window");
const { width: sWidth, height: sHeight } = Dimensions.get("screen");

const AnimatedGradient = Animated.createAnimatedComponent(LinearGradient);

export default observer(() => {
  const gradient$ = store$.currentGradient.get();
  const list$ = store$.list.get();
  const progress = useDrawerProgress();
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: interpolate(progress.value, [0, 1], [1, 0.8]) },
      { translateX: interpolate(progress.value, [0, 1], [0, -34]) }
    ],
    borderRadius: interpolate(progress.value, [0, 1], [0, 30])
  }));

  const handleRemove = (index: number) => {
    const filteredList = list$.filter((_, idx) => index !== idx);
    store$.list.set(filteredList);
  };

  return (
    <>
      <LinearGradient
        colors={colors.relationship.gradient}
        start={colors.relationship.start}
        end={colors.relationship.end}
        style={{
          position: "absolute",
          width: sWidth,
          height: sHeight / 1.5,
          left: 0,
          opacity: 0.15,
          alignSelf: "center",
          borderRadius: 30,
          top: sHeight / 6
        }}
      />
      <Animated.View style={[styles.container, animatedStyle]}>
        <View style={styles.header}>
          <Header />
        </View>
        <AnimatedGradient
          colors={gradient$.gradient}
          start={gradient$.start}
          end={gradient$.end}
          style={styles.gradient}
        />
        <Image
          source={require("../assets/images/ui/background-overlay.svg")}
          contentFit="contain"
          style={styles.overlay}
        />
        {list$.map((item, index) => (
          <Animated.View
            key={index.toString()}
            layout={LinearTransition.springify()}
            entering={FadeIn.springify()}
            exiting={FadeOut.springify()}
            style={StyleSheet.absoluteFill}
          >
            <Card
              item={item}
              index={index}
              totalCards={list$.length}
              onSwipe={() => handleRemove(index)}
            />
          </Animated.View>
        ))}
      </Animated.View>
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    overflow: "hidden",
    zIndex: 1
  },
  gradient: {
    position: "absolute",
    width: wWidth,
    height: wHeight,
    borderRadius: 30
  },
  overlay: {
    position: "absolute",
    width: wWidth,
    height: wHeight
  },
  cards: {
    height: sHeight * 0.9,
    width: sWidth
  },
  header: {
    position: "absolute",
    top: 52,
    zIndex: 1
  }
});
