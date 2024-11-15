<template>
  <div class="flex w-full items-center justify-between text-2xl">
    <!-- left -->
    <div class="flex flex-wrap items-center gap-1">
      <PlayerResultStat
        :value="totalResult.lost"
        icon="skull"
        :max="maxGames"
        :percentage="lostPercentage"
      />
      <PlayerResultStat
        :value="totalResult.won"
        icon="crown"
        :max="maxGames"
        :percentage="wonPercentage"
      />
      <PlayerResultStat
        :value="participatedGames"
        icon="check_mark"
        :max="maxGames"
        :percentage="participatedPercentage"
      />
    </div>
    <!-- right -->
    <div class="flex"></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

import { IPlayerTotalResult } from "../pages/LeaderboardPage.vue";
import { calculatePercentage } from "../utils/result.utils";
import PlayerResultStat from "./elements/PlayerResultStat.vue";

const props = withDefaults(
  defineProps<{
    totalResult: IPlayerTotalResult;
  }>(),
  {}
);

const maxGames = computed(() => props.totalResult.history?.length);
const participatedGames = computed(
  () =>
    props.totalResult.participated +
    props.totalResult.lost +
    props.totalResult.won
);
const participatedPercentage = computed(() =>
  calculatePercentage(participatedGames.value, maxGames.value)
);
const lostPercentage = computed(() =>
  calculatePercentage(props.totalResult.lost, maxGames.value)
);
const wonPercentage = computed(() =>
  calculatePercentage(props.totalResult.won, maxGames.value)
);
</script>

<style></style>
