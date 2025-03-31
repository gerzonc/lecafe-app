import type { ColorValue } from "react-native";
import Svg, { Path } from "react-native-svg";

interface Props {
  color?: ColorValue;
  size?: number;
}

/**
Couldn't find the logout icon on @expo/vector-icons (here: https://icons.expo.fyi/Index),
so using this as workaround
*/

export default function LogoutIcon({ color = "#fff", size = 17 }: Props) {
  const height = size * 1.05882352941; // based on original dimension being 17x18

  return (
    <Svg width={size} height={height} viewBox="0 0 17 18" fill="none">
      <Path
        d="M6 4L4.6 5.4L7.2 8H0V10H7.2L4.6 12.6L6 14L11 9L6 4ZM15 16H7V18H15C16.1 18 17 17.1 17 16V9V2C17 0.9 16.1 0 15 0H7V2H15V16Z"
        fill={color}
      />
    </Svg>
  );
}
