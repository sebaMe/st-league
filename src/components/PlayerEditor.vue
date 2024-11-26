<template>
  <BaseButton
    :icon-left="edit ? 'player_edit' : 'player_add'"
    :variant="edit ? 'plain' : 'default'"
    @click="isVisible = true"
  >
    <span v-if="!edit">Create Player</span>
  </BaseButton>
  <BaseDialog
    v-model:visible="isVisible"
    :title="`${edit ? 'Edit' : 'Create'} Player`"
    :subtitle="`${edit ? 'Modify' : 'Choose'} your Avatar!`"
    :allow-confirm="allowSubmitPlayer"
    :busy-confirm="isSubmitting"
    label-confirm="Save"
    @confirm="submitPlayer"
  >
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
      <div class="flex">
        <BaseButton
          icon-left="arrow_left"
          variant="plain"
          @click="cycleAvatarsLeft"
        />
        <Transition :name="playerAvatarCycleAnimation" mode="out-in">
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
  </BaseDialog>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";

import { IPlayer, usePlayersStore } from "../stores/players.store";
import BaseButton from "./BaseButton.vue";
import BaseDialog from "./BaseDialog.vue";
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
const isSubmitting = ref(false);
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
const playerAvatarCycleAnimation = ref<string>();

const cycleAvatarsLeft = () => {
  playerAvatarIndex.value =
    playerAvatarIndex.value - 1 < 0
      ? avatarList?.length - 1
      : playerAvatarIndex.value - 1;

  playerAvatarCycleAnimation.value = "slide-in-right";
};
const cycleAvatarsRight = () => {
  playerAvatarIndex.value =
    playerAvatarIndex.value + 1 > avatarList?.length - 1
      ? 0
      : playerAvatarIndex.value + 1;

  playerAvatarCycleAnimation.value = "slide-in-left";
};

const submitPlayer = () => {
  if (allowSubmitPlayer.value && !isSubmitting.value) {
    isSubmitting.value = true;

    if (props.player && props.edit) {
      editPlayer(props.player?.id, {
        avatar: playerAvatar.value,
        tag: playerTagUpperCase.value,
        color: playerColor.value
      })
        .then(() => {
          isSubmitting.value = false;
          playerTag.value = "";
          playerColor.value = colorList[0];
          isVisible.value = false;
        })
        .finally(() => {
          isSubmitting.value = false;
        });
    } else {
      createPlayer({
        avatar: playerAvatar.value,
        tag: playerTagUpperCase.value,
        color: playerColor.value
      })
        .then(() => {
          isSubmitting.value = false;
          playerTag.value = "";
          playerColor.value = colorList[0];
          isVisible.value = false;
        })
        .finally(() => {
          isSubmitting.value = false;
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
