import diaries from '../../data/diariesData';

import { DiaryEntry, nonSensitiveDiaryEntry, NewDiaryEntry } from '../types';

const getEntries = (): Array<DiaryEntry> => {
  return diaries;
};

const getNonSensitiveDiaryEntries = (): nonSensitiveDiaryEntry[] => {
  return diaries.map(({ id, date, weather, visibility }) => ({
    id,
    date,
    weather,
    visibility,
  }));
};

const findById = (id: number): DiaryEntry | undefined => {
  const entry = diaries.find((d) => d.id === id);
  return entry;
};

const addDiary = (entry: NewDiaryEntry): DiaryEntry => {
  const newDairyEntry = {
    ...entry,
    id: Math.max(...diaries.map((d) => d.id)) + 1,
  };

  diaries.push(newDairyEntry);
  return newDairyEntry;
};

export default {
  getEntries,
  addDiary,
  getNonSensitiveDiaryEntries,
  findById,
};
