import moment from "moment";
import { ActiveUser, MonthData } from "./interfaces";

const june: any[] = require("./actives_june_22.json");
const juneStart = moment("2022-06-01");
const juneFinish = moment("2022-06-30");
const juneUsers: ActiveUser[] = june.map((e: any) => ({
  country: e.country,
  lastOpen: moment(e.lastOpen, 'x'),
  opens: e.opens,
  opensByDate: e.opensByDate,
  os: e.os,
  version: e.v,
}));

const juneData: MonthData = {
  label: "Junio 2022",
  start: juneStart,
  finish: juneFinish,
  users: juneUsers.filter(e => e.lastOpen.isAfter(juneStart)),
};



const july: any[] = require("./actives_july_22.json");
const julyStart = moment("2022-07-01");
const julyFinish = moment("2022-07-31");
const julyUsers: ActiveUser[] = july.map((e: any) => ({
  country: e.country,
  lastOpen: moment(e.lastOpen, 'x'),
  opens: e.opens,
  opensByDate: e.opensByDate,
  os: e.os,
  version: e.v,
}));

const julyData: MonthData = {
  label: "Julio 2022",
  start: julyStart,
  finish: julyFinish,
  users: julyUsers.filter(e => e.lastOpen.isSameOrAfter(julyStart, 'day') ),
};


export default [julyData, juneData];