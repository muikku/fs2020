export const calculateBmi = (heigth: number, weight: number): string => {
  const bmi = weight / (Math.pow(heigth/100, 2));
  const between = (value: number, min: number, max: number) => (value >= min && value < max);
  if(between(bmi, 0, 15)) return "Very severely underweight";
  if(between(bmi, 15, 16)) return "Severely underweight";
  if(between(bmi, 16, 18.5)) return "Underweight";
  if(between(bmi, 18.5, 25)) return "Normal (healthy weight)";
  if(between(bmi, 25, 30)) return "Overweight";
  if(between(bmi, 30, 35)) return "Obese Class I (Moderately obese)";
  if(between(bmi, 35, 40)) return "Obese Class II (Severely obese)";
  if(between(bmi, 40,1000)) return "Obese Class III (Very severely obese)";
  return 'Inhuman.';
};





