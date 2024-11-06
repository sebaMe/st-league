<template>
  <img v-if="icon" :src="iconPath" class="size-6 hover:scale-125" />
</template>

<script setup lang="ts">
import { computed } from "vue";

import iconArrowLeft from "../assets/img/icons/arrow_left.png";
import iconArrowRight from "../assets/img/icons/arrow_right.png";
import iconArrowUp from "../assets/img/icons/arrow_up.png";
import iconButtonA from "../assets/img/icons/button_a.png";
import iconCharacter from "../assets/img/icons/character.png";
import iconCharacterAdd from "../assets/img/icons/character_add.png";
import iconCharacterEdit from "../assets/img/icons/character_edit.png";
import iconCheckMark from "../assets/img/icons/checkmark.png";
import iconXMark from "../assets/img/icons/delete.png";
import iconExit from "../assets/img/icons/exit.png";
import iconEyeHide from "../assets/img/icons/eye_hide.png";
import iconEyeShow from "../assets/img/icons/eye_show.png";
import iconHourglass from "../assets/img/icons/hourglass.png";
import iconLock from "../assets/img/icons/lock.png";
import iconMusic from "../assets/img/icons/music.png";
import iconParty from "../assets/img/icons/party.png";
import iconRecordAdd from "../assets/img/icons/script_text_add.png";
import iconSwords from "../assets/img/icons/swords.png";

const props = defineProps<{
  icon?:
    | "music"
    | "user"
    | "lock"
    | "eye_show"
    | "eye_hide"
    | "party"
    | "swords"
    | "arrow_up"
    | "arrow_left"
    | "arrow_right"
    | "exit"
    | "record_add"
    | "player_add"
    | "player_edit"
    | "button_a"
    | "check_mark"
    | "x_mark"
    | "hourglas";
}>();

const iconPath = computed(() => {
  switch (props.icon) {
    case "music":
      return iconMusic;
    case "user":
      return iconCharacter;
    case "lock":
      return iconLock;
    case "eye_show":
      return iconEyeShow;
    case "eye_hide":
      return iconEyeHide;
    case "hourglas":
      return iconHourglass;
    case "party":
      return iconParty;
    case "swords":
      return iconSwords;
    case "arrow_up":
      return iconArrowUp;
    case "arrow_left":
      return iconArrowLeft;
    case "arrow_right":
      return iconArrowRight;
    case "exit":
      return iconExit;
    case "button_a":
      return iconButtonA;
    case "record_add":
      return iconRecordAdd;
    case "player_add":
      return iconCharacterAdd;
    case "player_edit":
      return iconCharacterEdit;
    case "check_mark":
      return iconCheckMark;
    case "x_mark":
      return iconXMark;
    default:
      return undefined;
  }
});
</script>

<style></style>
