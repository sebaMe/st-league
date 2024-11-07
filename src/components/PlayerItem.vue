<template>
  <li class="flex justify-between even:bg-primary-100">
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
      <div>
        <div class="mr-2 text-primary">joined on</div>
        <div class="whitespace-nowrap">{{ formattedDate }}</div>
      </div>
      <BaseButton
        class="ml-2 h-full"
        variant="plain"
        icon-left="player_edit"
        @click="showEditPlayer = true"
      >
      </BaseButton>
      <PlayerEditor v-model:visible="showEditPlayer" :player="player" edit />
    </div>
  </li>
</template>

<script setup lang="ts">
import { ref } from "vue";

import { IPlayer } from "../stores/players.store";
import {
  DateFormats,
  getFormattedFirestoreDate
} from "../utils/firestore.utils";
import BaseButton from "./BaseButton.vue";
import PlayerAvatar from "./PlayerAvatar.vue";
import PlayerEditor from "./PlayerEditor.vue";

const props = withDefaults(
  defineProps<{
    player: IPlayer;
  }>(),
  {}
);

const showEditPlayer = ref(false);

const formattedDate = getFormattedFirestoreDate(
  props.player.created,
  DateFormats.FULL_DATE
);
</script>

<style></style>
