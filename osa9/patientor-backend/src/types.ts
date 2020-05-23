export type name = string;
export type latin = string;
export type code = string;

export interface DiagnoseEntry {
  code: code,
  name: name,
  latin?: latin
}