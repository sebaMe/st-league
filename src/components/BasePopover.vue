<template>
  <slot name="actor" :toggle="popOverEl?.toggle"></slot>
  <Popover ref="popOverEl" class="text-center font-content text-xl">
    <slot></slot>
  </Popover>
</template>

<script setup lang="ts">
import Popover from "primevue/popover";
import { useTemplateRef } from "vue";

const popOverEl = useTemplateRef("popOverEl");
</script>

<style></style>
