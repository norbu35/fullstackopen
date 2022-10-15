import patients from '../data/patients';
import { Patient } from '../src/types';

export const getEntries = (): Patient[] => {
  return patients;
};

export const getEntry = (id: string): Patient | undefined => {
  return patients.find((p) => p.id === id);
};

export const addEntry = (id: string, entry: Entry): Patient | undefined => {
  const patientToChange = patients.find((p) => p.id === id);
  const changedPatient = {
    ...patientToChange,
    entries: [...patientToChange?.entries, entry],
  };
  patients = { ...patients, changedPatient };
};

export default { getEntries, getEntry };
