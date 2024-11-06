<template>
  <div class="relative flex size-14 flex-col items-center justify-center">
    <img
      :key="avatarSrc"
      class="size-6 drop-shadow-md hover:scale-125"
      :src="avatarSrc"
    />
    <div
      class="h-2 font-header text-xs"
      :style="{
        color
      }"
    >
      {{ tag }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    avatar: string;
    color: string;
    tag: string;
  }>(),
  {}
);

const avatarSrc = computed(() => `img/avatars/${props.avatar}.png`);
</script>

<style></style>
