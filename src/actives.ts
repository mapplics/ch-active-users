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
  users: julyUsers.filter(e => e.lastOpen.isSameOrAfter(julyStart, 'day')),
};



const august: any[] = require("./actives_august_22.json");
const augustStart = moment("2022-08-01");
const augustFinish = moment("2022-08-31");
const augustUsers: ActiveUser[] = august.map((e: any) => ({
  country: e.country,
  lastOpen: moment(e.lastOpen, 'x'),
  opens: e.opens,
  opensByDate: e.opensByDate,
  os: e.os,
  version: e.v,
}));

const augustData: MonthData = {
  label: "Agosto 2022",
  start: augustStart,
  finish: augustFinish,
  users: augustUsers.filter(e => e.lastOpen.isSameOrAfter(augustStart, 'day')),
};


const september: any[] = require("./actives_september_22.json");
const septemberStart = moment("2022-09-01");
const septemberFinish = moment("2022-09-30");
const septemberUsers: ActiveUser[] = september.map((e: any) => ({
  country: e.country,
  lastOpen: moment(e.lastOpen, 'x'),
  opens: e.opens,
  opensByDate: e.opensByDate,
  os: e.os,
  version: e.v,
}));

const septemberData: MonthData = {
  label: "Septiembre 2022",
  start: septemberStart,
  finish: septemberFinish,
  users: septemberUsers.filter(e => e.lastOpen.isSameOrAfter(septemberStart, 'day')),
};


const october: any[] = require("./actives_october_22.json");
const octoberStart = moment("2022-10-01");
const octoberFinish = moment("2022-10-31");
const octoberUsers: ActiveUser[] = october.map((e: any) => ({
  country: e.country,
  lastOpen: moment(e.lastOpen, 'x'),
  opens: e.opens,
  opensByDate: e.opensByDate,
  os: e.os,
  version: e.v,
}));

const octoberData: MonthData = {
  label: "Octubre 2022",
  start: octoberStart,
  finish: octoberFinish,
  users: octoberUsers.filter(e => e.lastOpen.isSameOrAfter(octoberStart, 'day')),
};


export default [octoberData, septemberData, augustData, julyData, juneData];