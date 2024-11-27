<template>
  <BaseButton
    icon-right="book"
    class="px-2"
    variant="plain"
    @click="showInfo = true"
  />
  <BaseDialog
    v-model:visible="showInfo"
    title="Scoring Rules"
    only-confirm
    :closable="false"
  >
    <div class="text-2xl">
      The Ranking (<BaseIcon class="inline" size="sm" icon="star" />) is based
      on a score which is calculated by cumulating points for certain
      result-types (<BaseIcon class="inline" size="sm" icon="skull" />,
      <BaseIcon class="inline" size="sm" icon="crown" />,
      <BaseIcon class="inline" size="sm" icon="x_mark" />,
      <BaseIcon class="inline" size="sm" icon="check_mark" />).<br />The player
      with the <span class="text-primary">highest score</span> is the leader
      (the durak), which means in this case, the
      <span class="text-primary">LOSER</span>!<br /><br />
      <h1 class="font-header text-sm text-primary">
        Rule #1 - Losing
        <BaseIcon class="inline" size="sm" icon="skull" />
      </h1>
      Losing a game will
      <span class="text-primary">add {{ ScoringValues.LOST }} points</span>
      to the score of the losing player.<br /><br />Losing
      <span class="text-primary">2 games in a row </span>
      <BaseIcon
        class="inline !size-6 border-2 border-rare-600 bg-rare-200 p-1"
        icon="skull"
      />
      will add
      <span class="text-primary"
        >{{ LostStreakPenaltiesValues.STREAK_2 }} extra point</span
      >
      to the score of the player.<br /><br />Losing
      <span class="text-primary">3 games in a row </span>
      <BaseIcon
        class="inline !size-6 border-2 border-legendary-600 bg-legendary-200 p-1"
        icon="skull"
      />
      will add
      <span class="text-primary"
        >{{ LostStreakPenaltiesValues.STREAK_3 }} extra points</span
      >
      to the score of the player.<br /><br />Losing
      <span class="text-primary">more than 3 games in a row </span>
      <BaseIcon
        class="inline !size-6 border-2 border-unique-600 bg-unique-200 p-1"
        icon="skull"
      />
      will add
      <span class="text-primary"
        >{{ LostStreakPenaltiesValues.STREAK_X }} extra points</span
      >
      to the score of the player.<br /><br /><BaseIcon
        icon="warn"
        class="inline"
      />
      Missing a game will <span class="text-primary">NOT</span> reset the
      losing-streak!<br /><br />
      <h1 class="font-header text-sm text-primary">
        Rule #2 - Winning
        <BaseIcon class="inline" size="sm" icon="crown" />
      </h1>
      Winning a games will
      <span class="text-primary"
        >substract {{ Math.abs(ScoringValues.WON) }} point</span
      >
      from the score of the winning player.<br /><br />
      <h1 class="font-header text-sm text-primary">
        Rule #3 - Missing
        <BaseIcon class="inline" size="sm" icon="x_mark" />
      </h1>
      Missing a game will substract
      <span class="text-primary">1</span> heart
      <BaseIcon class="inline" size="sm" icon="heart" /> from the missing
      player. Every
      <span class="text-primary">{{ MAX_HEARTS_AMOUNT }}</span> hearts lost,
      will add <span class="text-primary">{{ ScoringValues.LOST }}</span> points
      to the players score.<br /><br />
      <h1 class="font-header text-sm text-primary">
        Rule #4 - Participating
        <BaseIcon class="inline" size="sm" icon="check_mark" />
      </h1>
      Participating in a game will not affect the score.
    </div>
  </BaseDialog>
</template>

<script setup lang="ts">
import { ref } from "vue";

import {
  LostStreakPenaltiesValues,
  MAX_HEARTS_AMOUNT,
  ScoringValues
} from "../constants/game.constants";
import BaseButton from "./BaseButton.vue";
import BaseDialog from "./BaseDialog.vue";
import BaseIcon from "./BaseIcon.vue";

const showInfo = ref(false);
</script>

<style></style>
