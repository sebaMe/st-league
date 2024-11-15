import { IconTypes } from "../components/BaseIcon.vue";
import { ResultTypes } from "../stores/games.store";

export const mapResultToIcon = (
  result?: ResultTypes
): IconTypes | undefined => {
  switch (result) {
    case ResultTypes.MISSED:
      return "x_mark";
    case ResultTypes.PARTICIPATED:
      return "check_mark";
    case ResultTypes.WON:
      return "crown";
    case ResultTypes.LOST:
      return "skull";
    default:
      return undefined;
  }
};
