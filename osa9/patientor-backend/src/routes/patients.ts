/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getEntries());
});

router.get('/:id', (req, res) => {
  let result = patientService.findById(req.params.id);
  if(result && !result.entries){
    result = {...result, entries: []};
  }
  res.send(result);
});

router.post('/', (req, res) => {
  const newPatientEntry = patientService.addEntry(req.body);
  res.json(newPatientEntry);
});

export default router;