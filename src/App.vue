<template>
  <main>
    <div v-if="loadingData" class="app-loader">
      <IconSpinner
        color="currentColor"
        :width="64"
        :height="64"
      />

      Loading data
    </div>

    <template v-else>
      <CurrentAppointmentInfo
        :appointment="appointmentInfo"
        :loading="updatingAppointment"
      />

      <section>
        <strong>Did you have an unexpected situation?</strong>
        <p>You can change the appointment for when it suits you better</p>
      </section>

      <CommonCarousel>
        <DaySlots
          v-for="(slotsInfo, day) in weekSlots"
          :key="day"
          :day="day"
          :daySlots="slotsInfo"
          :selected="selectedWeekDay"
          :appointment-date="appointmentInfo.appointment.start"
          @on-date-selected="(val) => selectedWeekDay = val"
        />
      </CommonCarousel>

      <template v-if="selectedWeekDay">
        <section>
          <strong>Reschedule</strong>
          <p>Click the button to confirm</p>
        </section>

        <CommonButton
          block
          :disabled="updatingAppointment"
          @click="onSubmit"
        >
          {{ dateFilter(selectedWeekDay.Start)  }}
        </CommonButton>
      </template>
    </template>
  </main>

  <footer>
    <svg width="210" height="34" viewBox="0 0 210 34" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMid meet"><path d="M198.468 11.181v3.035h6.945l-7.368 10.732v2.207h11.955v-3.035h-7.626l7.396-10.699v-2.24h-11.301zm-10.863 0v15.973h3.644v-7.992c0-2.005 1.53-4.215 4.862-4.866v-3.354c-2.288.126-4.253 1.634-5.059 2.811h-.033l-.258-2.572h-3.155zm-14.353-.309c1.583-.131 3.3-.17 4.958-.17 3.906 0 6.237 1.51 6.237 5.777v10.675h-3.276l-.163-1.598h-.043c-1.123 1.21-2.755 1.917-4.845 1.917-2.768 0-4.967-1.793-4.967-5.345 0-3.304 2.755-6.381 9.651-4.917v-.962c0-1.904-1.116-2.436-3.315-2.436-1.35 0-2.495.091-4.236.24v-3.182zm7.551 8.867c-2.921-.743-5.843.17-5.843 2.428 0 1.498.994 2.378 2.476 2.312 1.168-.052 2.454-.57 3.367-1.379v-3.361zm-19.878 1.652c.463-.296.991-.626 1.487-1.021l3.999 6.784h4.098l-5.387-9.123c1.983-1.943 3.602-4.216 4.957-6.85h-3.867c-1.355 2.404-3.272 4.644-5.288 6.356v-12.746l-3.643.422v21.94h3.643v-5.764zm-20.426-2.174v-.065c0-4.912 2.391-8.449 7.336-8.449 4.585 0 6.714 2.653 6.714 8.22 0 .589-.041 1.403-.105 2.003h-10.123c.262 2.25 1.573 3.594 4.264 3.594 1.703 0 3.303-.159 4.786-.353v3.051c-1.666.261-3.08.417-4.882.417-5.24 0-7.991-2.62-7.991-8.417zm3.766-1.008h6.583c0-2.499-.655-4.472-3.111-4.472-2.554 0-3.406 2.105-3.471 4.472zm-16.478-13.417v22.362h11.815v-3.616h-7.834v-18.746h-3.981zm-16.215 6.389c1.153 4.545 3.853 13.114 5.264 16.452-.912 2.063-2.387 3.106-5.165 2.951v2.865c5.997.804 7.628-3.66 8.76-6.295 1.132-2.636 4.018-11.428 5.204-15.973h-3.82c-.659 2.997-2.305 8.892-3.162 11.889h-.066c-.889-2.964-2.536-8.859-3.162-11.889h-3.853zm-15.893 0v15.973h3.644v-8.401c0-2.543 1.985-4.577 3.765-4.702 1.964-.138 2.964.879 2.964 3.476v9.626h3.644v-10.377c0-4.069-1.87-6.075-5.637-6.075-2.231 0-4.075 1.259-4.953 2.636h-.043c-.065-.571-.212-2.156-.212-2.156h-3.171zm-14.353-.309c1.583-.131 3.3-.17 4.958-.17 3.906 0 6.237 1.51 6.237 5.777v10.675h-3.276l-.163-1.598h-.043c-1.123 1.21-2.755 1.917-4.845 1.917-2.768 0-4.967-1.793-4.967-5.345 0-3.304 2.755-6.381 9.65-4.917v-.962c0-1.904-1.116-2.436-3.315-2.436-1.35 0-2.495.091-4.236.24v-3.182zm7.551 8.867c-2.921-.743-5.843.17-5.843 2.428 0 1.498.994 2.378 2.476 2.312 1.168-.052 2.454-.57 3.367-1.379v-3.361zm-26.023-8.557v15.973h3.644v-8.401c0-2.543 1.985-4.577 3.765-4.702 1.964-.138 2.964.879 2.964 3.476v9.626h3.644v-10.377c0-4.069-1.87-6.075-5.637-6.075-2.231 0-4.075 1.259-4.953 2.636h-.043c-.065-.571-.212-2.156-.212-2.156h-3.171zm-17.541-6.389v3.616h9.356l-9.945 15.657v3.089h15.121v-3.616h-10.086l9.92-15.727v-3.019h-14.366zm-26.71 21.027l5.272 6.127 5.255-3.818-5.13-8.488c-2.317 1.429-4.589 4.199-5.396 6.179zm-7.578 6.118c4.332-8.834 12.605-15.378 22.519-17.331l-2.015-6.206c-12.028 1.358-22.261 8.648-27.737 18.884l7.233 4.652zm1.579-21.069l-10.598-2.495-2.006 6.188 7.358 3.106c1.509-1.526 3.196-2.857 5.05-3.994 2.512-1.544 4.705-2.566 8.433-3.844l-.826-9.828h-6.498l-.914 10.868z" fill="#fff" /></svg>
  </footer>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { AppointmentInfo, WeekDay, WeeklySlotsResponse } from './services/appointment.types';

