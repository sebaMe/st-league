<template>
  <Dialog v-model:visible="isVisible" modal class="font-content">
    <template #header>
      <div class="mr-4">
        <div class="font-header uppercase text-primary">
          {{ `${edit ? "Edit" : "Create"} Player` }}
        </div>
        <div class="text-xl">
          {{ `${edit ? "Modify" : "Choose"} your Avatar!` }}
        </div>
      </div>
    </template>
    <template #closeicon>
      <BaseIcon icon="x_mark" />
    </template>
    <BaseInput
      v-model="playerTag"
      :invalid="playerTag?.length !== 3"
      label="Player Tag"
      icon-left="player"
      type="mask"
      mask="aaa"
      class="w-full"
    />
    <div class="mt-4 flex flex-col items-center">
      <BaseButton
        :style="{ backgroundColor: playerColor }"
        fluid
        @click="cycleColors"
      >
        <span>Color</span><span>{{ currentColorPosition }}</span>
      </BaseButton>

      <div class="mt-4 font-header text-xs">
        {{ currentAvatarPosition }}
      </div>
      <div class="mb-4 flex">
        <BaseButton
          icon-left="arrow_left"
          variant="plain"
          @click="cycleAvatarsLeft"
        />
        <Transition name="slide-in-top" mode="out-in">
          <PlayerAvatar
            :key="playerAvatar"
            :avatar="playerAvatar"
            :color="playerColor"
            :tag="playerTagUpperCase"
          />
        </Transition>

        <BaseButton
          icon-left="arrow_right"
          variant="plain"
          @click="cycleAvatarsRight"
        />
      </div>
    </div>
    <template #footer>
      <BaseButton icon-left="x_mark" variant="plain" @click="isVisible = false">
        <span>Cancel</span>
      </BaseButton>
      <BaseButton
        :class="{ 'animate-pulse': allowSubmitPlayer }"
        icon-left="check_mark"
        :disabled="!allowSubmitPlayer"
        @click="submitPlayer"
      >
        <span>{{ edit ? "Save" : "Create" }}</span>
      </BaseButton>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import Dialog from "primevue/dialog";
import { computed, ref, watch } from "vue";

import { IPlayer, usePlayersStore } from "../stores/players.store";
import BaseButton from "./BaseButton.vue";
import BaseIcon from "./BaseIcon.vue";
import BaseInput from "./BaseInput.vue";
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

const { createPlayer, editPlayer } = usePlayersStore();

const colorList = [
  "#020617",
  "#475569",
  "#991b1b",
  "#f87171",
  "#ea580c",
  "#65a30d",
  "#34d399",
  "#06b6d4",
  "#0369a1",
  "#6366f1",
  "#581c87",
  "#ec4899"
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

const allowSubmitPlayer = computed(
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
  if (allowSubmitPlayer.value) {
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
