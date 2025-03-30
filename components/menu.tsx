import { ColorValue } from 'react-native'
import Svg, { Path } from 'react-native-svg'

interface Props {
  color?: ColorValue,
  size: number
}

/**
Couldn't find the menu icon on @expo/vector-icons (here: https://icons.expo.fyi/Index),
so using this as workaround
*/

export default function MenuIcon({ color = "#fff", size = 20 }: Props) {
  const height = size * 0.7 // based on original dimension being 20x14

  return (
    <Svg width={size} height={height} viewBox={`0 0 ${size} ${height}`} fill="none">
      <Path fillRule="evenodd" clipRule="evenodd" d="M20 12L20 14L8 14L8 12L20 12Z" fill={color} />
      <Path fillRule="evenodd" clipRule="evenodd" d="M20 6L20 8L0 8L0 6L20 6Z" fill={color} />
      <Path fillRule="evenodd" clipRule="evenodd" d="M12 0L12 2L0 2L0 0L12 0Z" fill={color} />
    </Svg>

  )
}
