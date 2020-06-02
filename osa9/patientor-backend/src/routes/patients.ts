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

router.post('/:id/entries', (req, res) => {
  const foundPatient = patientService.findById(req.params.id);
  if(!foundPatient || !req.body){
    console.log('Error: ', req);
    res.status(404);
  } else {
    const newPatientVisit = patientService.addVisit(req.body, foundPatient);
    res.json(newPatientVisit);
  }
});

export default router;