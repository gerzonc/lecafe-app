import { useDrawerProgress } from "@react-navigation/drawer";
import { Image, type ImageSource } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions, StyleSheet, View } from "react-native";
import {
  Gesture,
  GestureDetector,
  Pressable
} from "react-native-gesture-handler";
import Animated, {
  interpolate,
  useAnimatedStyle
} from "react-native-reanimated";

import colors from "@/constants/colors";
import { sections } from "@/services/data";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import ImageButton from "../image-button";
import Text from "../text";

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
  onSectionPress?: () => void;
}

const { width: wWidth, height: wHeight } = Dimensions.get("window");

const PROFILE_INFO_BTN = 32;
const BODY_PADDING_HORIZONTAL = 31;
const ACTION_BUTTON_SIZE = 58;

export default function Card({ item, onSectionPress, index }: Props) {
  const drawerProgress = useDrawerProgress();
  const [activeSection, setActiveSection] = useState<TSection>("date");

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
          // had to modify the colors/locations of the gradient here since
          // using them as in Figma does not produce the same
          // results on the app.
          colors={[
            "rgba(0,0,0,0.8)",
            "rgba(0,0,0,0.7)",
            "rgba(0,0,0,0)",
            "rgba(0,0,0,0)"
          ]}
          locations={[0.02, 1, 0.78, 0.35]}
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
          style={styles.gradient}
        >
          <View style={styles.sections}>
            <View style={styles.btnsContainer}>
              {sections.map((section, index) => (
                <ImageButton
                  key={index.toString()}
                  item={section}
                  active={activeSection === section.type}
                />
              ))}
            </View>
          </View>
          <View style={styles.body}>
            <View style={styles.basicInfo}>
              <View>
                <Text fontFamily="quicksand" fontSize={20} weight="bold">
                  {item.name}, {item.age}
                </Text>
                <Text fontFamily="maven-pro">{item.location}</Text>
              </View>
              <Pressable style={styles.profileInfoBtn}>
                <View>
                  <MaterialIcons
                    name="error-outline"
                    size={24}
                    color={colors.white}
                  />
                </View>
              </Pressable>
            </View>
            <View style={styles.btnsContainer}>
              <Pressable style={styles.dislikeBtn}>
                <View>
                  <MaterialIcons name="close" size={24} color={colors.white} />
                </View>
              </Pressable>
              <Pressable style={styles.superLikeBtn}>
                <View>
                  <FontAwesome
                    name="heart"
                    size={24}
                    color={colors.watermelonPink}
                  />
                </View>
              </Pressable>
              <Pressable style={styles.likeBtn}>
                <View>
                  <MaterialIcons name="check" size={24} color={colors.white} />
                </View>
              </Pressable>
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
  },
  body: {
    position: "absolute",
    bottom: 30,
    left: BODY_PADDING_HORIZONTAL,
    right: BODY_PADDING_HORIZONTAL
  },
  basicInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 24
  },
  profileInfoBtn: {
    height: PROFILE_INFO_BTN,
    width: PROFILE_INFO_BTN,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.hotPink,
    borderRadius: 16
  },
  dislikeBtn: {
    height: ACTION_BUTTON_SIZE,
    width: ACTION_BUTTON_SIZE,
    borderRadius: ACTION_BUTTON_SIZE / 2,
    backgroundColor: "#D0BFBF",
    justifyContent: "center",
    alignItems: "center"
  },
  superLikeBtn: {
    height: ACTION_BUTTON_SIZE,
    width: ACTION_BUTTON_SIZE,
    borderRadius: ACTION_BUTTON_SIZE / 2,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center"
  },
  likeBtn: {
    height: ACTION_BUTTON_SIZE,
    width: ACTION_BUTTON_SIZE,
    borderRadius: ACTION_BUTTON_SIZE / 2,
    backgroundColor: colors.lightPink,
    justifyContent: "center",
    alignItems: "center"
  }
});
