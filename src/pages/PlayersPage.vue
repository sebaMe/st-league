<template>
  <BaseClipCard class="mt-2" tl="5" :pt="{ content: 'flex-col p-2' }">
    <div class="flex w-full">
      <!-- left -->
      <div class="flex flex-1 items-center">
        <BaseButton icon-left="player_add" @click="showCreatePlayer = true">
          <span>Create Player</span>
        </BaseButton>
        <PlayerEditor v-model:visible="showCreatePlayer" />
      </div>
      <!-- right -->
      <div class="ml-2 flex items-center font-header text-primary">
        <span>{{ playersAmount }}</span>
        <BaseIcon class="ml-2" icon="party" />
      </div>
    </div>
    <TransitionGroup class="mt-2 w-full" name="list" tag="ul">
      <PlayerItem
        v-for="player in playerStore.orderedPlayersList"
        :key="player.id"
        :player="player"
      />
    </TransitionGroup>
  </BaseClipCard>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from "vue";

import BaseButton from "../components/BaseButton.vue";
import BaseClipCard from "../components/BaseClipCard.vue";
import BaseIcon from "../components/BaseIcon.vue";
import PlayerEditor from "../components/PlayerEditor.vue";
import PlayerItem from "../components/PlayerItem.vue";
import { usePlayersStore } from "../stores/players.store";

const playerStore = usePlayersStore();
playerStore.subscribe();

const showCreatePlayer = ref(false);

const playersAmount = computed(() => playerStore.orderedPlayersList?.length);

onBeforeUnmount(() => {
  playerStore.unsubscribe();
});
</script>

<style></style>
