import type { ColorValue } from "react-native";
import { Path, Svg } from "react-native-svg";

interface Props {
  color?: ColorValue;
  size?: number;
}

/**
Couldn't find the bubble icon on @expo/vector-icons (here: https://icons.expo.fyi/Index),
so using this as workaround
*/

export default function BubbleIcon({ color = "#fff", size = 20 }: Props) {
  const height = size * 0.9; // based on original dimension being 20x18

  return (
    <Svg width={size} height={height} viewBox="0 0 20 18" fill="none">
      <Path
        d="M5.15347 14.4526C5.11278 14.4302 5.07309 14.4077 5.03291 14.3862C4.42148 14.0594 3.85031 13.6711 3.32988 13.206C2.60782 12.5608 2.01668 11.8103 1.59709 10.9225C1.33763 10.3736 1.15998 9.79862 1.06994 9.19483C1.01273 8.81095 0.9873 8.42527 1.00614 8.03778C1.05116 7.11277 1.29185 6.24358 1.72136 5.42917C2.14961 4.61715 2.72022 3.92567 3.4031 3.32943C4.16284 2.66615 5.01419 2.16044 5.93852 1.78141C6.59703 1.51136 7.27596 1.31519 7.9736 1.18517C8.3238 1.11993 8.67601 1.07141 9.03022 1.04017C9.50193 0.99849 9.97483 0.990811 10.4478 1.00991C12.0598 1.07496 13.5906 1.46245 15.0219 2.23736C15.801 2.65918 16.5069 3.18502 17.1245 3.83249C17.7192 4.45616 18.1983 5.16087 18.5322 5.96611C18.7416 6.47098 18.8812 6.9954 18.9511 7.54033C18.9995 7.91731 19.0123 8.29531 18.988 8.67325C18.9311 9.56142 18.6879 10.3955 18.275 11.1778C17.8918 11.9035 17.3936 12.5356 16.8014 13.091C16.0807 13.7672 15.2651 14.2931 14.374 14.6972C13.6247 15.0369 12.8459 15.2788 12.0399 15.4286C11.6445 15.5021 11.2473 15.5608 10.8458 15.5838C10.6119 15.5972 10.3779 15.6132 10.1438 15.6182C9.85094 15.6244 9.55801 15.615 9.26608 15.5859C9.16617 15.5759 9.06602 15.5681 8.96636 15.5561C8.88988 15.5469 8.81748 15.5582 8.74433 15.5815C7.62628 15.9383 6.50787 16.2939 5.38957 16.6498C5.05407 16.7566 4.71869 16.8637 4.38306 16.9701C4.3472 16.9814 4.31084 16.9941 4.27386 16.9984C4.11066 17.0176 3.99361 16.8624 4.0515 16.7039C4.06614 16.6639 4.08736 16.6264 4.10639 16.5881C4.43718 15.9218 4.76817 15.2556 5.09903 14.5893C5.11963 14.5477 5.14575 14.5083 5.15347 14.4526Z"
        stroke={color}
        strokeWidth="1.7"
      />
    </Svg>
  );
}