import { getAppointmentInfo, getWeeklySlots, bookAppointment } from './services/appointmentService';
import dateFilter from './utils/dateFilter';

import CurrentAppointmentInfo from './components/CurrentAppointmentInfo.vue';
import CommonCarousel from './components/common/CommonCarousel.vue';
import IconSpinner from './components/icons/IconSpinner.vue';
import DaySlots from './components/DaySlots.vue';
import CommonButton from './components/common/CommonButton.vue';

const today = new Date();

const loadingData = ref(true);

const updatingAppointment = ref(false);

const weekSlots = ref<WeeklySlotsResponse>({});

const appointmentInfo = ref<AppointmentInfo>({} as AppointmentInfo);

const selectedWeekDay = ref<WeekDay | null>(null);

onMounted(async () => {
  loadingData.value = true;
  appointmentInfo.value = await getAppointmentInfo();
  const currentWeek = await getWeeklySlots(today);
  const nextWeek = await getWeeklySlots(new Date(today.setDate(today.getDate() + 7)));

  weekSlots.value = {
    ...currentWeek,
    ...nextWeek,
  };

  loadingData.value = false;
});

async function onSubmit () {
  updatingAppointment.value = true;

  const { status } = await bookAppointment({
    patient: appointmentInfo.value.patient,
    comments: '',
    start: selectedWeekDay.value!.Start,
    end: selectedWeekDay.value!.End,
  });

  if (status === 200) {
    appointmentInfo.value.appointment.start = selectedWeekDay.value!.Start;
    appointmentInfo.value.appointment.end = selectedWeekDay.value!.End;
    selectedWeekDay.value = null;
  }

  updatingAppointment.value = false;
}
</script>

<style scoped lang="scss">
section {
  font-size: 1.25rem;
}

.app-loader {
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-size: 3rem;
  color: var(--color-primary);
  padding-top: 36%;
  align-items: center;

  & > svg {
    animation: 1s spin-animation infinite linear;
  }
}
</style>
