export type name = string;
export type latin = string;
export type code = string;

export interface DiagnoseEntry {
  code: code,
  name: name,
  latin?: latin
}

export type id = string;
export type dateOfBirth = string;
export type ssn = string;
export type occupation = string;
export type gender = string;

export interface PatientEntry {
  id: id,
  name: name,
  dateOfBirth: dateOfBirth,
  ssn: ssn, 
  gender: gender,
  occupation: occupation;
}

export type PatientEntryNoSSN = Omit<PatientEntry, 'ssn'>;