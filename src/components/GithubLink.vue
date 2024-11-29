<template>
  <a
    class="flex items-center px-2 underline hover:bg-primary-50"
    href="https://github.com/sebaMe/st-league"
    target="_blank"
    ><BaseIcon icon="github" /><span v-if="label" class="ml-1">GitHub</span>
  </a>
</template>

<script setup lang="ts">
import BaseIcon from "./BaseIcon.vue";

withDefaults(
  defineProps<{
    label?: boolean;
  }>(),
  {
    label: true
  }
);
</script>
