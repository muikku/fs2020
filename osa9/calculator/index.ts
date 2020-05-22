import express from 'express';
import { parseInt } from './argsParser';
import { calculateBmi } from './bmiCalculator'
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!')
})

app.get('/bmi', (req, res) => {
  const weight = parseInt(req.query.weight);
  const height = parseInt(req.query.height);
  if(!(weight && height)){
    res.send(JSON.stringify({
      error: "malformatted parameters"
    }))
  }
  res.send(JSON.stringify({
    weight,
    height,
    bmi: calculateBmi(height, weight)
  }))
})

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running at portos: ${PORT}`);
})