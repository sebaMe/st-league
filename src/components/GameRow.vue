<template>
  <tr
    class="border-b-2 border-b-primary-900 last:border-b-0 even:bg-primary-50"
  >
    <td
      class="pl-2 text-center align-top font-header text-primary xs:align-middle"
    >
      {{ gameNr.toFixed().padStart(2, "0") }}
    </td>
    <td class="w-full min-w-[160px] p-1">
      <div class="inline-flex flex-wrap gap-0.5">
        <PlayerAvatar
          v-for="player in participatedGamePlayers"
          :key="player.id"
          :avatar="player.avatar"
          :tag="player.tag"
          :color="player.color"
          :result="player.result"
        />
      </div>
    </td>
    <td class="px-1 align-top leading-tight">
      <div class="text-right">
        <div class="flex items-center justify-end text-primary">
          <BaseIcon icon="player" size="sm" />
          <span class="ml-1">{{ participation }}</span>
        </div>
        <div>{{ formattedDate }}</div>
        <div>{{ formattedTime }}</div>
      </div>
    </td>
    <td class="px-1 align-top xs:align-middle">
      <GameEditor :player-list :game edit />
    </td>
  </tr>
</template>

<script setup lang="ts">
import { orderBy } from "lodash-es";
import { computed } from "vue";

import { useGamePlayerResults } from "../composables/game.composables";
import { IGame, ResultTypes } from "../stores/games.store";
import { IPlayer } from "../stores/players.store";
import { DateFormats, getFormattedDate } from "../utils/date.utils";
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

const formattedDate = getFormattedDate(
  computed(() => props.game.created?.toDate())
);
const formattedTime = getFormattedDate(
  computed(() => props.game.created?.toDate()),
  DateFormats.TIME
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
