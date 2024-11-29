<template>
  <Dialog
    v-model:visible="isVisible"
    modal
    :position="breakpoints.isSmallerOrEqual('xs') ? 'bottom' : 'center'"
    class="m-0 w-full max-w-[40rem] font-content xs:w-auto"
    :closable
    :pt="{ footer: onlyConfirm ? 'justify-center' : '' }"
    :dismissable-mask
  >
    <template #header>
      <slot name="header">
        <div class="mr-4">
          <div class="font-header uppercase text-primary">{{ title }}</div>
          <div v-if="subtitle" class="text-xl">{{ subtitle }}</div>
        </div>
      </slot>
    </template>
    <template #closeicon>
      <BaseIcon icon="x_mark" />
    </template>
    <slot></slot>
    <template v-if="footer" #footer>
      <slot name="footer">
        <BaseButton
          v-if="!onlyConfirm"
          icon-left="x_mark"
          variant="plain"
          @click="onCancel"
        >
          <span>{{ labelCancel }}</span>
        </BaseButton>
        <BaseButton
          class="w-28"
          icon-left="check_mark"
          :disabled="!allowConfirm"
          :loading="busyConfirm"
          @click="onConfirm"
        >
          <span>{{ labelConfirm }}</span>
        </BaseButton>
      </slot>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { useBreakpoints } from "@vueuse/core";
import Dialog from "primevue/dialog";

import { screenBreakpoints } from "../constants/breakpoints.constants";
import BaseButton from "./BaseButton.vue";
import BaseIcon from "./BaseIcon.vue";

withDefaults(
  defineProps<{
    title?: string;
    subtitle?: string;
    labelConfirm?: string;
    allowConfirm?: boolean;
    busyConfirm?: boolean;
    labelCancel?: string;
    onlyConfirm?: boolean;
    dismissableMask?: boolean;
    closable?: boolean;
    footer?: boolean;
  }>(),
  {
    title: undefined,
    subtitle: undefined,
    labelConfirm: "Ok",
    labelCancel: "Cancel",
    allowConfirm: true,
    busyConfirm: false,
    onlyConfirm: false,
    closable: true,
    footer: true,
    dismissableMask: true
  }
);

const breakpoints = useBreakpoints(screenBreakpoints);
const isVisible = defineModel<boolean>("visible", { default: false });

const onConfirm = () => {
  isVisible.value = false;
  emit("confirm");
};

const onCancel = () => {
  isVisible.value = false;
  emit("cancel");
};

const emit = defineEmits<{
  (e: "confirm"): void;
  (e: "cancel"): void;
}>();
</script>

<style></style>
