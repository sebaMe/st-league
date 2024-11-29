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

export interface IStreaks {
  streak2: number;
  streak3: number;
  streakX: number;
}
export const calculateStreaks = (
  playerGameHistory: ResultTypes[],
  streakType: ResultTypes
) => {
  let streak = 0;

  return (
    playerGameHistory
      // filter out missed games, because they should not break a streak
      .filter((resultType) => resultType !== ResultTypes.MISSED)
      .reduce<IStreaks>(
        (obj, resultType, index, list) => {
          const isLastGame = index >= list.length - 1;
          const incrementStreaks = () => {
            switch (streak) {
              case 0:
              case 1:
                break;
              case 2:
                obj.streak2++;
                break;
              case 3:
                obj.streak3++;
                break;
              default:
                obj.streakX++;
                break;
            }
            streak = 0;
          };

          if (resultType === streakType) {
            streak++;
            if (isLastGame) {
              incrementStreaks();
            }
          } else {
            incrementStreaks();
          }
          return obj;
        },
        {
          streak2: 0,
          streak3: 0,
          streakX: 0
        }
      )
  );
};

export const calculateLostStreakScore = (
  lostStreaks: IStreaks,
  scoringValues: IScoringValues
) => {
  const lostStreak2Score =
    lostStreaks.streak2 > 0 ? lostStreaks.streak2 * scoringValues.streak2 : 0;
  const lostStreak3Score =
    lostStreaks.streak3 > 0 ? lostStreaks.streak3 * scoringValues.streak3 : 0;
  const lostStreakXScore =
    lostStreaks.streakX > 0 ? lostStreaks.streakX * scoringValues.streakX : 0;

  return lostStreak2Score + lostStreak3Score + lostStreakXScore;
};
