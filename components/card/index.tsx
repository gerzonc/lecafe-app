import { useDrawerProgress } from "@react-navigation/drawer";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions, StyleSheet, View } from "react-native";
import {
  Gesture,
  GestureDetector,
  Pressable
} from "react-native-gesture-handler";
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming
} from "react-native-reanimated";

import colors from "@/constants/colors";
import { sections } from "@/services/data";
import { store$ } from "@/store";
import { MaterialIcons } from "@expo/vector-icons";
import { observer } from "@legendapp/state/react";
import IconButton from "../icon-button";
import ImageButton from "../image-button";
import Text from "../text";

interface Props {
  item: Item;
  index: number;
  onSwipe?: (index: number) => void;
}

const { width: wWidth, height: wHeight } = Dimensions.get("window");

const PROFILE_INFO_BTN = 32;
const BODY_PADDING_HORIZONTAL = 31;
const ACTION_BUTTON_SIZE = 58;
const SWIPE_THRESHOLD = 120;

const springConfig = {
  damping: 25,
  stiffness: 250,
  overshootClamping: true
};

export default observer(({ item, index, onSwipe }: Props) => {
  const drawerProgress = useDrawerProgress();
  const currentSection$ = store$.currentSection.get();

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const superlikeOpacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      translateX.value,
      [-wWidth / 5, 0, wWidth / 5],
      [-5, 0, 5]
    );

    const scale = interpolate(drawerProgress.value, [0, 1], [0.84, 1]);

    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: `${rotate}deg` },
        { scale }
      ]
    };
  });

  const likeOverlayStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      [0, SWIPE_THRESHOLD],
      [0, 1],
      Extrapolation.CLAMP
    );
    return { opacity };
  });

  const nopeOverlayStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      [-SWIPE_THRESHOLD, 0],
      [1, 0],
      Extrapolation.CLAMP
    );
    return { opacity };
  });

  const superlikeOverlayStyle = useAnimatedStyle(() => {
    return { opacity: superlikeOpacity.value };
  });

  const handleSectionPress = (section: Section) => {
    store$.currentSection.set(section.type);
    store$.currentGradient.set(colors[section.type]);
  };

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
    })
    .onEnd(() => {
      if (Math.abs(translateX.value) > SWIPE_THRESHOLD) {
        const destX = translateX.value > 0 ? wWidth : -wWidth;
        translateX.value = withTiming(destX, { duration: 200 }, (finished) => {
          if (finished && onSwipe) {
            runOnJS(onSwipe)(index);
          }
        });
      } else {
        translateX.value = withSpring(0, springConfig);
      }
    });

  const doubleTapGesture = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(() => {
      superlikeOpacity.value = withTiming(1, { duration: 100 }, () => {
        superlikeOpacity.value = withTiming(0, { duration: 1250 });
      });
    });

  const composedGesture = Gesture.Simultaneous(panGesture, doubleTapGesture);

  return (
    <GestureDetector gesture={composedGesture}>
      <Animated.View style={[styles.container, animatedStyle]}>
        <Animated.View style={[styles.likeOverlay, likeOverlayStyle]}>
          <MaterialIcons
            name="check"
            size={wHeight * 0.13}
            color={colors.white}
          />
        </Animated.View>
        <Animated.View style={[styles.dislikeOverlay, nopeOverlayStyle]}>
          <MaterialIcons
            name="close"
            size={wHeight * 0.13}
            color={colors.white}
          />
        </Animated.View>
        <Animated.View
          style={[
            styles.likeOverlay,
            styles.superlikeOverlay,
            superlikeOverlayStyle
          ]}
        >
          <View style={styles.rotateSuperlikeOverlay}>
            <Text
              fontFamily="quicksand"
              weight="bold"
              fontSize={39}
              style={styles.superlikeTextContainer}
            >
              SUPER{"\n"}
              LIKE
            </Text>
          </View>
        </Animated.View>
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
                  item={section as Section}
                  active={currentSection$ === section.type}
                  onPress={() => handleSectionPress(section as Section)}
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
              <IconButton
                family="MaterialIcons"
                name="close"
                size={24}
                color={colors.white}
                style={styles.dislikeBtn}
              />
              <IconButton
                family="FontAwesome"
                name="heart"
                size={24}
                color={colors.watermelonPink}
                style={styles.superLikeBtn}
              />
              <IconButton
                family="MaterialIcons"
                name="check"
                size={24}
                color={colors.white}
                style={styles.likeBtn}
              />
            </View>
          </View>
        </LinearGradient>
        <Image source={item.image} style={styles.image} />
      </Animated.View>
    </GestureDetector>
  );
});

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
  },
  dislikeOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(147, 142, 144, 0.7)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
    padding: 10
  },
  likeOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 177, 199, 0.7)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
    padding: 10
  },
  superlikeOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 177, 199, 0.7)"
  },
  rotateSuperlikeOverlay: {
    transform: [{ rotate: "-4.96deg" }]
  },
  superlikeTextContainer: {
    paddingTop: 16,
    paddingHorizontal: 12,
    paddingBottom: 4,
    borderWidth: 4,
    borderRadius: 14,
    borderColor: colors.white,
    lineHeight: 33,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center"
  }
});
