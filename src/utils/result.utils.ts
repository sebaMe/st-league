import { IconTypes } from "../components/BaseIcon.vue";
import {
  LostStreakPenaltiesValues,
  ScoringValues
} from "../constants/game.constants";
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

export const calculatePercentage = (value: number, max: number) =>
  Math.round((value / max) * 100);

export interface ILostStreaks {
  lost1: number;
  lost2: number;
  lost3: number;
  lostX: number;
}
export const calculateLostStreaks = (playerGameHistory: ResultTypes[]) => {
  let lostStreak = 0;

  return playerGameHistory.reduce<ILostStreaks>(
    (obj, game, index, list) => {
      const isLastGame = index >= list.length - 1;
      const incrementLostStreaks = () => {
        switch (lostStreak) {
          case 0:
            break;
          case 1:
            obj.lost1++;
            break;
          case 2:
            obj.lost2++;
            break;
          case 3:
            obj.lost3++;
            break;
          default:
            obj.lostX++;
            break;
        }
        lostStreak = 0;
      };

      if (game === ResultTypes.LOST) {
        lostStreak++;
        if (isLastGame) {
          incrementLostStreaks();
        }
      } else {
        incrementLostStreaks();
      }
      return obj;
    },
    {
      lost1: 0,
      lost2: 0,
      lost3: 0,
      lostX: 0
    }
  );
};

export const calculateLostScore = (lostStreaks: ILostStreaks) => {
  const lost1Score =
    lostStreaks.lost1 > 0 ? lostStreaks.lost1 * ScoringValues.LOST : 0;
  const lost2Score =
    lostStreaks.lost2 > 0
      ? lostStreaks.lost2 * ScoringValues.LOST * 2 +
        LostStreakPenaltiesValues.STREAK_2
      : 0;
  const lost3Score =
    lostStreaks.lost3 > 0
      ? lostStreaks.lost3 * ScoringValues.LOST * 3 +
        LostStreakPenaltiesValues.STREAK_3
      : 0;
  const lostXScore =
    lostStreaks.lostX > 0
      ? lostStreaks.lostX * ScoringValues.LOST * 3 +
        LostStreakPenaltiesValues.STREAK_X
      : 0;

  return lost1Score + lost2Score + lost3Score + lostXScore;
};
