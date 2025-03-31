import { useDrawerProgress } from "@react-navigation/drawer";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions, Pressable, StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming
} from "react-native-reanimated";

import colors from "@/constants/colors";
import { sections } from "@/services/data";
import { store$ } from "@/store";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { observer, useObservable } from "@legendapp/state/react";
import IconButton from "../icon-button";
import ImageButton from "../image-button";
import Text from "../text";

interface Props {
  item: Item;
  index: number;
  totalCards: number;
  onSwipe?: (index: number) => void;
}

const { width: wWidth, height: wHeight } = Dimensions.get("window");

const AnimatedImage = Animated.createAnimatedComponent(Image);
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const PROFILE_INFO_BTN = 32;
const BODY_PADDING_HORIZONTAL = 31;
const ACTION_BUTTON_SIZE = 58;
const SWIPE_THRESHOLD = 120;

const springConfig = {
  damping: 25,
  stiffness: 250,
  overshootClamping: true
};

export default observer(({ item, totalCards, index, onSwipe }: Props) => {
  const drawerProgress = useDrawerProgress();
  const detailsExpanded$ = useObservable(true);
  const currentSection$ = store$.currentSection.get();
  const isFullscreen$ = store$.isFullscreen.get();
  const gradient$ = store$.currentGradient.get();

  const translateX = useSharedValue(0);
  const superlikeOpacity = useSharedValue(0);
  const fullscreen = useSharedValue(0);
  const detailsExpanded = useSharedValue(1);

  const toggleFullscreen = () => {
    "worklet";
    fullscreen.value = withTiming(
      fullscreen.value === 0 ? 1 : 0,
      { duration: 250 },
      (finished) => {
        if (finished) {
          runOnJS(handleToggleFullscreen)();
        }
      }
    );
  };

  const toggleDetails = () => {
    detailsExpanded.value = withTiming(
      detailsExpanded.value === 1 ? 0 : 1,
      { duration: 250 },
      (finished) => {
        if (finished) {
          runOnJS(handleToggleExpanded)();
        }
      }
    );
  };

  const handleProfileInfoPress = () => {
    if (store$.isFullscreen.get()) {
      toggleDetails();
    } else {
      toggleFullscreen();
    }
  };

  const handleToggleFullscreen = () =>
    store$.isFullscreen.set(fullscreen.value === 1);

  const handleToggleExpanded = () =>
    detailsExpanded$.set(detailsExpanded.value === 1);

  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      color: interpolateColor(
        fullscreen.value,
        [0, 1],
        [colors.white, "rgba(0, 0, 0, 1)"]
      )
    };
  });

  const animatedBasicInfoStyle = useAnimatedStyle(() => {
    return {
      paddingTop: interpolate(fullscreen.value, [0, 1], [0, 42])
    };
  });

  const animatedBodyStyle = useAnimatedStyle(() => {
    const height = interpolate(
      fullscreen.value,
      [0, 1],
      [120, wHeight * 0.6 * detailsExpanded.value + 120]
    );
    const bottom = interpolate(fullscreen.value, [0, 0.8], [30, 0]);
    const backgroundColor = interpolateColor(
      fullscreen.value,
      [0, 0.9],
      ["rgba(255, 255, 255, 0)", "#FFFFFF"]
    );
    const top = interpolate(fullscreen.value, [0, 1], [0, -8]);
    return {
      height,
      left: 0,
      right: 0,
      bottom,
      paddingTop: top,
      paddingHorizontal: 30,
      backgroundColor,
      borderTopLeftRadius: 50
    };
  });

  const infoBtnStyle = useAnimatedStyle(() => {
    const scale = interpolate(fullscreen.value, [0, 1], [1, 1.375]); // based on Figma, is just 44 / 32
    return {
      top: interpolate(fullscreen.value, [0, 1], [0, -16]),
      transform: [{ scale }]
    };
  });

  const imageAnimatedStyle = useAnimatedStyle(() => {
    const collapsedImageHeight = wHeight;
    const expandedImageHeight = wHeight * 0.55;

    const fullscreenImageHeight = interpolate(
      detailsExpanded.value,
      [0, 1],
      [collapsedImageHeight, expandedImageHeight]
    );

    const imageHeight = interpolate(
      fullscreen.value,
      [0, 1],
      [wHeight, fullscreenImageHeight]
    );

    return {
      height: imageHeight,
      width: wWidth
    };
  }, [fullscreen, detailsExpanded]);

  const animatedContainerStyle = useAnimatedStyle(() => {
    const scalePosition = index === totalCards - 1 ? 0.84 : 0.77;
    const isLastTranslateY = index === totalCards - 1 ? 32 : -20;
    return {
      borderRadius: interpolate(fullscreen.value, [0, 1], [30, 0]),
      transform: [
        { scale: interpolate(fullscreen.value, [0, 1], [scalePosition, 1]) },
        {
          translateY: interpolate(
            fullscreen.value,
            [0, 1],
            [isLastTranslateY, 0]
          )
        }
      ],
      width: fullscreen.value === 1 ? wWidth : wWidth,
      height: fullscreen.value === 1 ? wHeight : "100%"
    };
  }, [totalCards, index]);

  const topSectionStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(fullscreen.value, [0, 1], [1, 0])
    };
  });

  const animatedIconBtnStyle = useAnimatedStyle(() => ({
    position: "absolute",
    bottom: interpolate(
      detailsExpanded.value,
      [0, 1],
      [-ACTION_BUTTON_SIZE, 30]
    ),
    opacity: detailsExpanded.value
  }));

  const animatedStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      translateX.value,
      [-wWidth / 5, 0, wWidth / 5],
      [-10, 0, 10]
    );

    const isLastTranslateY = index === totalCards - 1 ? 32 : -15;
    const scalePosition = index === totalCards - 1 ? 0.84 : 0.77;
    const scale = interpolate(drawerProgress.value, [0, 1], [scalePosition, 1]);

    return {
      transform: [
        { translateX: translateX.value },
        {
          translateY: interpolate(
            drawerProgress.value,
            [0, 1],
            [isLastTranslateY, 0]
          )
        },
        { rotate: `${rotate}deg` },
        { scale }
      ]
    };
  }, [totalCards, index]);

  const profileDetailStyle = useAnimatedStyle(() => {
    const baseOpacity = interpolate(fullscreen.value, [0, 1], [0, 1]);
    return {
      opacity: baseOpacity * detailsExpanded.value,
      transform: [
        { translateY: interpolate(detailsExpanded.value, [0, 1], [20, 0]) }
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

  const handleDislike = () => {
    translateX.value = withTiming(
      -wWidth / 2,
      { duration: 600 },
      (finished) => {
        if (finished) {
          runOnJS(onFinish)();
        }
      }
    );
  };

  const handleLike = () => {
    translateX.value = withTiming(wWidth / 2, { duration: 600 }, (finished) => {
      if (finished) {
        runOnJS(onFinish)();
      }
    });
  };

  const handleSuperlike = () => {
    superlikeOpacity.value = withTiming(1, { duration: 100 }, () => {
      superlikeOpacity.value = withTiming(0, { duration: 950 }, (finished) => {
        if (finished) {
          runOnJS(onFinish)();
        }
      });
    });
  };

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
    })
    .onEnd(() => {
      if (Math.abs(translateX.value) > SWIPE_THRESHOLD) {
        const destX = translateX.value > 0 ? wWidth : -wWidth;
        translateX.value = withTiming(destX, { duration: 200 }, (finished) => {
          if (finished) {
            runOnJS(onFinish)();
          }
        });
      } else {
        translateX.value = withSpring(0, springConfig);
      }
    });

  const onFinish = () => {
    if (onSwipe) {
      onSwipe(index);
    }
    detailsExpanded$.set(true);
    store$.isFullscreen.set(false);
  };

  const doubleTapGesture = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(() => {
      superlikeOpacity.value = withTiming(1, { duration: 100 }, () => {
        superlikeOpacity.value = withTiming(
          0,
          { duration: 950 },
          (finished) => {
            if (finished) {
              runOnJS(onFinish)();
            }
          }
        );
      });
    });

  const composedGesture = Gesture.Simultaneous(panGesture, doubleTapGesture);

  return (
    <GestureDetector gesture={composedGesture}>
      <Animated.View
        style={[styles.container, animatedContainerStyle, animatedStyle]}
      >
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
              SUPER{"\n"}LIKE
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
            <Animated.View
              style={[
                styles.btnsContainer,
                { width: "85%", alignSelf: "center" },
                topSectionStyle
              ]}
            >
              {sections.map((section, index) => (
                <ImageButton
                  key={index.toString()}
                  item={section as Section}
                  active={currentSection$ === section.type}
                  onPress={() => handleSectionPress(section as Section)}
                />
              ))}
            </Animated.View>
          </View>
          <Animated.View style={[styles.body, animatedBodyStyle]}>
            <Animated.View style={[styles.basicInfo, animatedBasicInfoStyle]}>
              <View>
                <Text
                  fontFamily="quicksand"
                  fontSize={20}
                  weight="bold"
                  style={animatedTextStyle}
                >
                  {item.name}, {item.age}
                </Text>
                <Text fontFamily="maven-pro" style={animatedTextStyle}>
                  {item.location}
                </Text>
              </View>
              <AnimatedPressable
                style={[styles.profileInfoBtn, infoBtnStyle]}
                onPress={handleProfileInfoPress}
              >
                {isFullscreen$ ? (
                  <MaterialCommunityIcons
                    name={
                      detailsExpanded$.get() ? "chevron-down" : "chevron-up"
                    }
                    size={24}
                    color={colors.white}
                  />
                ) : (
                  <View>
                    <MaterialIcons
                      name="error-outline"
                      size={24}
                      color={colors.white}
                    />
                  </View>
                )}
              </AnimatedPressable>
            </Animated.View>
            <Animated.View style={profileDetailStyle}>
              <Text
                fontFamily="quicksand"
                fontSize={20}
                weight="bold"
                color="rgba(0, 0, 0, 1)"
              >
                Intereses
              </Text>
              <View style={styles.interestsContainer}>
                {item.interests.map((interest, index) => (
                  <LinearGradient
                    key={`${interest}-${index}`}
                    colors={gradient$.gradient}
                    start={gradient$.start}
                    end={gradient$.end}
                    style={styles.interest}
                  >
                    <Text fontFamily="maven-pro">{interest}</Text>
                  </LinearGradient>
                ))}
              </View>
            </Animated.View>
          </Animated.View>
          <Animated.View
            style={[
              styles.btnsContainer,
              { width: "75%", alignSelf: "center" },
              animatedIconBtnStyle
            ]}
          >
            <IconButton
              family="MaterialIcons"
              name="close"
              size={24}
              color={colors.white}
              style={[{ backgroundColor: "#D0BFBF" }, styles.btnStyle]}
              onPress={handleDislike}
            />
            <IconButton
              family="FontAwesome"
              name="heart"
              size={24}
              color={colors.watermelonPink}
              style={[{ backgroundColor: colors.white }, styles.btnStyle]}
              onPress={handleSuperlike}
            />
            <IconButton
              family="MaterialIcons"
              name="check"
              size={24}
              color={colors.white}
              style={[{ backgroundColor: colors.lightPink }, styles.btnStyle]}
              onPress={handleLike}
            />
          </Animated.View>
        </LinearGradient>
        <AnimatedImage
          source={item.image}
          style={[styles.image, imageAnimatedStyle]}
        />
      </Animated.View>
    </GestureDetector>
  );
});

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    height: wHeight * 0.9,
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
    position: "absolute"
  },
  interestsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 12
  },
  interest: {
    borderRadius: 24.5,
    flexWrap: "wrap",
    alignSelf: "flex-start",
    padding: 10,
    marginRight: 8,
    marginBottom: 8
  },
  basicInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 24
  },
  profileInfoBtn: {
    position: "absolute",
    right: 0,
    height: PROFILE_INFO_BTN,
    width: PROFILE_INFO_BTN,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.hotPink,
    borderRadius: 16
  },
  btnStyle: {
    height: ACTION_BUTTON_SIZE,
    width: ACTION_BUTTON_SIZE,
    borderRadius: ACTION_BUTTON_SIZE / 2,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "rgba(229, 229, 229, 0.25)",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10
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
    backgroundColor: "rgba(255, 177, 199, 0.7)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
    padding: 10
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
