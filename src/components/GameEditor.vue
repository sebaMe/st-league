<template>
  <Dialog v-model:visible="isVisible" modal class="font-content">
    <template #header>
      <div class="mr-4">
        <div class="font-header uppercase text-primary">
          {{ `${edit ? "Edit" : "Record"} Brawl` }}
        </div>
        <div class="text-xl">
          {{ `${edit ? "Modify" : "Enter"} the Result!` }}
        </div>
      </div>
    </template>
    <template #closeicon>
      <BaseIcon icon="x_mark" />
    </template>
    <div class="grid grid-cols-3 gap-1">
      <div
        v-for="player in playerList"
        :key="player.id"
        class="relative flex min-h-20 cursor-pointer select-none flex-col items-center justify-end border border-dashed border-white bg-slate-300 transition-all"
        :class="[
          {
            'opacity-50': getPlayerResult(player.id) === ResultTypes.MISSED
          },
          {
            'bg-green-300':
              getPlayerResult(player.id) === ResultTypes.PARTICIPATED
          },
          {
            'bg-yellow-300': getPlayerResult(player.id) === ResultTypes.WON
          },
          {
            'bg-red-300': getPlayerResult(player.id) === ResultTypes.LOST
          }
        ]"
        @click="cyclePlayerResult(player.id)"
      >
        <PlayerAvatar
          :avatar="player.avatar"
          :color="player.color"
          :tag="player.tag"
          :result="getPlayerResult(player.id)"
          big-result
          class="z-10"
        />
      </div>
    </div>
    <template #footer>
      <BaseButton icon-left="x_mark" variant="plain" @click="isVisible = false">
        <span>Cancel</span>
      </BaseButton>
      <BaseButton
        :class="{ 'animate-pulse': allowSubmitGame }"
        icon-left="check_mark"
        :disabled="!allowSubmitGame"
        @click="submitGame"
      >
        <span>{{ edit ? "Save" : "Record" }}</span>
      </BaseButton>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import Dialog from "primevue/dialog";
import { computed, ref, watch } from "vue";

import {
  ICreateGamePayload,
  IPlayerResult,
  ResultTypes,
  useGamesStore
} from "../stores/games.store";
import { IPlayer } from "../stores/players.store";
import BaseButton from "./BaseButton.vue";
import BaseIcon from "./BaseIcon.vue";
import PlayerAvatar from "./PlayerAvatar.vue";

const props = withDefaults(
  defineProps<{
    playerList: IPlayer[];
    edit?: boolean;
  }>(),
  {
    playerList: undefined,
    edit: false
  }
);

const gamesStore = useGamesStore();

const allowSubmitGame = computed(() => {
  const results = Object.values(game.value?.players ?? {})?.map(
    (player) => player.result
  );

  const playersParticipated = results.filter(
    (result) => result === ResultTypes.PARTICIPATED
  )?.length;
  const playersWon = results.filter(
    (result) => result === ResultTypes.WON
  )?.length;
  const playersLost = results.filter(
    (result) => result === ResultTypes.LOST
  )?.length;

  const hasAtLeast3Players =
    playersParticipated + playersWon + playersLost >= 3;
  const hasOneWinner = playersWon === 1;
  const hasOneOrTwoLoser = playersLost === 1 || playersLost === 2;

  return hasAtLeast3Players && hasOneWinner && hasOneOrTwoLoser;
});

const isVisible = defineModel<boolean>("visible", { default: false });

const game = ref<ICreateGamePayload>();
const createGame = () => ({
  players: props.playerList?.reduce<{
    [id: string]: IPlayerResult;
  }>((dict, player) => {
    dict[player.id] = {
      id: player.id,
      result: ResultTypes.MISSED
    };
    return dict;
  }, {})
});

const getPlayerResult = (playerId: string) =>
  game.value?.players?.[playerId]?.result;

const cycleResult = (result: ResultTypes) => {
  switch (result) {
    case ResultTypes.MISSED:
      return ResultTypes.PARTICIPATED;
    case ResultTypes.PARTICIPATED:
      return ResultTypes.LOST;
    case ResultTypes.LOST:
      return ResultTypes.WON;
    case ResultTypes.WON:
      return ResultTypes.MISSED;
  }
};

const cyclePlayerResult = (playerId: string) => {
  const currentPlayer = game.value?.players?.[playerId];
  if (game.value && currentPlayer) {
    game.value.players[playerId].result = cycleResult(currentPlayer.result);
  }
};

const submitGame = () => {
  if (game.value && allowSubmitGame.value) {
    gamesStore.createGame(game.value).then(() => {
      game.value = undefined;
      isVisible.value = false;
    });
  }
};

watch(isVisible, (visible) => {
  if (visible) {
    game.value = createGame();
  } else {
    game.value = undefined;
  }
});
</script>

<style></style>
