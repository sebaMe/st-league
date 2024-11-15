<template>
  <BaseClipCard class="mt-2" tl="5" tr="12" :pt="{ content: 'flex-col p-2' }">
    <div class="my-2 flex w-full justify-between">
      <ButtonGroup>
        <BaseButton
          icon-left="skull"
          variant="plain"
          :active="sortBy === 'loser'"
          @click="sortBy = 'loser'"
        />
        <BaseButton
          icon-left="crown"
          variant="plain"
          :active="sortBy === 'winner'"
          @click="sortBy = 'winner'"
        />
      </ButtonGroup>
      <BaseButton
        :icon-right="openPanels?.length > 0 ? 'collapse' : 'expand'"
        class="px-2"
        variant="plain"
        @click="toggleAllPanels"
      />
    </div>
    <Accordion class="w-full" multiple :value="openPanels">
      <template #expandicon><BaseIcon icon="expand" /></template>
      <template #collapseicon><BaseIcon icon="collapse" /></template>
      <TransitionGroup name="list">
        <AccordionPanel
          v-for="(result, index) in orderedResultList"
          :key="result.id"
          class="border-x-0 border-b-2 border-t-0 border-b-primary-900 last:border-b-0"
          :value="result.id"
        >
          <AccordionHeader class="border-none p-2 hover:bg-primary-50">
            <LeaderboardRowHeader :total-result="result" :index />
          </AccordionHeader>
          <AccordionContent :pt="{ content: 'border-none' }">
            <LeaderboardRowContent :result />
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
import { MAX_HEARTS_AMOUNT } from "../constants/game.constants";
import { ResultTypes, useGamesStore } from "../stores/games.store";
import { IPlayer, usePlayersStore } from "../stores/players.store";

const gamesStore = useGamesStore();
const playerStore = usePlayersStore();

gamesStore.subscribe();
playerStore.update();

const sortBy = ref<"loser" | "winner">("loser");
const openPanels = ref<string[]>([]);

const toggleAllPanels = () => {
  if (openPanels.value?.length > 0) {
    openPanels.value = [];
  } else {
    openPanels.value = playerStore.orderedPlayersList?.map(
      (player) => player.id
    );
  }
};

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

    return {
      ...player,
      participated,
      lost,
      won,
      missed,
      score: lost + Math.floor(missed / MAX_HEARTS_AMOUNT),
      history: playerGameHistory
    };
  })
);

const orderedResultList = computed(() =>
  orderBy(
    resultList.value,
    (result) => {
      switch (sortBy.value) {
        case "loser":
          return result.score;
        case "winner":
          return result.won;
      }
    },
    "desc"
  )
);

onBeforeUnmount(() => {
  gamesStore.unsubscribe();
});
</script>

<style></style>
