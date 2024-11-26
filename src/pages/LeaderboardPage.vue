<template>
  <BaseClipCard class="mt-2" tl="12" tr="5" :pt="{ content: 'flex-col p-2' }">
    <div class="my-2 flex w-full justify-between">
      <BaseSelect v-model="sortBy" label="Sort By" :options="sortOptions" />
      <ButtonGroup class="flex items-center">
        <BaseButton
          icon-right="info"
          class="px-2"
          variant="plain"
          @click="showInfo = true"
        />
        <BaseDialog
          v-model:visible="showInfo"
          class="max-w-[30rem]"
          title="Durak Scoring Rules"
          only-confirm
          :closable="false"
        >
          <div class="text-2xl">
            The Ranking (<BaseIcon class="inline" size="sm" icon="star" />) is
            based on a score which is calculated by cumulating points for
            certain result-types (<BaseIcon
              class="inline"
              size="sm"
              icon="skull"
            />, <BaseIcon class="inline" size="sm" icon="crown" />,
            <BaseIcon class="inline" size="sm" icon="x_mark" />,
            <BaseIcon class="inline" size="sm" icon="check_mark" />).<br />The
            player with the <span class="text-primary">highest score</span> is
            the leader (the durak), which means in this case, the
            <span class="text-primary">LOSER</span>!<br /><br />
            <h1 class="font-header text-sm text-primary">
              Rule #1 - Losing
              <BaseIcon class="inline" size="sm" icon="skull" />
            </h1>
            Losing a game will
            <span class="text-primary"
              >add {{ ScoringValues.LOST }} points</span
            >
            to the score of the losing player.<br /><br />
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
            player. Missing
            <span class="text-primary">{{ MAX_HEARTS_AMOUNT }}</span> games will
            result in <span class="text-primary">1</span> lose (<BaseIcon
              class="inline"
              size="sm"
              icon="skull"
            />).<br /><br />
            <h1 class="font-header text-sm text-primary">
              Rule #4 - Participating
              <BaseIcon class="inline" size="sm" icon="check_mark" />
            </h1>
            Participating in a game will not affect the score.
          </div>
        </BaseDialog>
        <BaseButton
          :icon-right="openPanels?.length > 0 ? 'collapse' : 'expand'"
          class="px-2"
          variant="plain"
          @click="toggleAllPanels"
        />
      </ButtonGroup>
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
import BaseDialog from "../components/BaseDialog.vue";
import BaseIcon from "../components/BaseIcon.vue";
import BaseSelect, { IBaseSelectOption } from "../components/BaseSelect.vue";
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

const showInfo = ref(false);
const openPanels = ref<string[]>([]);

const sortOptions: IBaseSelectOption[] = [
  { label: "Leader", value: undefined, icon: "star" },
  {
    label: "Lost",
    value: ResultTypes.LOST,
    icon: mapResultToIcon(ResultTypes.LOST)
  },
  {
    label: "Won",
    value: ResultTypes.WON,
    icon: mapResultToIcon(ResultTypes.WON)
  },
  {
    label: "Participated",
    value: ResultTypes.PARTICIPATED,
    icon: mapResultToIcon(ResultTypes.PARTICIPATED)
  },
  {
    label: "Missed",
    value: ResultTypes.MISSED,
    icon: mapResultToIcon(ResultTypes.MISSED)
  }
];
const sortBy = ref<IBaseSelectOption>(sortOptions[0]);

const resultList = computed<IPlayerTotalResult[]>(() =>
  playerStore.orderedPlayersList.map((player) => {
    // map player game history
    const playerGameHistory = gamesStore.orderedGamesList.map((game) => {
      const gamePlayer = game.players?.[player.id];
      if (gamePlayer) {
        return gamePlayer.result;
      } else {
        // if player does not exist in game, i.e. was a late joiner, the game is scored as 'MISSED'
        return ResultTypes.MISSED;
      }
    });

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
      switch (sortBy.value?.value) {
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
