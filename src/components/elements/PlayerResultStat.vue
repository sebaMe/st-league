<template>
  <div class="flex items-center bg-primary-200">
    <BaseIcon class="mx-1" :icon="icon" />
    <div>
      <span>{{ statString }}</span>
      <span
        v-if="percentage !== undefined"
        class="ml-1 bg-primary p-1 text-white"
        >{{ `${percentage}%` }}</span
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

import BaseIcon, { IconTypes } from "../BaseIcon.vue";

const props = withDefaults(
  defineProps<{
    value: number;
    icon?: IconTypes;
    max?: number;
    percentage?: number;
  }>(),
  {
    icon: undefined,
    percentage: undefined,
    max: undefined
  }
);

const statString = computed(
  () => `${props.value}${props.max !== undefined ? `/${props.max}` : ""}`
);
</script>

<style></style>
