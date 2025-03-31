import type { ImageSource } from "expo-image";

declare global {
  type TImage = "date" | "friendship" | "relationship";

  interface Item {
    id: string;
    name: string;
    lastName: string;
    age: number;
    location: string;
    interests: string[];
    image: ImageSource;
  }

  interface Section {
    title: string;
    type: TImage;
    image: ImageSource;
  }
}
