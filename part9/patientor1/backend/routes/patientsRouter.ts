import express from 'express';
import patientService from '../services/patientsService';

const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res) => {
  res.send(patientService.getEntries());
});

patientsRouter.get('/:id', (req, res) => {
  const id = req.params.id;
  res.send(patientService.getEntry(id));
});

patientsRouter.post('/:id/entries', (req, _res) => {
  const id = req.params.id;
});

export default patientsRouter;
