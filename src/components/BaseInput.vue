<template>
  <InputGroup
    class="relative mt-4 w-56 border-2 border-dashed"
    :class="invalid ? 'border-danger-500' : 'border-primary'"
  >
    <InputGroupAddon
      v-if="iconLeft || type === 'password'"
      class="border-0 text-highlight"
    >
      <BaseIcon :icon="type === 'password' ? 'lock' : iconLeft" />
    </InputGroupAddon>
    <FloatLabel variant="on">
      <InputText
        v-if="type === 'text' || type === 'password'"
        v-model="model"
        :type
        class="border-0 text-xl focus:outline-0"
      />
      <InputMask
        v-if="type === 'mask'"
        v-model="model"
        mask="aaa"
        class="border-0 text-xl focus:outline-0"
      />
      <label class="text-xl">{{ label }}</label>
    </FloatLabel>

    <InputGroupAddon
      v-if="iconRight || type === 'password'"
      class="border-0 text-highlight"
    >
      <BaseIcon
        v-if="type === 'password'"
        class="cursor-pointer"
        :icon="isPasswordVisible ? 'eye_show' : 'eye_hide'"
        @click="isPasswordVisible = !isPasswordVisible"
      />
      <BaseIcon v-else :icon="iconRight" />
    </InputGroupAddon>
  </InputGroup>
</template>

<script setup lang="ts">
import FloatLabel from "primevue/floatlabel";
import InputGroup from "primevue/inputgroup";
import InputGroupAddon from "primevue/inputgroupaddon";
import InputMask from "primevue/inputmask";
import InputText from "primevue/inputtext";
import { ref } from "vue";

import BaseIcon, { IconTypes } from "./BaseIcon.vue";

withDefaults(
  defineProps<{
    type?: "text" | "password" | "mask";
    mask?: string;
    invalid?: boolean;
    iconLeft?: IconTypes;
    iconRight?: IconTypes;
    label: string;
  }>(),
  {
    type: "text",
    invalid: false,
    iconLeft: undefined,
    iconRight: undefined,
    mask: undefined
  }
);

const model = defineModel<string>();
const isPasswordVisible = ref(false);
</script>

<style></style>
