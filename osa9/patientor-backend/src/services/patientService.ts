import patientData from '../data/patients';
import { PatientEntryNoSSN } from '../types';


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

const addEntry = (): null => {
  return null;
};

export default {
  getEntries,
  addEntry
};