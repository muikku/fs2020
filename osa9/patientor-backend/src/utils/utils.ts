/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatientEntry, Gender } from '../types';

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



const parseEntries = (obj: any): Array<string> => {
  if(!obj){
    return [];
  }
  if(!isArray(obj)){
    throw new Error(`Unexpected or missing value.`);
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

const isArray = (list: any): list is Array<string> => {
  if(list instanceof Array){
    if(list.length > 0){
      let containsNonString = false;

      for(const obj of list){
        if(!isString(obj)){
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