export type WeekDay = {
  Start: string;
  End: string;
};

export type Doctor = {
  id: number;
  name : string;
  lastName : string;
  prefix: string;
};

export type Patient = {
  name : string;
  lastName : string;
  email : string;
  phone : string;
};

export type Appointment = {
  start: string | Date;
  end: string | Date;
  comments: string;
};

export type AppointmentInfo = {
  doctor: Doctor;
  appointment: Appointment;
  patient: Patient;
};

export type AppointmentForm = {
  start: string | Date;
  end: string | Date;
  comments: string;
  patient: Patient;
};

export type WeeklySlotsResponse = {
  [x: string]: WeekDay[],
};

export type WeeklySlotsAxiosResponse = WeekDay[];
