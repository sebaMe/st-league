<template>
  <tr class="even:bg-primary-100">
    <td class="p-1">
      <PlayerAvatar
        :avatar="player.avatar"
        :tag="player.tag"
        :color="player.color"
        class="px-2"
        variant="inline"
      />
    </td>
    <td class="w-full p-1 text-right">
      <div class="text-primary">joined on</div>
      <div class="whitespace-nowrap">{{ formattedDate }}</div>
    </td>
    <td class="p-1">
      <BaseButton
        variant="plain"
        icon-left="player_edit"
        @click="showEditPlayer = true"
      >
      </BaseButton>
      <PlayerEditor v-model:visible="showEditPlayer" :player="player" edit />
    </td>
  </tr>
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
