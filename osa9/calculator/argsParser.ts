export const parseArgs = (args: Array<string>, requiredLength: number | null): Array<number> => {
  if(requiredLength){
    if(args.length > requiredLength) throw new Error('Not enough arguments');
    if(args.length < requiredLength) throw new Error('Too many arguments!');
  } else {
    if(args.length < 4) throw new Error('Not enough arguments!');
  }
    const parsedArgs = args.filter((_value, index) => index > 1).map(value => Number(value));
    if(parsedArgs.includes(NaN)){
      throw new Error('Provided values were not numbers!');
    }
    return parsedArgs;
};

export const parseInt = (given: unknown): number => Number(given);