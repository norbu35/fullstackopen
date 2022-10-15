import express, { Request, Response } from 'express';
import calculateBmi from './bmiCalculator';
const app = express();

interface ReqQuery {
  height: number;
  weight: number;
}

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req: Request<null, null, null, ReqQuery>, res: Response) => {
  const { height, weight } = req.query;
  if (!(height && weight)) {
    res.json({ error: 'malformatted parameters' });
  }
  const result = calculateBmi(height, weight);
  const response = {
    weight: weight,
    height: height,
    bmi: result,
  };

  res.json(response);
});

app.listen(3003, () => {
  console.log('Server running on port 3003');
});
