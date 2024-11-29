<template>
  <div class="flex items-center">
    <BaseSelect
      v-model="selectedSeason"
      :options="seasonOptions"
      empty-message="no available seasons"
    >
      <template #footer>
        <BaseButton
          icon-left="add"
          class="h-full justify-start pl-3"
          variant="plain"
          fluid
          @click="isVisible = true"
        >
          <span class="font-content">New Season</span>
        </BaseButton>
      </template>
    </BaseSelect>

    <BaseDialog
      v-model:visible="isVisible"
      title="Create New Season"
      label-confirm="Create"
      :allow-confirm="seasonRangeIsValid"
      @confirm="createSeason"
    >
      <div class="flex-col">
        <div class="text-xl">
          The selected season lasts
          <span class="text-primary">{{ seasonDays }} days</span>, will start on
          <span class="text-primary">{{ seasonStartInfo }}</span> and end on
          <span class="text-primary">{{ seasonEndInfo }}</span
          >.
        </div>
        <DatePicker
          v-model="dates"
          inline
          size="small"
          selection-mode="multiple"
          fluid
          :max-date-count="3"
          :min-date="minSeasonStartDate"
        >
          <template #date="{ date }">
            <span
              v-if="isDateInSelectedRange(date)"
              class="w-5 bg-primary-100 text-center text-primary"
              >{{ date.day }}</span
            >
            <template v-else>{{ date.day }}</template>
          </template>
        </DatePicker>
      </div>
    </BaseDialog>
  </div>
</template>

<script setup lang="ts">
import { Timestamp } from "firebase/firestore";
import DatePicker, { DatePickerDateSlotOptions } from "primevue/datepicker";
import { computed, ref, watch } from "vue";

import { useConfigStore } from "../stores/config.store";
import {
  DateFormats,
  getDaysInBetween,
  getFormattedDate,
  getPrevOrFutureDate
} from "../utils/date.utils";
import BaseButton from "./BaseButton.vue";
import BaseDialog from "./BaseDialog.vue";
import BaseSelect, { IBaseSelectOption } from "./BaseSelect.vue";

const configStore = useConfigStore();

const isVisible = ref(false);
const dates = ref<Date[]>([]);

const seasonsAmount = computed(
  () => configStore.orderedSeasonList?.length ?? 0
);

const seasonOptions = computed(() => [
  ...configStore.orderedSeasonList.map<IBaseSelectOption>((season, index) => ({
    label: `Season #${seasonsAmount.value - index}`,
    value: season.id,
    icon: season.end.toDate() < new Date() ? "lock" : "logo"
  })),
  {
    label: "All Games",
    value: undefined,
    icon: "book"
  } as IBaseSelectOption
]);

const selectedSeason = ref<IBaseSelectOption>();

const seasonStartDate = computed(() => dates.value[0]);
const seasonEndDate = computed(() => dates.value[1]);

const formattedSeasonStartDate = getFormattedDate(
  seasonStartDate,
  DateFormats.DATE
);
const seasonStartInfo = computed(() =>
  seasonStartDate.value ? formattedSeasonStartDate.value : "??"
);

const formattedSeasonEndDate = getFormattedDate(
  seasonEndDate,
  DateFormats.DATE
);
const seasonEndInfo = computed(() =>
  seasonEndDate.value ? formattedSeasonEndDate.value : "??"
);

const minSeasonStartDate = computed(() => getPrevOrFutureDate(-7));

const seasonRangeIsValid = computed(
  () => seasonStartDate.value < seasonEndDate.value
);
const seasonDays = computed(
  () => getDaysInBetween(seasonStartDate.value, seasonEndDate.value) ?? "??"
);

const isDateInSelectedRange = (date: DatePickerDateSlotOptions) => {
  const dateSlotDate = new Date(date.year, date.month, date.day);
  return (
    dateSlotDate > seasonStartDate.value && dateSlotDate < seasonEndDate.value
  );
};

const createSeason = () => {
  configStore.createSeason({
    start: Timestamp.fromDate(seasonStartDate.value),
    end: Timestamp.fromDate(seasonEndDate.value)
  });
};

const emit = defineEmits<{
  (e: "select", selectedSeasonId: string | undefined): void;
}>();

watch(isVisible, (visible) => {
  if (visible) {
    dates.value = [new Date()];
  }
});

watch(
  selectedSeason,
  (season) => {
    emit("select", season?.value);
  },
  { immediate: true }
);

watch(
  seasonOptions,
  (options) => {
    if (!selectedSeason.value) {
      selectedSeason.value = options[0];
    }
  },
  { immediate: true }
);

// Using the third date to make date-selection more intuitiv by enabling to move the end-date around
watch(dates, ([startDate, endDate, additionalDate]) => {
  if (additionalDate) {
    dates.value = [startDate, additionalDate];
  }
  if (startDate > endDate) {
    dates.value = [startDate];
  }
});
</script>

<style></style>
