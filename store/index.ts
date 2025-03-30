import colors from "@/constants/colors";
import { observable } from "@legendapp/state";

export const store$ = observable({
  currentGradient: colors.friendship,
  currentSection: "friendship"
});
