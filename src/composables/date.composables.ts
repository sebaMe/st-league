import { computed, Ref } from "vue";

import { ISeason } from "../stores/config.store";
import { getDaysInBetween } from "../utils/date.utils";
import { calculatePercentage } from "../utils/result.utils";

export const useSeasonDateInfo = (season: Ref<ISeason | undefined>) => {
  const seasonStartDate = computed(() => season.value?.start?.toDate());
  const seasonEndDate = computed(() => season.value?.end?.toDate());
  const seasonDays = computed(() =>
    seasonStartDate.value && seasonEndDate.value
      ? getDaysInBetween(seasonStartDate.value, seasonEndDate.value)
      : undefined
  );
  const currentSeasonDay = computed(() =>
    seasonStartDate.value
      ? getDaysInBetween(seasonStartDate.value, new Date())
      : undefined
  );

  const seasonProgress = computed(() => {
    if (seasonStartDate.value && seasonEndDate.value) {
      return calculatePercentage(
        getDaysInBetween(seasonStartDate.value, new Date()) ?? 0,
        getDaysInBetween(seasonStartDate.value, seasonEndDate.value) ?? 0
      );
    }
    return undefined;
  });

  const seasonEnded = computed(() => {
    return seasonEndDate.value ? seasonEndDate.value < new Date() : false;
  });

  return {
    seasonStartDate,
    seasonEndDate,
    seasonDays,
    currentSeasonDay,
    seasonProgress,
    seasonEnded
  };
};
