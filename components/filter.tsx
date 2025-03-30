import { ColorValue } from 'react-native'
import Svg, { Path } from 'react-native-svg'

interface Props {
  color?: ColorValue,
  size: number
}

/**
Couldn't find the filter icon on @expo/vector-icons (here: https://icons.expo.fyi/Index),
so using this as workaround
*/

export default function FilterIcon({ color = "#fff", size = 21 }: Props) {
  const height = size * 0.8095238095 // based on original dimension being 17x21

  return (
    <Svg width={size} height={height} viewBox={`0 0 ${size} ${height}`} fill="none">
      <Path d="M16.3325 0H0.667539C0.289267 0 0 0.307087 0 0.708661V3.70866C0 3.87402 0.066754 4.06299 0.178011 4.1811L6.11911 11.1024V20.2913C6.11911 20.5512 6.25262 20.7874 6.45288 20.9055C6.56414 20.9764 6.67539 21 6.78665 21C6.89791 21 7.00916 20.9764 7.12042 20.9055L10.5471 18.8268C10.7474 18.7087 10.8809 18.4724 10.8809 18.2126V11.126L16.822 4.20472C16.9332 4.06299 17 3.89764 17 3.73228V0.708661C17 0.307087 16.7107 0 16.3325 0ZM15.6649 3.4252L9.72382 10.3701C9.61257 10.5118 9.54581 10.6772 9.54581 10.8425V17.8346L7.45419 19.1102V10.8425C7.45419 10.6772 7.38744 10.4882 7.27618 10.3701L1.33508 3.4252V1.41732H15.6649V3.4252Z" fill={color} />
    </Svg>
  )
}
