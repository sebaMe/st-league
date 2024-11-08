<template>
  <tr class="even:bg-primary-200">
    <td
      class="sticky left-0 z-20 bg-primary p-1 text-center font-header text-white"
    >
      {{ gameNr.toFixed().padStart(2, "0") }}
    </td>
    <td class="w-full min-w-56 p-1">
      <PlayerAvatar
        v-for="player in participatedGamePlayers"
        :key="player.id"
        class="inline-flex"
        :avatar="player.avatar"
        :tag="player.tag"
        :color="player.color"
        :result="player.result"
      />
    </td>
    <td class="p-1">
      <div class="text-right">
        <div class="flex items-center justify-end text-primary">
          <BaseIcon icon="player" />
          <span class="ml-1">{{ participation }}</span>
        </div>
        <div class="whitespace-nowrap">{{ formattedDate }}</div>
      </div>
    </td>
    <td class="p-1">
      <BaseButton
        variant="plain"
        icon-left="record_edit"
        @click="showEditBattle = true"
      >
      </BaseButton>
      <GameEditor v-model:visible="showEditBattle" :player-list :game edit />
    </td>
  </tr>
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
import GameEditor from "./GameEditor.vue";
import PlayerAvatar from "./PlayerAvatar.vue";

const props = withDefaults(
  defineProps<{
    game: IGame;
    gameNr: number;
    playerList: IPlayer[];
  }>(),
  {}
);

const showEditBattle = ref(false);

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
    (player) => player.tag
  )
);

const participation = computed(
  () => `${participatedGamePlayers.value?.length}/${gamePlayers.value?.length}`
);
</script>

<style></style>
