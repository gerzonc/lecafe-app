import { createElement, forwardRef } from "react";
import type { OpaqueColorValue, TextProps } from "react-native";

import Animated from "react-native-reanimated";

type TWeight = "bold" | "semibold" | "regular"
type TFontFamily = "maven-pro" | "quicksand"

interface Props extends TextProps {
  weight?: TWeight;
  fontSize?: number;
  fontFamily?: TFontFamily;
  color?: string | OpaqueColorValue;
}

const fontFamilyMapping: Record<TFontFamily, Record<TWeight, string>> = {
  "maven-pro": {
    bold: "MavenPro-Bold",
    semibold: "MavenPro-SemiBold",
    regular: "MavenPro-Regular",
  },
  quicksand: {
    bold: "Quicksand-Bold",
    semibold: "Quicksand-SemiBold",
    regular: "Quicksand-Regular",
  },
};

const weightMapping: Record<TWeight, string> = {
  bold: "bold",
  semibold: "600",
  regular: "400",
};

const NativeText = forwardRef(function Text(
  {
    onLongPress,
    onPress,
    onPressIn,
    onPressOut,
    fontSize = 14,
    color = "#fff",
    fontFamily = "maven-pro",
    weight = "regular",
    ...props
  }: Props,
  ref
) {
  const textStyles = {
    fontFamily: fontFamilyMapping[fontFamily][weight],
    fontWeight: weightMapping[weight],
    fontSize,
  };

  return createElement("RCTText", {
    ...props,
    ref,
    style: Array.isArray(props.style)
      ? [
        props.style,
        {
          ...textStyles,
          fontSize,
          color
        }
      ]
      : {
        ...(typeof props.style === "object" ? props.style : {}),
        ...textStyles,
        fontSize,
        color
      }
  });
});

const AnimatedNativeText = Animated.createAnimatedComponent(NativeText);

export default AnimatedNativeText;
