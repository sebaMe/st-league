<template>
  <BaseClipCard class="mt-2" tl="12" tr="5" :pt="{ content: 'flex-col p-2' }">
    <div class="my-2 flex w-full justify-between">
      <ButtonGroup>
        <BaseButton
          icon-left="star"
          variant="plain"
          :active="sortBy === undefined"
          @click="sortBy = undefined"
        />
        <BaseButton
          v-for="resultType in ResultTypes"
          :key="resultType"
          :icon-left="mapResultToIcon(resultType)"
          variant="plain"
          :active="sortBy === resultType"
          @click="sortBy = resultType"
        />
      </ButtonGroup>
      <BaseButton
        :icon-right="openPanels?.length > 0 ? 'collapse' : 'expand'"
        class="px-2"
        variant="plain"
        @click="toggleAllPanels"
      />
    </div>
    <Accordion
      v-model:value="openPanels"
      class="w-full overflow-x-auto"
      multiple
    >
      <template #expandicon><BaseIcon icon="expand" /></template>
      <template #collapseicon><BaseIcon icon="collapse" /></template>
      <TransitionGroup name="list">
        <AccordionPanel
          v-for="(result, index) in orderedResultList"
          :key="result.id"
          class="min-w-[320px] border-x-0 border-b-2 border-t-0 border-b-primary-900 last:border-b-0 even:bg-primary-50"
          :value="result.id"
        >
          <AccordionHeader class="border-none bg-transparent p-2">
            <LeaderboardRowHeader :total-result="result" :index />
          </AccordionHeader>
          <AccordionContent :pt="{ content: 'border-none p-2 bg-transparent' }">
            <LeaderboardRowContent :total-result="result" />
          </AccordionContent>
        </AccordionPanel>
      </TransitionGroup>
    </Accordion>
  </BaseClipCard>
</template>

<script lang="ts">
export interface IPlayerTotalResult extends IPlayer {
  score: number;
  lost: number;
  won: number;
  participated: number;
  missed: number;
  history: ResultTypes[];
  lostStreaks: ILostStreaks;
}
</script>
<script setup lang="ts">
import { orderBy } from "lodash-es";
import Accordion from "primevue/accordion";
import AccordionContent from "primevue/accordioncontent";
import AccordionHeader from "primevue/accordionheader";
import AccordionPanel from "primevue/accordionpanel";
import ButtonGroup from "primevue/buttongroup";
import { computed, onBeforeUnmount, ref } from "vue";

import BaseButton from "../components/BaseButton.vue";
import BaseClipCard from "../components/BaseClipCard.vue";
import BaseIcon from "../components/BaseIcon.vue";
import LeaderboardRowContent from "../components/LeaderboardRowContent.vue";
import LeaderboardRowHeader from "../components/LeaderboardRowHeader.vue";
import { MAX_HEARTS_AMOUNT, ScoringValues } from "../constants/game.constants";
import { ResultTypes, useGamesStore } from "../stores/games.store";
import { IPlayer, usePlayersStore } from "../stores/players.store";
import {
  calculateLostScore,
  calculateLostStreaks,
  ILostStreaks,
  mapResultToIcon
} from "../utils/result.utils";

const gamesStore = useGamesStore();
const playerStore = usePlayersStore();

gamesStore.subscribe();
playerStore.update();

const sortBy = ref<ResultTypes | undefined>();
const openPanels = ref<string[]>([]);

const resultList = computed<IPlayerTotalResult[]>(() =>
  playerStore.orderedPlayersList.map((player) => {
    // reduce player game history
    const playerGameHistory = gamesStore.orderedGamesList.reduce<ResultTypes[]>(
      (history, game) => {
        history.push(game.players?.[player.id].result);
        return history;
      },
      []
    );

    // get player result amounts
    const participated = playerGameHistory.filter(
      (result) => result === ResultTypes.PARTICIPATED
    )?.length;
    const lost = playerGameHistory.filter(
      (result) => result === ResultTypes.LOST
    )?.length;
    const won = playerGameHistory.filter(
      (result) => result === ResultTypes.WON
    )?.length;
    const missed = playerGameHistory.filter(
      (result) => result === ResultTypes.MISSED
    )?.length;

    // calculate score
    // The score here is calculated based on losses NOT wins.
    // Thats because I created that app for a game, where the player with most losses should be displayed on top.
    const lostStreaks = calculateLostStreaks(playerGameHistory);
    const lostScore = calculateLostScore(lostStreaks);

    const wonScore = won * ScoringValues.WON;

    const heartScore =
      Math.floor(missed / MAX_HEARTS_AMOUNT) * ScoringValues.LOST;

    const score = wonScore + lostScore + heartScore;

    return {
      ...player,
      participated,
      lost,
      won,
      missed,
      score,
      history: playerGameHistory,
      lostStreaks
    };
  })
);

const orderedResultList = computed(() =>
  orderBy(
    resultList.value,
    (result) => {
      switch (sortBy.value) {
        case ResultTypes.LOST:
          return result.lost;
        case ResultTypes.WON:
          return result.won;
        case ResultTypes.PARTICIPATED:
          return result.won + result.lost + result.participated;
        case ResultTypes.MISSED:
          return result.missed;
        default:
          return result.score;
      }
    },
    "desc"
  )
);

const toggleAllPanels = () => {
  if (openPanels.value?.length > 0) {
    openPanels.value = [];
  } else {
    openPanels.value = playerStore.orderedPlayersList?.map(
      (player) => player.id
    );
  }
};

onBeforeUnmount(() => {
  gamesStore.unsubscribe();
});
</script>

<style></style>
