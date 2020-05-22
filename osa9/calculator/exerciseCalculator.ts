

interface exerciseData {
  periodLength: number
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}


export const calculateExercises = (customerData: Array<number>): exerciseData => {
  const target = customerData[0];
  const hours = customerData.filter((_value, index) => index !== 0);
  const periodLength = hours.length;
  const trainingDays = hours.filter(hour => hour > 0).length;
  const average = hours.reduce((acc, curr) => acc += curr)/periodLength;
  const success = average >= target;
  const rating = success ? 3 : (average >= target - 0.5 ? 2 : 1);
  const ratingDescription = rating > 1 ? (rating > 2 ? 'boss.' : 'not too bad but could be better') : 'minion';
  const dataToReturn = {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
  return dataToReturn;
};
