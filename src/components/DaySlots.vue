<template>
  <ul v-if="hideDaySlot" class="day-slot__container">
    <li class="day-slot__day-info">
      <p>{{ dayName }}</p>
      <p>{{ dayMonthInfo }}</p>
    </li>

    <li
      v-for="daySlot in daySlots"
      :key="daySlot.Start"
      class="day-slot__item"
      :class="{
        'day-slot__item--disabled': isDateDisabled(daySlot),
        'day-slot__item--selected': isDateSelected(daySlot),
      }"
      @click="$emit('on-date-selected', daySlot)"
    >
      {{ formatWeekDay(daySlot) }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import isTomorrow from 'dayjs/plugin/isTomorrow';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

import type { WeekDay } from '@/services/appointment.types';
import { computed } from 'vue';

dayjs.extend(isToday);
dayjs.extend(isTomorrow);
dayjs.extend(isSameOrAfter);

export interface Props {
  day: string | number;
  daySlots: WeekDay[];
  selected: WeekDay | null;
  appointmentDate: string | Date | null;
}

defineEmits<{
  'on-date-selected': [WeekDay],
}>();

const currentDate = dayjs();

const props = defineProps<Props>();

const hideDaySlot = computed(() => {
  const parsedDate = dayjs(props.day);

  if (parsedDate.isToday()) { return true; }
  return parsedDate.isSameOrAfter(currentDate);
});

const dayName = computed(() => {
  const parsedDate = dayjs(props.day);

  if (parsedDate.isToday()) { return 'Today'; }
  if (parsedDate.isTomorrow()) { return 'Tomorrow'; }

  return parsedDate.format('ddd');
});

const dayMonthInfo = computed(() => {
  return dayjs(props.day).format('DD MMM');
});

function isDateDisabled (date: WeekDay): boolean {
  const parsedDate = dayjs(date.Start);

  return !parsedDate.isSameOrAfter(currentDate) || parsedDate.isSame(props.appointmentDate);
}

function isDateSelected (date: WeekDay): boolean {
  if (!props.selected) { return false; }

  return dayjs(date.Start).isSame(props.selected.Start);
}

function formatWeekDay (date: WeekDay): string {
  return dayjs(date.Start).format('HH:mm');
}
</script>

<style scoped lang="scss">
.day-slot {
  &__container {
    padding: 0;
    margin: 0;
    list-style-type: none;
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: center;
    min-width: 80px;
    scroll-snap-align: start end;
  }

  &__day-info {
    text-align: center;

    & > p {
      &:nth-child(1) {
        font-size: 1rem;
      }

      &:nth-child(2) {
        font-size: 0.875rem;
        color: #627282;
      }
    }
  }

  &__item {
    padding: 8px 16px;
    border-radius: var(--radius-md);
    color: var(--color-secondary);
    background-color: #eef4fd;
    font-weight: 600;
    font-size: 0.875rem;
    cursor: pointer;
    transition: background-color ease-in-out 0.26s;

    &--disabled {
      text-decoration: line-through;
      font-weight: 400;
      color: var(--color-disabled);
      background-color: unset;
      pointer-events: none;
    }

    &--selected {
      pointer-events: none;
      background-color: var(--color-secondary);
      color: #fff;
    }

    &:hover {
      background-color: var(--color-secondary-hover);
    }
  }
}
</style>