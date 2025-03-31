import type { ColorValue } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";

interface Props {
  color?: ColorValue;
  size?: number;
}

/**
Couldn't find the person icon on @expo/vector-icons (here: https://icons.expo.fyi/Index),
so using this as workaround
*/

export default function PersonIcon({ color = "#fff", size = 15 }: Props) {
  const height = size * 1.2; // based on original dimension being 15x18

  return (
    <Svg width={size} height={height} viewBox="0 0 15 18" fill="none">
      <Path
        d="M14.1409 17.15H0.859052C1.04106 13.64 3.94471 10.85 7.5 10.85C11.0553 10.85 13.9589 13.64 14.1409 17.15Z"
        stroke={color}
        strokeWidth="1.7"
      />
      <Circle cx="7.5" cy="4.5" r="3.65" stroke={color} strokeWidth="1.7" />
    </Svg>
  );
}
