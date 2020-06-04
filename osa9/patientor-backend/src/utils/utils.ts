/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatientEntry, Gender, Entry } from '../types';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const toNewPatientEntry = (object: any): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseString(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseString(object.ssn), 
    gender: parseGender(object.gender),
    occupation: parseString(object.occupation),
    entries: parseEntries(object.entries)
  };
  return newEntry;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const toNewPatientVisit = (object: any): Entry => {
  if(!object || !hasType(object)){
    throw new Error('Expected entry, object or type field missing.');
  }
  const basefields = ['description', 'date', 'specialist'];
  switch(object.type){
    case 'HealthCheck':
      if(checkManyFields(object, [...basefields, 'healthCheckRating'])){
        const asEntry: Entry = {
          ...object
        };
        return asEntry;
      } else {
        throw new Error('Missing fields on HealthCheck entry.');
      }
    case 'Hospital':
      if(checkManyFields(object, [...basefields, 'discharge'])){
        const asEntry: Entry = {
          ...object
        };
        return asEntry;
      } else {
        throw new Error('Missing fields on Hospital entry.');
      }
    case 'OccupationalHealthcare':
      if(checkManyFields(object, [...basefields, 'employerName'])){
        const asEntry: Entry = {
          ...object
        };
        return asEntry;
      } else {
        throw new Error('Missing fields on OccupationalHealthcare entry.');
      }
    default:
      throw new Error('Unexpected type of entry encountered.');
  }
};

const checkManyFields = (obj: any, fields: string[]): obj is Entry => {
  let containsField = true;
  fields.forEach(field => {
    if(!hasField(obj, field)){
      containsField = false;
    } 
  });
  return containsField;
};

const hasField = (obj: any, field: string): obj is Entry => Object.keys(obj).includes(field);

const hasType = (obj: any): obj is Entry => {
  return Object.keys(obj).includes('type');
};

const parseEntries = (obj: any): Entry[] => {
  if(!obj){
    return [];
  }
  if(!isArrayOfEntries(obj)){
    throw new Error('Unexpected or missing value.');
  }
  
  return obj;
};

const isString = (text: any): text is string => 
typeof text === 'string' || text instanceof String;

const parseString = (obj: any): string => {
  if(!obj || !isString(obj)) {
    throw new Error(`Unexpected or missing value.`);
  }

  return obj;
};

const isArrayOfEntries = (list: any): list is Array<Entry> => {
  if(list instanceof Array){
    if(list.length > 0){
      let containsNonString = false;

      for(const obj of list){
        if(!hasType(obj)){
          containsNonString = true;
        }
      }
      return !containsNonString;
    }
    ///its empty array
    return true;
  }
  return false;
};

const isDate = (date: string): boolean => 
Boolean(Date.parse(date));

const parseDate = (date: any): string => {
  if(!date || !isString(date) || !isDate(date)){
    throw new Error('Incorrect or missing date');
  }
  return date;
};

const isGender = (param: any): param is Gender => 
Object.values(Gender).includes(param);

const parseGender = (gender: any): Gender => {
  if(!gender || !isGender(gender)){
    throw new Error('Incorrect of missing gender.');
  }
  return gender;
};
