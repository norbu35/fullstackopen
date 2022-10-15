import { State } from './state';
import { Patient, Diagnose } from '../types';

export type Action =
  | {
      type: 'SET_PATIENT_LIST';
      payload: Patient[];
    }
  | {
      type: 'ADD_PATIENT';
      payload: Patient;
    }
  | {
      type: 'UPDATE_PATIENT';
      payload: Patient;
    }
  | {
      type: 'SET_DIAGNOSES_LIST';
      payload: Diagnose[];
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_PATIENT_LIST':
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case 'ADD_PATIENT':
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case 'UPDATE_PATIENT':
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: {
            ...action.payload,
            ssn: action.payload.ssn,
            entries: action.payload.entries,
          },
        },
      };
    case 'SET_DIAGNOSES_LIST':
      return {
        ...state,
        diagnoses: [...action.payload],
      };
    default:
      return state;
  }
};

export const setPatientList = (payload: Patient[]): Action => {
  return { type: 'SET_PATIENT_LIST', payload: payload };
};

export const addPatient = (payload: Patient): Action => {
  return { type: 'ADD_PATIENT', payload: payload };
};

export const updatePatient = (payload: Patient): Action => {
  return { type: 'UPDATE_PATIENT', payload: payload };
};

export const setDiagnosesList = (payload: Diagnose[]): Action => {
  return { type: 'SET_DIAGNOSES_LIST', payload: payload };
};
