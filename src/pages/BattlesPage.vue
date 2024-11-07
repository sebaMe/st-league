<template>
  <BaseClipCard class="mt-2" tr="5" :pt="{ content: 'flex-col p-2' }">
    <div class="flex w-full">
      <!-- left -->
      <div class="flex flex-1 items-center">
        <BaseButton icon-left="record_add" @click="showRecordBattle = true">
          <span>Record Brawl</span>
        </BaseButton>
        <GameEditor
          v-model:visible="showRecordBattle"
          :player-list="playerStore.orderedPlayersList"
        />
      </div>
      <!-- right -->
      <div class="ml-2 flex items-center font-header text-primary">
        <span>{{ battlesAmount }}</span>
        <BaseIcon class="ml-2" icon="swords" />
      </div>
    </div>
    <TransitionGroup class="mt-2 w-full" name="list" tag="ul">
      <GameItem
        v-for="(game, index) in gamesStore.orderedGamesList"
        :key="game.id"
        :game="game"
        :game-nr="battlesAmount - index"
        :player-list="playerStore.orderedPlayersList"
      />
    </TransitionGroup>
  </BaseClipCard>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

import BaseButton from "../components/BaseButton.vue";
import BaseClipCard from "../components/BaseClipCard.vue";
import BaseIcon from "../components/BaseIcon.vue";
import GameEditor from "../components/GameEditor.vue";
import GameItem from "../components/GameItem.vue";
import {
  // IPlayerResult,
  // ResultTypes,
  useGamesStore
} from "../stores/games.store";
import { usePlayersStore } from "../stores/players.store";

const gamesStore = useGamesStore();
const playerStore = usePlayersStore();

playerStore.update();

gamesStore.subscribe();

const showRecordBattle = ref(false);

const battlesAmount = computed(() => gamesStore.orderedGamesList?.length);
</script>

<style></style>
