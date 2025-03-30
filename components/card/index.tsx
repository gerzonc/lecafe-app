import { useDrawerProgress } from "@react-navigation/drawer";
import { Image, type ImageSource } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions, StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  interpolate,
  useAnimatedStyle
} from "react-native-reanimated";

import { useState } from "react";
import ImageButton from "../image-button";

type TSection = "date" | "friendship" | "relationship";

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

const { width: wWidth, height: wHeight } = Dimensions.get("window");

const sections = [
  {
    title: "Amistad",
    type: "friendship",
    image: require("../../assets/images/ui/friendship.svg")
  },
  {
    title: "Citas",
    type: "date",
    image: require("../../assets/images/ui/dates.svg")
  },
  {
    title: "Relación",
    type: "relationship",
    image: require("../../assets/images/ui/relationship.svg")
  }
];

export default function Card({ item, index }: Props) {
  const drawerProgress = useDrawerProgress();
  const [section, setSection] = useState<TSection>("date");

  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(drawerProgress.value, [0, 1], [0.84, 1]);

    return {
      transform: [{ scale }]
    };
  });

  const gesture = Gesture.Pan()
    .onStart((event) => {
      console.log(event);
    })
    .onUpdate((event) => {})
    .onEnd(() => {});

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.container, animatedStyle]}>
        <LinearGradient
          // had to modify the colors of the gradient here since
          // using the same colors/locations as Figma is not producing the same
          // results on the app.
          colors={[
            "rgba(0,0,0,0.6)",
            "rgba(0,0,0,0.6)",
            "rgba(0,0,0,0)",
            "rgba(0,0,0,0)"
          ]}
          locations={[0.02, 1, 0.78, 0.15]}
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
          style={styles.gradient}
        >
          <View style={styles.sections}>
            <View style={styles.btnsContainer}>
              {sections.map((section, index) => (
                <ImageButton key={index.toString()} item={section} />
              ))}
            </View>
          </View>
        </LinearGradient>
        <Image source={item.image} style={styles.image} />
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    height: "100%",
    width: wWidth,
    overflow: "hidden",
    borderRadius: 30
  },
  btnsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  gradient: {
    position: "absolute",
    zIndex: 1,
    height: "100%",
    width: "100%"
  },
  sections: {
    paddingHorizontal: 16,
    paddingTop: 23,
    paddingBottom: 30
  },
  image: {
    position: "absolute",
    height: "100%",
    width: "100%"
  }
});
