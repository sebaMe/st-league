<template>
  <div class="flex items-center">
    <BaseSelect v-model="selectedSeason" :options="seasonOptions" />
    <BaseButton
      icon-right="edit"
      class="h-full px-2"
      variant="plain"
      @click="showSeasonEditor = true"
    />
    <BaseDialog
      v-model:visible="showSeasonEditor"
      title="Create a Season"
      label-confirm="Save"
      :closable="false"
    >
      COMING SOON!
    </BaseDialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import BaseButton from "./BaseButton.vue";
import BaseDialog from "./BaseDialog.vue";
import BaseSelect, { IBaseSelectOption } from "./BaseSelect.vue";

const showSeasonEditor = ref(false);

const seasonOptions: IBaseSelectOption[] = [
  { label: "Season #1", value: "s1" },
  { label: "Season #2", value: "s2" },
  { label: "Season #3", value: "s3" }
];
const selectedSeason = ref<IBaseSelectOption>(seasonOptions[0]);
</script>

<style></style>
