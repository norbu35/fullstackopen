interface Result {
  periodLength: number;
  trainingDays: number;
  target: number;
  average: number;
  targetReached: boolean;
  rating: number;
}

export const calculateExercises = (weeklyExercise: number[]): Result => {
  const periodLength: number = weeklyExercise.length;
  let trainingDays = 0;
  let average = 0;
  let targetReached = false;
  const target = 2;

  weeklyExercise.forEach((day) => {
    if (day) trainingDays++;
  });

  const sum = weeklyExercise.reduce((prev, acc) => {
    acc += prev;
    return acc;
  });

  average = sum / weeklyExercise.length;

  if (average >= target) targetReached = true;
  if (average < target) targetReached = false;
  const rating = target / average;

  const Result = {
    periodLength,
    trainingDays,
    target,
    average,
    targetReached,
    rating,
  };

  return Result;
};

const weeklyExercise = process.argv.filter((arg) => typeof arg === 'number');
console.log(weeklyExercise);
