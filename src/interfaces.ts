import { Moment } from "moment";

export interface ActiveUser {
  country: string;
  lastOpen: Moment;
  os: string;
  opens: number;
  version: string; 
  opensByDate: {
    [key: string]: number;
  };
}


export interface MonthData {
  users: ActiveUser[];
  start: Moment;
  finish: Moment;
  label: string;
}