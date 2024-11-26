<template>
  <BaseClipCard class="mt-2" tl="5" :pt="{ content: 'flex-col p-2' }">
    <div class="flex w-full">
      <div class="flex flex-1 items-center justify-center">
        <PlayerEditor />
      </div>
    </div>
    <table class="mt-4 block w-full overflow-x-auto">
      <TransitionGroup name="list" tag="tbody">
        <PlayerRow
          v-for="player in playerStore.orderedPlayersList"
          :key="player.id"
          :player="player"
        />
      </TransitionGroup>
    </table>
  </BaseClipCard>
</template>

<script setup lang="ts">
import { onBeforeUnmount } from "vue";

import BaseClipCard from "../components/BaseClipCard.vue";
import PlayerEditor from "../components/PlayerEditor.vue";
import PlayerRow from "../components/PlayerRow.vue";
import { usePlayersStore } from "../stores/players.store";

const playerStore = usePlayersStore();
playerStore.subscribe();

onBeforeUnmount(() => {
  playerStore.unsubscribe();
});
</script>

<style></style>
