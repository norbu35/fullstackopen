const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / (height / 100) ** 2;

  if (bmi < 18.5) return `${bmi} - Underweight`;
  if (bmi >= 18.5 && bmi <= 24.9) return `${bmi} - Normal`;
  return `${bmi} - Overweight`;
};

export = calculateBmi;
