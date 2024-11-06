<template>
  <li class="flex justify-between even:bg-primary-200">
    <!-- left -->
    <div class="flex items-center">
      <PlayerAvatar
        :avatar="player.avatar"
        :tag="player.tag"
        :color="player.color"
      />
    </div>
    <!-- right -->
    <div class="flex items-center">
      <span class="mr-2">created:</span>
      <span>{{ formattedDate }}</span>
      <Button class="ml-2 h-full" text @click="showCreatePlayer = true">
        <BaseIcon icon="player_edit" />
      </Button>
      <PlayerEditor v-model:visible="showCreatePlayer" :player="player" edit />
    </div>
  </li>
</template>

<script setup lang="ts">
import Button from "primevue/button";
import { ref } from "vue";

import { IPlayer } from "../stores/data.store";
import {
  DateFormats,
  getFormattedFirestoreDate
} from "../utils/firestore.utils";
import BaseIcon from "./BaseIcon.vue";
import PlayerAvatar from "./PlayerAvatar.vue";
import PlayerEditor from "./PlayerEditor.vue";

const props = withDefaults(
  defineProps<{
    player: IPlayer;
  }>(),
  {}
);

const showCreatePlayer = ref(false);

const formattedDate = getFormattedFirestoreDate(
  props.player.created,
  DateFormats.FULL_DATE
);
</script>

<style></style>
