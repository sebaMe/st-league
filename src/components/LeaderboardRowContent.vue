<template>
  <div class="flex w-full items-center justify-between text-2xl">
    <!-- left -->
    <div class="flex flex-wrap items-center gap-1">
      <PlayerStat
        :value="totalResult.lost"
        icon="skull"
        :max="participatedGames"
        :prominent="`${lostPercentage ?? '0'}%`"
      />
      <PlayerStat
        v-if="lostFromHearts > 0"
        :prominent="lostFromHearts"
        class="!bg-gray-200"
        :pt="{ prominent: 'bg-gray-600' }"
      >
        <template #icon>
          <BaseIcon class="mx-1" icon="skull" />
          <BaseIcon class="mr-1" icon="heart_empty" size="sm" />
        </template>
      </PlayerStat>
      <PlayerStat
        v-if="totalResult.lostStreaks.lost2 > 0"
        class="!bg-rare-200"
        :prominent="totalResult.lostStreaks.lost2"
        icon="skull"
        :pt="{ prominent: 'bg-rare-600' }"
      />
      <PlayerStat
        v-if="totalResult.lostStreaks.lost3 > 0"
        class="!bg-legendary-200"
        :prominent="totalResult.lostStreaks.lost3"
        icon="skull"
        :pt="{ prominent: 'bg-legendary-600' }"
      />
      <PlayerStat
        v-if="totalResult.lostStreaks.lostX > 0"
        class="!bg-unique-200"
        :prominent="totalResult.lostStreaks.lostX"
        icon="skull"
        :pt="{ prominent: 'bg-unique-600' }"
      />
      <PlayerStat
        :value="totalResult.won"
        icon="crown"
        :max="participatedGames"
        :prominent="`${wonPercentage ?? '0'}%`"
      />
      <PlayerStat
        :value="participatedGames"
        icon="check_mark"
        :max="maxGames"
        :prominent="`${participatedPercentage ?? '0'}%`"
      />
    </div>
    <!-- right -->
    <div class="flex"></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

import { IPlayerTotalResult } from "../pages/LeaderboardPage.vue";
import { useConfigStore } from "../stores/config.store";
import { calculatePercentage } from "../utils/result.utils";
import BaseIcon from "./BaseIcon.vue";
import PlayerStat from "./elements/PlayerStat.vue";

const props = withDefaults(
  defineProps<{
    totalResult: IPlayerTotalResult;
  }>(),
  {}
);

const configStore = useConfigStore();

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
  calculatePercentage(props.totalResult.lost, participatedGames.value)
);
const wonPercentage = computed(() =>
  calculatePercentage(props.totalResult.won, participatedGames.value)
);

const lostFromHearts = computed(() =>
  Math.floor(props.totalResult.missed / configStore.data.maxLives)
);
</script>

<style></style>
