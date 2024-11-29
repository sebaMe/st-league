<template>
  <tr
    class="border-b-2 border-b-primary-900 last:border-b-0 even:bg-primary-50"
  >
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
      <PlayerEditor :player="player" edit />
    </td>
  </tr>
</template>

<script setup lang="ts">
import { computed } from "vue";

import { IPlayer } from "../stores/players.store";
import { DateFormats, getFormattedDate } from "../utils/date.utils";
import PlayerAvatar from "./PlayerAvatar.vue";
import PlayerEditor from "./PlayerEditor.vue";

const props = withDefaults(
  defineProps<{
    player: IPlayer;
  }>(),
  {}
);

const formattedDate = getFormattedDate(
  computed(() => props.player.created?.toDate()),
  DateFormats.FULL_DATE
);
</script>

<style></style>
