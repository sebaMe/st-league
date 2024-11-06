<template>
  <BaseClipCard class="mt-2" tl="5" :pt="{ content: 'flex-col p-2' }">
    <div class="flex w-full">
      <!-- left -->
      <div class="flex flex-1 items-center">
        <Button
          class="border-2 border-dashed border-white text-xl"
          @click="showCreatePlayer = true"
        >
          <BaseIcon icon="player_add" />
          <span>Create Player</span>
        </Button>
        <PlayerEditor v-model:visible="showCreatePlayer" />
      </div>
      <!-- right -->
      <div class="flex items-center font-header text-highlight">
        <span>{{ playersAmount }}</span>
        <BaseIcon class="ml-1" icon="party" />
      </div>
    </div>
    <TransitionGroup class="mt-2 w-full" name="list" tag="ul">
      <PlayerItem
        v-for="player in playerList"
        :key="player.id"
        :player="player"
      />
    </TransitionGroup>
  </BaseClipCard>
</template>

<script setup lang="ts">
import { orderBy } from "lodash-es";
import Button from "primevue/button";
import { computed, onBeforeUnmount, ref } from "vue";

import BaseClipCard from "../components/BaseClipCard.vue";
import BaseIcon from "../components/BaseIcon.vue";
import PlayerEditor from "../components/PlayerEditor.vue";
import PlayerItem from "../components/PlayerItem.vue";
import { useDataStore } from "../stores/data.store";

const { usePlayersData } = useDataStore();

const { subscribe, playersData } = usePlayersData();
const unsub = subscribe();

const showCreatePlayer = ref(false);

const playerList = computed(() =>
  orderBy(Object.values(playersData.value?.list ?? {}), (player) => player.tag)
);
const playersAmount = computed(() => playerList.value.length);

onBeforeUnmount(() => {
  unsub();
});
</script>

<style></style>
