<template>
  <img
    v-if="icon"
    :src="iconPath"
    class="hover:z-10 hover:scale-110"
    :class="[
      { 'size-8 min-h-8 min-w-8': size === 'lg' },
      { 'size-6 min-h-6 min-w-6': size === 'md' },
      { 'size-4 min-h-4 min-w-4': size === 'sm' }
    ]"
  />
</template>

<script lang="ts">
export type IconTypes =
  | "music"
  | "player"
  | "lock"
  | "eye_show"
  | "eye_hide"
  | "party"
  | "swords"
  | "arrow_up"
  | "arrow_left"
  | "arrow_right"
  | "arrow_lower"
  | "exit"
  | "record_add"
  | "record_edit"
  | "player_add"
  | "player_edit"
  | "button_a"
  | "button_b"
  | "check_mark"
  | "user"
  | "gear"
  | "chest"
  | "x_mark"
  | "expand"
  | "info"
  | "collapse"
  | "star"
  | "heart"
  | "heart_empty"
  | "skull"
  | "undo"
  | "crown"
  | "hourglas";
</script>
<script setup lang="ts">
import { computed } from "vue";

import iconArrowLeft from "../assets/img/icons/arrow_left.png";
import iconArrowLower from "../assets/img/icons/arrow_lower.png";
import iconArrowRight from "../assets/img/icons/arrow_right.png";
import iconArrowUp from "../assets/img/icons/arrow_up.png";
import iconButtonA from "../assets/img/icons/button_a.png";
import iconButtonB from "../assets/img/icons/button_b.png";
import iconCharacter from "../assets/img/icons/character.png";
import iconCharacterAdd from "../assets/img/icons/character_add.png";
import iconCharacterEdit from "../assets/img/icons/character_edit.png";
import iconCheckMark from "../assets/img/icons/checkmark.png";
import iconChest from "../assets/img/icons/chest.png";
import iconCollapse from "../assets/img/icons/collapse.png";
import iconCrown from "../assets/img/icons/crown.png";
import iconXMark from "../assets/img/icons/delete.png";
import iconExit from "../assets/img/icons/exit.png";
import iconExpand from "../assets/img/icons/expand.png";
import iconEyeHide from "../assets/img/icons/eye_hide.png";
import iconEyeShow from "../assets/img/icons/eye_show.png";
import iconGear from "../assets/img/icons/gear.png";
import iconHeart from "../assets/img/icons/heart.png";
import iconHeartEmpty from "../assets/img/icons/heart_empty.png";
import iconHourglass from "../assets/img/icons/hourglass.png";
import iconInfo from "../assets/img/icons/information.png";
import iconLock from "../assets/img/icons/lock.png";
import iconMusic from "../assets/img/icons/music.png";
import iconParty from "../assets/img/icons/party.png";
import iconRecordAdd from "../assets/img/icons/script_add.png";
import iconRecordEdit from "../assets/img/icons/script_edit.png";
import iconSkull from "../assets/img/icons/skull.png";
import iconStar from "../assets/img/icons/star.png";
import iconSwords from "../assets/img/icons/swords.png";
import iconUndo from "../assets/img/icons/undo.png";
import iconUser from "../assets/img/icons/user.png";

const props = withDefaults(
  defineProps<{
    icon?: IconTypes;
    size?: "md" | "sm" | "lg";
  }>(),
  {
    icon: undefined,
    size: "md"
  }
);

const iconPath = computed(() => {
  switch (props.icon) {
    case "music":
      return iconMusic;
    case "player":
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
    case "arrow_lower":
      return iconArrowLower;
    case "exit":
      return iconExit;
    case "button_a":
      return iconButtonA;
    case "button_b":
      return iconButtonB;
    case "record_add":
      return iconRecordAdd;
    case "record_edit":
      return iconRecordEdit;
    case "player_add":
      return iconCharacterAdd;
    case "player_edit":
      return iconCharacterEdit;
    case "check_mark":
      return iconCheckMark;
    case "star":
      return iconStar;
    case "heart":
      return iconHeart;
    case "heart_empty":
      return iconHeartEmpty;
    case "undo":
      return iconUndo;
    case "info":
      return iconInfo;
    case "user":
      return iconUser;
    case "gear":
      return iconGear;
    case "chest":
      return iconChest;
    case "crown":
      return iconCrown;
    case "skull":
      return iconSkull;
    case "x_mark":
      return iconXMark;
    case "expand":
      return iconExpand;
    case "collapse":
      return iconCollapse;
    default:
      return undefined;
  }
});
</script>

<style></style>
