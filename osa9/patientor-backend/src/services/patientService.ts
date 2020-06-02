import patientData from '../data/patients';
import { PatientEntryNoSSN, Patient, NewPatientEntry, Entry } from '../types';
import { toNewPatientVisit } from '../utils/utils';

const findById = (id: string): Patient | undefined => 
patientData.find( p => p.id === id );

const getEntries = (): PatientEntryNoSSN[] => {
  return patientData.map(({
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

const addVisit = ( visit: Entry, patient: Patient ): Patient => {
  const toEntry = toNewPatientVisit({
    id: `${patient.entries.length+1}${patient.id}`,
    ...visit});
  const updatedPatient = { ...patient, entries: patient.entries.concat(toEntry)};
  patientData.map(e => e.id === patient.id ? updatedPatient : e);
  return updatedPatient;
};

export default {
  getEntries,
  addEntry,
  findById,
  addVisit
};