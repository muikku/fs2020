import patientData from '../data/patients';
import { PatientEntryNoSSN, PatientEntry, NewPatientEntry } from '../types';

const findById = (id: string): PatientEntry | undefined => 
patientData.find( p => p.id === id );

const getEntries = (): PatientEntryNoSSN[] => {
  return patientData. map(({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }) => ({
    id: id,
    name: name,
    dateOfBirth: dateOfBirth,
    gender: gender,
    occupation: occupation
  }));
};

const addEntry = ( entry: NewPatientEntry ): PatientEntry => {
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