<template>
  <BaseClipCard class="mt-2" tr="5" :pt="{ content: 'flex-col p-2' }">
    <div class="flex w-full">
      <!-- left -->
      <div class="flex flex-1 items-center">
        <BaseButton icon-left="record_add" @click="createGame">
          <span>Record Battle</span>
        </BaseButton>
      </div>
      <!-- right -->
      <div class="flex items-center font-header text-primary">
        <span>{{ battlesAmount }}</span>
        <BaseIcon class="ml-1" icon="swords" />
      </div>
    </div>
    <TransitionGroup class="mt-2 w-full" name="list" tag="ul">
    </TransitionGroup>
  </BaseClipCard>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

import BaseButton from "../components/BaseButton.vue";
import BaseClipCard from "../components/BaseClipCard.vue";
import BaseIcon from "../components/BaseIcon.vue";
import {
  IPlayerResult,
  ResultTypes,
  useGamesStore
} from "../stores/games.store";
import { usePlayersStore } from "../stores/players.store";

const gamesStore = useGamesStore();
const playerStore = usePlayersStore();

playerStore.update();

gamesStore.subscribe();

const showRecordBattle = ref(false);

const createGame = () => {
  gamesStore.createGame({
    players: playerStore.orderedPlayersList?.reduce<{
      [id: string]: IPlayerResult;
    }>((dict, player) => {
      dict[player.id] = {
        id: player.id,
        result: ResultTypes.PARTICIPATED
      };
      return dict;
    }, {})
  });
};

const battlesAmount = computed(() => gamesStore.orderedGamesList?.length);
</script>

<style></style>
