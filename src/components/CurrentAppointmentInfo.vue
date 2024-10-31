<template>
  <h1 class="appointment-doc-info">
    Confirm your appointment with <strong>{{ doctorFullName }}</strong>
  </h1>

  <div
    class="appointment-date-container"
    :class="{
      'appointment-date-container--is-loading': loading
    }"
  >
    <IconCalendar />
    <IconSpinner />

    {{ formattedDate }}
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { AppointmentInfo } from '@/services/appointment.types';

import IconCalendar from './icons/IconCalendar.vue';
import IconSpinner from './icons/IconSpinner.vue';
import dateFilter from '@/utils/dateFilter';

export interface Props {
  loading?: boolean;
  appointment: AppointmentInfo;
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
});

const doctorFullName = computed<string>(() => {
  const { prefix, name, lastName } = props.appointment.doctor;

  return [
    prefix,
    name,
    lastName,
  ].join(' ');
});

const formattedDate = computed(() => {
  return dateFilter(props.appointment.appointment.start);
});
</script>

<style scoped lang="scss">
.appointment-doc-info {
  font-size: 1.5rem;
}

.appointment-date-container {
  background-color: #fff;
  border-radius: var(--radius-md);
  padding: 24px 20px;
  display: flex;
  flex-direction: row;
  gap: 0.75rem;
  font-size: 1rem;

  & > svg {
    &:nth-child(2) {
      display: none;
    }
  }

  &--is-loading {
    text-decoration: line-through;

    & > svg {
      &:nth-child(1) {
        display: none;
      }

      &:nth-child(2) {
        display: block;
        animation: 1s spin-animation infinite linear;
      }
    }
  }
}

</style>
