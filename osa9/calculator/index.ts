


import express, { Request, Response } from 'express';
import { parseInt } from './argsParser';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();
app.use(express.json());
app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const weight: number = parseInt(req.query.weight);
  const height: number = parseInt(req.query.height);
  if(!(weight && height)){
    res.send(JSON.stringify({
      error: "malformatted parameters"
    }));
  }
  res.send(JSON.stringify({
    weight,
    height,
    bmi: calculateBmi(height, weight)
  }));
});


app.post('/exercises', (req: Request, res: Response ) => {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hasTarget = (obj: any): obj is { target: string } => 
  !!obj && typeof obj === "object" && "target" in obj;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hasDailyExer = (obj: any): obj is { daily_exercises: Array<string> } => 
  !!obj && typeof obj === "object" && "daily_exercises" in obj;

  if(hasTarget(req.body) && hasDailyExer(req.body)){
    const { target, daily_exercises } = req.body;
    const list: Array<string> = [target].concat(daily_exercises);
    const listAsNumbers: Array<number> = list.map(value => parseInt(value));
    if(listAsNumbers.includes(NaN)){
      res.send(JSON.stringify({
        error: "malformatted parameters"
      }));
    }
    res.send(JSON.stringify(calculateExercises(listAsNumbers)));
  } else if (!hasTarget(req.body) || !hasDailyExer(req.body)){
    res.send(JSON.stringify({
      error: "parameters missing"
    }));
  } else {
    res.send(JSON.stringify({
      error: "unknown error"
    }));
  }
  
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running at portos: ${PORT}`);
});