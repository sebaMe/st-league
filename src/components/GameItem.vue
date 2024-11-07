<template>
  <li class="flex justify-between overflow-x-auto even:bg-primary-200">
    <!-- left -->
    <div class="flex items-center">
      <div
        class="sticky left-0 z-20 flex h-full w-8 items-center justify-center bg-primary font-header text-white"
      >
        {{ gameNr }}
      </div>
      <PlayerAvatar
        v-for="player in participatedGamePlayers"
        :key="player.id"
        :class="{ 'px-1': player.result === ResultTypes.PARTICIPATED }"
        :avatar="player.avatar"
        :tag="player.tag"
        :color="player.color"
        :result="player.result"
      />
    </div>
    <!-- right -->
    <div class="flex items-center">
      <div>
        <div class="mr-2 flex items-center text-primary">
          <BaseIcon class="size-4 min-h-4 min-w-4" icon="player" />
          <span class="mx-1">{{ participation }}</span>
          <span>brawled</span>
        </div>
        <div class="whitespace-nowrap">{{ formattedDate }}</div>
      </div>
      <BaseButton
        class="ml-2 h-full"
        variant="plain"
        icon-left="record_edit"
        @click="showCreatePlayer = true"
      >
      </BaseButton>
      <!-- <PlayerEditor v-model:visible="showCreatePlayer" :player="player" edit /> -->
    </div>
  </li>
</template>

<script setup lang="ts">
import { orderBy } from "lodash-es";
import { computed, ref } from "vue";

import { useGamePlayerResults } from "../composables/game.composables";
import { IGame, ResultTypes } from "../stores/games.store";
import { IPlayer } from "../stores/players.store";
import {
  DateFormats,
  getFormattedFirestoreDate
} from "../utils/firestore.utils";
import BaseButton from "./BaseButton.vue";
import BaseIcon from "./BaseIcon.vue";
import PlayerAvatar from "./PlayerAvatar.vue";

const props = withDefaults(
  defineProps<{
    game: IGame;
    gameNr: number;
    playerList: IPlayer[];
  }>(),
  {}
);

const showCreatePlayer = ref(false);

const formattedDate = getFormattedFirestoreDate(
  props.game.created,
  DateFormats.DATE_TIME
);

const gamePlayers = useGamePlayerResults(
  computed(() => props.playerList),
  computed(() => props.game)
);

const participatedGamePlayers = computed(() =>
  orderBy(
    gamePlayers.value?.filter((player) => player.result !== ResultTypes.MISSED),
    [
      (player) => player.result === ResultTypes.WON,
      (player) => player.result === ResultTypes.LOST
    ],
    ["desc", "desc"]
  )
);

const participation = computed(
  () => `${participatedGamePlayers.value?.length}/${gamePlayers.value?.length}`
);
</script>

<style></style>
