import Api from './Api';
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import type { AppointmentForm, AppointmentInfo, WeekDay, WeeklySlotsAxiosResponse, WeeklySlotsResponse } from './appointment.types';

const DEFAULT_ERROR_MESSAGE = 'An unexpected error occurred, please try again later';

const DEFAULT_DATE_FORMAT = 'YYYY-MM-DD';

dayjs.extend(weekday);

async function getAppointmentInfo(): Promise<AppointmentInfo> {
  return Promise.resolve({
    doctor: {
      id: 1,
      name: 'Simeon',
      lastName: 'Molas',
      prefix: 'Dr.',
    },
    appointment: {
      start: new Date(),
      end: new Date(),
      comments: '',
    },
    patient: {
      name: 'John',
      lastName: 'Doe',
      email: 'john.doe@test.com',
      phone: '+1-418-543-8090',
    },
  });
}

async function getWeeklySlots(date: Date): Promise<WeeklySlotsResponse> {
  if (!date) { return Promise.reject(); }

  let currMonday = dayjs(date);

  const dateDayOfWeek = currMonday.day();

  if (dateDayOfWeek !== 1) {
    currMonday = dayjs(date).subtract(dateDayOfWeek - 1, 'day');
  }

  const defaultWeek: WeeklySlotsResponse = {
    [dayjs(currMonday).format(DEFAULT_DATE_FORMAT)]: [],
    [dayjs(currMonday).add(1, 'day').format(DEFAULT_DATE_FORMAT)]: [],
    [dayjs(currMonday).add(2, 'day').format(DEFAULT_DATE_FORMAT)]: [],
    [dayjs(currMonday).add(3, 'day').format(DEFAULT_DATE_FORMAT)]: [],
    [dayjs(currMonday).add(4, 'day').format(DEFAULT_DATE_FORMAT)]: [],
    [dayjs(currMonday).add(5, 'day').format(DEFAULT_DATE_FORMAT)]: [],
    [dayjs(currMonday).add(6, 'day').format(DEFAULT_DATE_FORMAT)]: [],
  };

  try {
    const { data } = await Api
      .get<WeeklySlotsAxiosResponse>(`/availability/GetWeeklySlots/${dayjs(currMonday).format('YYYYMMDD')}`);

    // TODO find a solution why TS can't recognize Object.groupBy
    // @ts-ignore
    const parsedData: WeeklySlotsResponse = Object.groupBy(
      data,
      (date: WeekDay) => dayjs(date.Start).format(DEFAULT_DATE_FORMAT),
    );

    return {
      ...defaultWeek,
      ...parsedData,
    };
  } catch (error) {
    return Promise.reject(DEFAULT_ERROR_MESSAGE);
  }
}

async function bookAppointment(data: AppointmentForm) {
  if (!data) { return Promise.reject(); }

  try {
    return Api.post('/availability/BookSlot', {
      Start: data.start,
      End: data.end,
      Comments: data.comments,
      Patient: {
        Name: data.patient.name,
        SecondName: data.patient.lastName,
        Email: data.patient.email,
        Phone: data.patient.phone,
      }
    });
  } catch (error) {
    return Promise.reject(DEFAULT_ERROR_MESSAGE);
  }
}

export {
  getAppointmentInfo,
  getWeeklySlots,
  bookAppointment,
};
