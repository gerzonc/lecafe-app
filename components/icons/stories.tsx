import type { ColorValue } from "react-native";
import { Path, Svg } from "react-native-svg";

interface Props {
  color?: ColorValue;
  size?: number;
}

/**
Couldn't find the settings icon on @expo/vector-icons (here: https://icons.expo.fyi/Index),
so using this as workaround
*/

export default function StoriesIcon({ color = "#fff", size = 20 }: Props) {
  const height = size * 0.8; // based on original dimension being 20x16

  return (
    <Svg width={size} height={height} viewBox="0 0 20 16" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13 2H7C6.44772 2 6 2.44772 6 3V13C6 13.5523 6.44772 14 7 14H13C13.5523 14 14 13.5523 14 13V3C14 2.44772 13.5523 2 13 2ZM7 0C5.34315 0 4 1.34315 4 3V13C4 14.6569 5.34315 16 7 16H13C14.6569 16 16 14.6569 16 13V3C16 1.34315 14.6569 0 13 0H7Z"
        fill={color}
      />
      <Path
        d="M0 2C0 1.44772 0.447715 1 1 1C1.55228 1 2 1.44772 2 2V14C2 14.5523 1.55228 15 1 15C0.447715 15 0 14.5523 0 14V2Z"
        fill={color}
      />
      <Path
        d="M18 2C18 1.44772 18.4477 1 19 1C19.5523 1 20 1.44772 20 2V14C20 14.5523 19.5523 15 19 15C18.4477 15 18 14.5523 18 14V2Z"
        fill={color}
      />
    </Svg>
  );
}
