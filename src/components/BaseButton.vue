<template>
  <Button
    :class="[
      {
        'rounded-lg border-2 border-dashed border-white': variant === 'default'
      },
      {
        'text-xl': font === 'text'
      },
      {
        'font-header text-sm': font === 'header'
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
  }>(),
  {
    font: "text",
    variant: "default",
    iconLeft: undefined,
    iconRight: undefined,
    loading: false
  }
);
</script>

<style></style>
