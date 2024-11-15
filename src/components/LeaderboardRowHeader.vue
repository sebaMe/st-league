<template>
  <div class="flex flex-1 items-center justify-between">
    <!-- left -->
    <div class="flex items-center">
      <div
        class="flex min-w-8 items-center justify-center font-header text-primary"
      >
        {{ index + 1 }}
      </div>
      <!-- avatar and hearts -->
      <div>
        <PlayerAvatar
          class="px-2"
          :avatar="totalResult.avatar"
          :tag="totalResult.tag"
          :color="totalResult.color"
          variant="inline"
        />
        <div class="flex pl-2">
          <BaseIcon
            v-for="n in MAX_HEARTS_AMOUNT"
            :key="n"
            class="!size-3 !min-h-3 !min-w-3"
            :class="{ 'animate-pulse': n === 1 && currentHearts === 1 }"
            :icon="n > currentHearts ? 'heart_empty' : 'heart'"
          />
        </div>
      </div>
      <!-- game history -->
      <div class="ml-2 flex min-w-20 flex-wrap items-center justify-center">
        <BaseIcon
          v-for="(result, n) in last5Results"
          :key="n"
          :icon="mapResultToIcon(result)"
        />
      </div>
    </div>
    <!-- right -->
    <div class="flex">
      <div class="mx-2 bg-primary px-2 font-header text-white">
        {{ totalResult.score }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

import { MAX_HEARTS_AMOUNT } from "../constants/game.constants";
import { IPlayerTotalResult } from "../pages/LeaderboardPage.vue";
import { mapResultToIcon } from "../utils/result.utils";
import BaseIcon from "./BaseIcon.vue";
import PlayerAvatar from "./PlayerAvatar.vue";

const props = withDefaults(
  defineProps<{
    index: number;
    totalResult: IPlayerTotalResult;
  }>(),
  {}
);

const last5Results = computed(() => props.totalResult.history.slice(-5));
const currentHearts = computed(
  () => MAX_HEARTS_AMOUNT - (props.totalResult.missed % MAX_HEARTS_AMOUNT)
);
</script>

<style></style>
