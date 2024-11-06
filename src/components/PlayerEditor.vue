<template>
  <Dialog v-model:visible="isVisible" modal class="font-content">
    <template #header>
      <div class="mr-4">
        <div class="font-header uppercase text-primary">
          {{ edit ? "Edit Player" : "Create Player" }}
        </div>
        <div class="text-xl">
          {{ `${edit ? "Modify" : "Choose"} your Avatar!` }}
        </div>
      </div>
    </template>
    <template #closeicon>
      <BaseIcon icon="x_mark" />
    </template>
    <InputGroup
      class="mt-4 w-full border-2 border-dashed"
      :class="
        playerTag?.length === 3 ? 'border-highlight' : 'border-danger-500'
      "
    >
      <InputGroupAddon class="border-0">
        <BaseIcon icon="user" />
      </InputGroupAddon>
      <FloatLabel variant="on">
        <InputMask
          v-model="playerTag"
          mask="aaa"
          class="border-0 text-xl focus:outline-0"
        />
        <label class="text-xl">Player Tag</label>
      </FloatLabel>
    </InputGroup>
    <div class="mt-4 flex flex-col items-center">
      <Button
        class="border-2 border-dashed border-white text-xl"
        :style="{ backgroundColor: playerColor }"
        fluid
        @click="cycleColors"
      >
        <span>Color</span><span>{{ currentColorPosition }}</span>
      </Button>

      <!-- <div
        class="ml-4 flex min-w-14 items-end rounded-lg p-2 font-header text-white"
        :style="{ backgroundColor: playerColor }"
      >
        {{ playerTag }}
      </div> -->
      <div class="mt-4 font-header text-xs">
        {{ currentAvatarPosition }}
      </div>
      <div class="mb-4 flex">
        <Button text @click="cycleAvatarsLeft">
          <BaseIcon icon="arrow_left" />
        </Button>
        <PlayerAvatar
          :avatar="playerAvatar"
          :color="playerColor"
          :tag="playerTagUpperCase"
        />
        <Button text @click="cycleAvatarsRight">
          <BaseIcon icon="arrow_right" />
        </Button>
      </div>
    </div>
    <template #footer>
      <Button class="text-xl" text @click="isVisible = false">
        <BaseIcon icon="x_mark" />
        <span>Cancel</span>
      </Button>
      <Button
        class="border-2 border-dashed border-white text-xl"
        :class="{ 'animate-pulse': allowEditPlayer }"
        :disabled="!allowEditPlayer"
        @click="submitPlayer"
      >
        <BaseIcon icon="check_mark" />
        <span>{{ edit ? "Save" : "Create" }}</span>
      </Button>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import FloatLabel from "primevue/floatlabel";
import InputGroup from "primevue/inputgroup";
import InputGroupAddon from "primevue/inputgroupaddon";
import InputMask from "primevue/inputmask";
import { computed, ref, watch } from "vue";

import { IPlayer, useDataStore } from "../stores/data.store";
import BaseIcon from "./BaseIcon.vue";
import PlayerAvatar from "./PlayerAvatar.vue";

const props = withDefaults(
  defineProps<{
    player?: IPlayer;
    edit?: boolean;
  }>(),
  {
    player: undefined,
    edit: false
  }
);

const { createPlayer, editPlayer } = useDataStore();

const colorList = [
  "#b91c1c",
  "#b45309",
  "#15803d",
  "#0f766e",
  "#0369a1",
  "#1d4ed8",
  "#6d28d9",
  "#a21caf",
  "#be185d"
];

const avatarList = [
  "av1",
  "av2",
  "av3",
  "av4",
  "av5",
  "av6",
  "av7",
  "av8",
  "av9",
  "av10",
  "av11",
  "av12",
  "av13",
  "av14",
  "av15",
  "av16",
  "av17",
  "av18",
  "av19"
];

const allowEditPlayer = computed(
  () => playerTag.value?.replace("_", "")?.length === 3
);

const isVisible = defineModel<boolean>("visible", { default: false });
const playerTag = ref<string>("");
const playerTagUpperCase = computed(() => playerTag.value?.toUpperCase());

const playerColor = ref<string>(colorList[0]);
const cycleColors = () => {
  const colorIndex = colorList.indexOf(playerColor.value);
  playerColor.value = colorList?.[colorIndex + 1] ?? colorList[0];
};
const currentColorPosition = computed(
  () =>
    `${(colorList.indexOf(playerColor.value) + 1)?.toString()?.padStart(2, "0")}/${colorList.length?.toString()?.padStart(2, "0")}`
);

const playerAvatarIndex = ref(0);
const playerAvatar = computed(() => avatarList?.[playerAvatarIndex.value]);
const currentAvatarPosition = computed(
  () =>
    `${(playerAvatarIndex.value + 1)?.toString()?.padStart(2, "0")}/${avatarList.length}`
);

const cycleAvatarsLeft = () => {
  playerAvatarIndex.value =
    playerAvatarIndex.value - 1 < 0
      ? avatarList?.length - 1
      : playerAvatarIndex.value - 1;
};
const cycleAvatarsRight = () => {
  playerAvatarIndex.value =
    playerAvatarIndex.value + 1 > avatarList?.length - 1
      ? 0
      : playerAvatarIndex.value + 1;
};

const submitPlayer = () => {
  if (allowEditPlayer.value) {
    if (props.player && props.edit) {
      editPlayer({
        id: props.player?.id,
        created: props.player?.created,
        avatar: playerAvatar.value,
        tag: playerTagUpperCase.value,
        color: playerColor.value
      }).then(() => {
        playerTag.value = "";
        playerColor.value = colorList[0];
        isVisible.value = false;
      });
    } else {
      createPlayer({
        avatar: playerAvatar.value,
        tag: playerTagUpperCase.value,
        color: playerColor.value
      }).then(() => {
        playerTag.value = "";
        playerColor.value = colorList[0];
        isVisible.value = false;
      });
    }
  }
};

watch(
  isVisible,
  (visible) => {
    if (visible && props.edit) {
      playerTag.value = props.player?.tag ?? "";
      playerColor.value = props.player?.color ?? colorList[0];
      playerAvatarIndex.value =
        avatarList.findIndex((item) => item === props.player?.avatar) ?? 0;
    }
  },
  { immediate: true }
);
</script>

<style></style>
