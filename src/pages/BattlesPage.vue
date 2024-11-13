<template>
  <BaseClipCard class="mt-2" tr="5" :pt="{ content: 'flex-col p-2' }">
    <div class="flex w-full">
      <div class="flex flex-1 items-center justify-center">
        <BaseButton
          :disabled="playerStore.orderedPlayersList?.length < 3"
          icon-left="record_add"
          @click="showRecordBattle = true"
        >
          <span>Record Brawl</span>
        </BaseButton>
        <GameEditor
          v-model:visible="showRecordBattle"
          :player-list="playerStore.orderedPlayersList"
        />
      </div>
    </div>
    <table class="mt-4 block w-full overflow-x-auto">
      <TransitionGroup name="list" tag="tbody">
        <GameRow
          v-for="(game, index) in gamesStore.orderedGamesList"
          :key="game.id"
          :game="game"
          :game-nr="battlesAmount - index"
          :player-list="playerStore.orderedPlayersList"
        />
      </TransitionGroup>
    </table>
  </BaseClipCard>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from "vue";

import BaseButton from "../components/BaseButton.vue";
import BaseClipCard from "../components/BaseClipCard.vue";
import GameEditor from "../components/GameEditor.vue";
import GameRow from "../components/GameRow.vue";
import { useGamesStore } from "../stores/games.store";
import { usePlayersStore } from "../stores/players.store";

const gamesStore = useGamesStore();
const playerStore = usePlayersStore();

playerStore.update();

gamesStore.subscribe();

const showRecordBattle = ref(false);

const battlesAmount = computed(() => gamesStore.orderedGamesList?.length);

onBeforeUnmount(() => {
  gamesStore.unsubscribe();
});
</script>

<style></style>
