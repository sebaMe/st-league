<template>
  <div class="flex items-center bg-primary-200">
    <slot name="icon">
      <BaseIcon class="mx-1" :icon="icon" />
    </slot>
    <div>
      <span v-if="value !== undefined" class="mr-1">
        <slot name="value">
          {{ statString }}
        </slot>
      </span>
      <span
        v-if="prominent !== undefined"
        class="p-1 text-white"
        :class="pt.prominent"
      >
        {{ prominent }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

import BaseIcon, { IconTypes } from "../BaseIcon.vue";

const props = withDefaults(
  defineProps<{
    value?: number | string;
    icon?: IconTypes;
    max?: number | string;
    prominent?: number | string;
    pt?: {
      prominent?: string;
    };
  }>(),
  {
    value: undefined,
    icon: undefined,
    percentage: undefined,
    max: undefined,
    prominent: undefined,
    pt: () => ({ prominent: "bg-primary" })
  }
);

const statString = computed(
  () => `${props.value}${props.max !== undefined ? `/${props.max}` : ""}`
);
</script>

<style></style>
