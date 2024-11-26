<template>
  <div class="relative">
    <div
      class="flex items-center bg-white"
      :class="pt.content"
      :style="clipPathStyle"
    >
      <slot></slot>
    </div>
    <div
      class="absolute left-1 top-1 -z-10 size-full bg-black"
      :style="clipPathStyle"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    tl?: string;
    tr?: string;
    bl?: string;
    br?: string;
    pt?: { content: string };
  }>(),
  {
    tl: "0",
    tr: "0",
    bl: "100",
    br: "100",
    pt: () => ({ content: "" })
  }
);

const clipPathStyle = computed(() => ({
  clipPath: `polygon(0 ${props.tl}px, 100% ${props.tr}px, 100% ${props.br}%, 0% ${props.bl}%)`
}));
</script>

<style></style>
