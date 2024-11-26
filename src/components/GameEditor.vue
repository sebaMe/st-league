<template>
  <BaseButton
    :icon-left="edit ? 'record_edit' : 'record_add'"
    :variant="edit ? 'plain' : 'default'"
    @click="isVisible = true"
  >
    <span v-if="!edit">Record Brawl</span>
  </BaseButton>
  <BaseDialog
    v-model:visible="isVisible"
    :title="`${edit ? 'Edit' : 'Record'} Brawl`"
    :subtitle="`${edit ? 'Modify' : 'Enter'} the Result!`"
    :allow-confirm="allowSubmitGame"
    :busy-confirm="isSubmitting"
    label-confirm="Save"
    @confirm="submitGame"
  >
    <BaseButton
      icon-left="undo"
      fluid
      class="mb-2"
      @click="resetAllPlayerResults"
    >
      <span>Reset</span>
    </BaseButton>
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
            '!bg-green-300':
              getPlayerResult(player.id) === ResultTypes.PARTICIPATED
          },
          {
            '!bg-yellow-300': getPlayerResult(player.id) === ResultTypes.WON
          },
          {
            '!bg-red-300': getPlayerResult(player.id) === ResultTypes.LOST
          }
        ]"
        @click="cyclePlayerResult(player.id)"
      >
        <PlayerAvatar
          :avatar="player.avatar"
          :color="player.color"
          :tag="player.tag"
          :result="getPlayerResult(player.id)"
          variant="big-result"
          animate
          class="z-10"
        />
      </div>
    </div>
  </BaseDialog>
</template>

<script setup lang="ts">
import { cloneDeep } from "lodash-es";
import { computed, ref, watch } from "vue";

import {
  ICreateGamePayload,
  IGame,
  IPlayerResult,
  ResultTypes,
  useGamesStore
} from "../stores/games.store";
import { IPlayer } from "../stores/players.store";
import BaseButton from "./BaseButton.vue";
import BaseDialog from "./BaseDialog.vue";
import PlayerAvatar from "./PlayerAvatar.vue";

const props = withDefaults(
  defineProps<{
    game?: IGame;
    playerList: IPlayer[];
    edit?: boolean;
  }>(),
  {
    playerList: undefined,
    game: undefined,
    edit: false
  }
);

const gamesStore = useGamesStore();

const isVisible = ref<boolean>(false);

const gameSnapshot = ref<ICreateGamePayload>();

const results = computed(() =>
  Object.values(gameSnapshot.value?.players ?? {})?.map(
    (player) => player.result
  )
);
const playersParticipated = computed(
  () =>
    results.value.filter((result) => result === ResultTypes.PARTICIPATED)
      ?.length
);
const playersWon = computed(
  () => results.value.filter((result) => result === ResultTypes.WON)?.length
);
const playersLost = computed(
  () => results.value.filter((result) => result === ResultTypes.LOST)?.length
);
const hasAtLeast3Players = computed(
  () => playersParticipated.value + playersWon.value + playersLost.value >= 3
);
const hasOneWinner = computed(() => playersWon.value === 1);
const hasOneOrTwoLoser = computed(
  () => playersLost.value === 1 || playersLost.value === 2
);
const allowSubmitGame = computed(() => {
  return (
    hasAtLeast3Players.value && hasOneWinner.value && hasOneOrTwoLoser.value
  );
});
const isSubmitting = ref(false);

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
  gameSnapshot.value?.players?.[playerId]?.result;

const setPlayerResult = (playerId: string, result: ResultTypes) => {
  if (gameSnapshot.value) {
    gameSnapshot.value.players[playerId].result = result;
  }
};

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
  const player = gameSnapshot.value?.players?.[playerId];
  if (gameSnapshot.value && player) {
    setPlayerResult(playerId, cycleResult(player.result));
  }
};

const resetAllPlayerResults = () => {
  Object.values(gameSnapshot.value?.players ?? {})?.forEach((player) => {
    setPlayerResult(player.id, ResultTypes.MISSED);
  });
};

const submitGame = () => {
  if (gameSnapshot.value && allowSubmitGame.value && !isSubmitting.value) {
    isSubmitting.value = true;

    if (props.edit && props.game) {
      gamesStore
        .editGame(props.game?.id, gameSnapshot.value)
        .then(() => {
          gameSnapshot.value = undefined;
          isVisible.value = false;
        })
        .finally(() => {
          isSubmitting.value = false;
        });
    } else {
      gamesStore
        .createGame(gameSnapshot.value)
        .then(() => {
          gameSnapshot.value = undefined;
          isVisible.value = false;
        })
        .finally(() => {
          isSubmitting.value = false;
        });
    }
  }
};

watch(isVisible, (visible) => {
  if (visible) {
    if (props.edit) {
      gameSnapshot.value = cloneDeep(props.game);
    } else {
      gameSnapshot.value = createGame();
    }
  } else {
    gameSnapshot.value = undefined;
  }
});
</script>

<style></style>
