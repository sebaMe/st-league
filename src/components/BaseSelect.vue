<template>
  <FloatLabel
    class="relative w-auto border-2 border-dashed border-primary"
    :class="{ 'mt-4': label }"
    variant="on"
  >
    <Select
      v-model="model"
      class="size-full border-none outline-0"
      :options
      :empty-message="emptyMessage"
      option-label="label"
      :pt="{
        listContainer: 'text-center font-content text-xl'
      }"
    >
      <template #dropdownicon>
        <BaseIcon icon="arrow_lower" size="sm" />
      </template>
      <template #value>
        <div class="flex items-center">
          <BaseIcon v-if="model?.icon" class="mr-2" :icon="model?.icon" />
          <div class="font-content text-xl">{{ model?.label }}</div>
        </div>
      </template>
      <template #option="{ option }">
        <BaseIcon v-if="option?.icon" class="mr-2" :icon="option?.icon" />
        <span>{{ option?.label }}</span>
      </template>
      <template #footer>
        <slot name="footer"></slot>
      </template>
    </Select>
    <label v-if="label" class="text-xl">{{ label }}</label>
  </FloatLabel>
</template>

<script lang="ts">
export interface IBaseSelectOption {
  label: string;
  value: string | undefined;
  icon?: IconTypes;
}
</script>
<script setup lang="ts">
import FloatLabel from "primevue/floatlabel";
import Select from "primevue/select";

import BaseIcon, { IconTypes } from "./BaseIcon.vue";

withDefaults(
  defineProps<{
    label?: string;
    emptyMessage?: string;
    options: IBaseSelectOption[];
  }>(),
  {
    label: undefined,
    emptyMessage: undefined,
    options: () => []
  }
);

const model = defineModel<IBaseSelectOption>();
</script>

<style></style>
