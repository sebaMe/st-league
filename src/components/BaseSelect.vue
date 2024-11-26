<template>
  <FloatLabel
    class="relative mt-4 w-44 border-2 border-dashed border-primary"
    variant="on"
  >
    <Select
      v-model="model"
      class="size-full border-none outline-0"
      :options
      option-label="label"
      :pt="{
        listContainer: 'text-center font-content text-xl'
      }"
    >
      <template #dropdownicon>
        <BaseIcon icon="arrow_lower" />
      </template>
      <template #value>
        <div class="flex pt-2">
          <BaseIcon v-if="model?.icon" class="mr-2" :icon="model?.icon" />
          <span class="font-content text-xl">{{ model?.label }}</span>
        </div>
      </template>
      <template #option="{ option }">
        <BaseIcon v-if="option?.icon" class="mr-2" :icon="option?.icon" />
        <span>{{ option?.label }}</span>
      </template>
    </Select>
    <label class="text-xl">{{ label }}</label>
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
    label: string;
    options: IBaseSelectOption[];
  }>(),
  {
    options: () => []
  }
);

const model = defineModel<IBaseSelectOption>();
</script>

<style></style>
