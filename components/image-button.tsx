import { Image } from "expo-image"

type TImage = "date" | "friendship" | "relationship"

interface Props {
  size: number
  image: TImage
}

const images = {
  friendship: require('../assets/images/ui/friendship.svg'),
  date: require('../assets/images/ui/dates.svg'),
  relationship: require("../assets/images/ui/relationship.svg")
}

const image = (image: TImage) => {
  return images[image]
}

export default function ImageButton({ image, size = 52 }: Props) {
  return <Image source={image} style={{ height: size, width: size }} />
}
