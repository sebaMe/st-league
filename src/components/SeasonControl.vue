<template>
  <div class="flex items-center">
    <BaseSelect
      v-model="selectedSeasonOption"
      :options="seasonOptions"
      empty-message="no available seasons"
    >
      <template #value>
        <div class="flex items-center">
          <BaseIcon class="mr-2" :icon="selectedSeasonOption?.icon" />
          <div class="font-content text-xl">
            {{ selectedSeasonOption?.label }}
          </div>
        </div>
        <ProgressBar
          v-if="
            !selectedSeasonInfo.seasonEnded.value && selectedSeasonOption?.value
          "
          class="h-2"
          :value="selectedSeasonInfo.seasonProgress.value"
          :show-value="false"
        />
      </template>
      <template #footer>
        <BaseButton
          icon-left="add"
          class="h-full justify-start pl-3"
          variant="plain"
          fluid
          @click="showSeasonEditor = true"
        >
          <span class="font-content text-black">Create Season</span>
        </BaseButton>
      </template>
    </BaseSelect>
    <BaseButton
      v-if="selectedSeason"
      class="h-full"
      icon-right="info"
      variant="plain"
      @click="showSeasonInfo = true"
    />
    <BaseDialog
      v-model:visible="showSeasonInfo"
      :title="selectedSeasonOption?.label"
      :footer="false"
    >
      <span v-if="selectedSeasonInfo.seasonEnded.value" class="text-xl"
        >{{ selectedSeasonOption?.label }} ended
        <span class="text-primary">{{ formattedSelectedSeasonEndDate }}</span>
        and lasted
        <span class="text-primary"
          >{{ selectedSeasonInfo.seasonDays.value }} day(s)</span
        >.
      </span>
      <span v-else class="text-xl"
        >{{ selectedSeasonOption?.label }} started
        <span class="text-primary">{{ formattedSelectedSeasonStartDate }}</span>
        and will end
        <span class="text-primary">{{ formattedSelectedSeasonEndDate }}</span>
        with
        <span class="text-primary">{{ selectedSeasonDaysLeft }} day(s)</span>
        left in this season.
      </span>
    </BaseDialog>
    <BaseDialog
      v-model:visible="showSeasonEditor"
      title="Create New Season"
      label-confirm="Create"
      :allow-confirm="seasonRangeIsValid"
      @confirm="createSeason"
    >
      <div class="flex-col">
        <div class="text-xl">
          The new season will last
          <span class="text-primary">{{ seasonDays ?? "??" }} days</span>,
          starts on <span class="text-primary">{{ seasonStartInfo }}</span> and
          will end on <span class="text-primary">{{ seasonEndInfo }}</span
          >.
        </div>
        <DatePicker
          v-model="dates"
          inline
          selection-mode="multiple"
          :pt="{
            panel: 'border-0'
          }"
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
import ProgressBar from "primevue/progressbar";
import { computed, ref, watch } from "vue";

import { useSeasonDateInfo } from "../composables/date.composables";
import { ISeason, useConfigStore } from "../stores/config.store";
import {
  DateFormats,
  getDaysInBetween,
  getFormattedDate,
  getPrevOrFutureDate
} from "../utils/date.utils";
import BaseButton from "./BaseButton.vue";
import BaseDialog from "./BaseDialog.vue";
import BaseIcon from "./BaseIcon.vue";
import BaseSelect, { IBaseSelectOption } from "./BaseSelect.vue";

const configStore = useConfigStore();

const showSeasonEditor = ref(false);
const showSeasonInfo = ref(false);

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
    label: "Overall",
    value: undefined,
    icon: "world"
  } as IBaseSelectOption
]);

const selectedSeasonOption = ref<IBaseSelectOption>();
const selectedSeason = computed(() =>
  configStore.orderedSeasonList.find(
    (season) => season.id === selectedSeasonOption.value?.value
  )
);

// Selected Season
const selectedSeasonInfo = useSeasonDateInfo(selectedSeason);
const formattedSelectedSeasonStartDate = getFormattedDate(
  selectedSeasonInfo.seasonStartDate,
  DateFormats.DATE
);
const formattedSelectedSeasonEndDate = getFormattedDate(
  selectedSeasonInfo.seasonEndDate,
  DateFormats.DATE_TIME
);
const selectedSeasonDaysLeft = computed(() =>
  selectedSeasonInfo.seasonEndDate.value
    ? getDaysInBetween(new Date(), selectedSeasonInfo.seasonEndDate.value)
    : undefined
);

// Season Editor
const seasonStartDate = computed(() => dates.value[0]);
const seasonEndDate = computed(() => dates.value[1]);

const formattedSeasonStartDate = getFormattedDate(
  seasonStartDate,
  DateFormats.DATE_TIME
);
const seasonStartInfo = computed(() =>
  seasonStartDate.value ? formattedSeasonStartDate.value : "??"
);

const formattedSeasonEndDate = getFormattedDate(
  seasonEndDate,
  DateFormats.DATE_TIME
);
const seasonEndInfo = computed(() =>
  seasonEndDate.value ? formattedSeasonEndDate.value : "??"
);

const minSeasonStartDate = computed(() => getPrevOrFutureDate(-7));

const seasonRangeIsValid = computed(
  () => seasonStartDate.value < seasonEndDate.value
);
const seasonDays = computed(() =>
  getDaysInBetween(seasonStartDate.value, seasonEndDate.value)
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
  (e: "select", selectedSeason: ISeason | undefined): void;
}>();

watch(showSeasonEditor, (visible) => {
  if (visible) {
    dates.value = [new Date()];
  }
});

watch(
  selectedSeason,
  (season) => {
    emit("select", season);
  },
  { immediate: true }
);

watch(
  seasonOptions,
  (options) => {
    if (!selectedSeasonOption.value) {
      selectedSeasonOption.value = options[0];
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
