interface MultipleValues {
  heigth: number,
  weight: number
}

const parseArgs = (args: Array<string>): MultipleValues => {
  if(args.length > 4) throw new Error('Not enough arguments');
  if(args.length < 4) throw new Error('Too many arguments!');

  if(!isNaN(Number(args[2])) && !isNaN(Number(args[3]))){
    return {
      heigth: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

const calculateBmi = (heigth: number, weight: number) => {
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
  
}
try{
  const { heigth, weight } = parseArgs(process.argv);
  console.log(calculateBmi(heigth, weight));
} catch (error) {
  console.log('error occured: ', error.message);
}


