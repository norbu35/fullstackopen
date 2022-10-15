import express from 'express';
import diagnosesRouter from '../routes/diagnosesRouter';
import patientsRouter from '../routes/patientsRouter';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
