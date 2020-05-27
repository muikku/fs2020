import patientData from '../data/patients';
import { PatientEntryNoSSN, Patient, NewPatientEntry } from '../types';

const findById = (id: string): Patient | undefined => 
patientData.find( p => p.id === id );

const getEntries = (): PatientEntryNoSSN[] => {
  return patientData. map(({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }) => ({
    id: id,
    name: name,
    dateOfBirth: dateOfBirth,
    gender: gender,
    occupation: occupation,
    entries
  }));
};

const addEntry = ( entry: NewPatientEntry ): Patient => {
  const newPatientEntry = {
    id: `${entry.toString(), patientData.length+1}`,
    ...entry
  };
  patientData.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getEntries,
  addEntry,
  findById
};