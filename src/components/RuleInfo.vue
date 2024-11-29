<template>
  <BaseButton
    icon-right="book"
    class="px-2"
    variant="plain"
    @click="show = true"
  />
  <BaseDialog v-model:visible="show" title="Scoring Rules" :footer="false">
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
      <span class="text-primary"
        >add {{ configStore.data.scoring.lost }} points</span
      >
      to the score of the losing player.<br /><br />Losing
      <span class="text-primary">2 games in a row </span>
      <BaseIcon
        class="inline !size-6 rounded-lg border-2 border-rare-600 bg-rare-200 p-1"
        icon="skull"
      />
      will add
      <span class="text-primary"
        >{{ configStore.data.scoring.streak2 }} extra point</span
      >
      to the score of the player.<br /><br />Losing
      <span class="text-primary">3 games in a row </span>
      <BaseIcon
        class="inline !size-6 rounded-lg border-2 border-legendary-600 bg-legendary-200 p-1"
        icon="skull"
      />
      will add
      <span class="text-primary"
        >{{ configStore.data.scoring.streak3 }} extra points</span
      >
      to the score of the player.<br /><br />Losing
      <span class="text-primary">more than 3 games in a row </span>
      <BaseIcon
        class="inline !size-6 rounded-lg border-2 border-unique-600 bg-unique-200 p-1"
        icon="skull"
      />
      will add
      <span class="text-primary"
        >{{ configStore.data.scoring.streakX }} extra points</span
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
      Winning a game will
      <span class="text-primary"
        >substract {{ Math.abs(configStore.data.scoring.won) }} point</span
      >
      from the score of the winning player.<br /><br />Winning games in a row
      will be displayed as a statistic but
      <span class="text-primary">will not affect the score</span>.<br /><br />
      <h1 class="font-header text-sm text-primary">
        Rule #3 - Missing
        <BaseIcon class="inline" size="sm" icon="x_mark" />
      </h1>
      Missing a game will substract
      <span class="text-primary">1</span> heart
      <BaseIcon class="inline" size="sm" icon="heart" /> from the missing
      player. Every
      <span class="text-primary">{{ configStore.data.maxLives }}</span> hearts
      lost, will add
      <span class="text-primary">{{ configStore.data.scoring.lost }}</span>
      points to the players score.<br /><br />
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

import { useConfigStore } from "../stores/config.store";
import BaseButton from "./BaseButton.vue";
import BaseDialog from "./BaseDialog.vue";
import BaseIcon from "./BaseIcon.vue";

const configStore = useConfigStore();

const show = ref(false);
</script>

<style></style>
