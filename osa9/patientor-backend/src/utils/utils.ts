/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatientEntry, Gender, Entry, Type } from '../types';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const toNewPatientEntry = (object: any): NewPatientEntry => {
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

const isEntry = (obj: any): obj is Entry[] => 
Object.values(Type).includes(obj.type);

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
        if(!isEntry(obj)){
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

export default toNewPatientEntry;