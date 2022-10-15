const diagnoses = require('../data/diagnoses.json');
import { Diagnose } from '../src/types';

export const getEntries = (): Diagnose[] => {
  return diagnoses;
};

export const addDiagnosis = () => {
  return null;
};

export default { getEntries };
