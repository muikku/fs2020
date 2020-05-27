export type name = string;
export type latin = string;
export type code = string;

export interface DiagnoseEntry {
  code: code,
  name: name,
  latin?: latin
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[]
}

export type PublicPatient = Omit<Patient, 'ssn' | 'entries' >;

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

export type PatientEntryNoSSN = Omit<Patient, 'ssn'>;
export type NewPatientEntry = Omit<Patient, 'id'>;
