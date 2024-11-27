<template>
  <Button
    :class="[
      {
        'rounded-none border-2 border-b-black border-l-gray-300 border-r-black border-t-gray-300':
          variant === 'default'
      },
      {
        'border-none': variant === 'plain'
      },
      {
        'text-xl': font === 'text'
      },
      {
        'font-header text-sm': font === 'header'
      },
      {
        'bg-primary-200': active
      }
    ]"
    :text="variant === 'plain'"
  >
    <template v-if="loading">
      <BaseIcon icon="hourglas" class="animate-spin" />
    </template>
    <template v-else>
      <BaseIcon :icon="iconLeft" />
      <slot></slot>
      <BaseIcon :icon="iconRight" />
    </template>
  </Button>
</template>

<script setup lang="ts">
import Button from "primevue/button";

import BaseIcon, { IconTypes } from "./BaseIcon.vue";

withDefaults(
  defineProps<{
    variant?: "default" | "plain";
    font?: "header" | "text";
    iconLeft?: IconTypes;
    iconRight?: IconTypes;
    loading?: boolean;
    active?: boolean;
  }>(),
  {
    font: "text",
    variant: "default",
    iconLeft: undefined,
    iconRight: undefined,
    loading: false,
    active: false
  }
);
</script>

<style></style>
