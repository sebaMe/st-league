import { IconTypes } from "../components/BaseIcon.vue";
import { IScoringValues } from "../stores/config.store";
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

export const calculatePercentage = (value: number, max: number) => {
  return value > 0 && max > 0 ? Math.round((value / max) * 100) : 0;
};

export interface ILostStreaks {
  lost1: number;
  lost2: number;
  lost3: number;
  lostX: number;
}
export const calculateLostStreaks = (playerGameHistory: ResultTypes[]) => {
  let lostStreak = 0;

  return playerGameHistory
    .filter((resultType) => resultType !== ResultTypes.MISSED)
    .reduce<ILostStreaks>(
      (obj, resultType, index, list) => {
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

        if (resultType === ResultTypes.LOST) {
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

export const calculateLostScore = (
  lostStreaks: ILostStreaks,
  scoringValues: IScoringValues
) => {
  const lost1Score =
    lostStreaks.lost1 > 0 ? lostStreaks.lost1 * scoringValues.lost : 0;
  const lost2Score =
    lostStreaks.lost2 > 0
      ? lostStreaks.lost2 * scoringValues.lost * 2 + scoringValues.streak2
      : 0;
  const lost3Score =
    lostStreaks.lost3 > 0
      ? lostStreaks.lost3 * scoringValues.lost * 3 + scoringValues.streak3
      : 0;
  const lostXScore =
    lostStreaks.lostX > 0
      ? lostStreaks.lostX * scoringValues.lost * 3 + scoringValues.streakX
      : 0;

  return lost1Score + lost2Score + lost3Score + lostXScore;
};
