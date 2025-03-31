import colors from "@/constants/colors";
import data from "@/services/data";
import { observable } from "@legendapp/state";

export const store$ = observable({
  currentGradient: colors.friendship,
  currentSection: "friendship",
  list: data.reverse()
});
