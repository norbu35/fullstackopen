export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnose['code']>;
}

export enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3,
}

interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck';
  healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthEntry extends BaseEntry {
  type: 'OccupationalHealthcare';
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

interface HospitalEntry extends BaseEntry {
  type: 'Hospital';
  discharge: {
    date: string;
    criteria: string;
  };
}

export type Entry = HospitalEntry | OccupationalHealthEntry | HealthCheckEntry;

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: string;
  dateOfBirth: string;
  entries: Entry[];
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;
