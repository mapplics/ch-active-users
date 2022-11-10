import moment from "moment";
import { ActiveUser, MonthData } from "../interfaces";

const monthsData: MonthData[] = [];

/// Datos Junio 2022
///
const june22: any[] = require("./actives_2022_06.json");
const june22Start = moment("2022-06-01");
const june22Finish = moment("2022-06-30");
const june22Users: ActiveUser[] = june22.map((e: any) => ({
  country: e.country,
  lastOpen: moment(e.lastOpen, 'x'),
  opens: e.opens,
  opensByDate: e.opensByDate,
  os: e.os,
  version: e.v,
}));

const june22Data: MonthData = {
  label: "Junio 2022",
  start: june22Start,
  finish: june22Finish,
  users: june22Users.filter(e => e.lastOpen.isAfter(june22Start)),
};
monthsData.push(june22Data);


/// Datos Julio 2022
///
const july22: any[] = require("./actives_2022_07.json");
const july22Start = moment("2022-07-01");
const july22Finish = moment("2022-07-31");
const july22Users: ActiveUser[] = july22.map((e: any) => ({
  country: e.country,
  lastOpen: moment(e.lastOpen, 'x'),
  opens: e.opens,
  opensByDate: e.opensByDate,
  os: e.os,
  version: e.v,
}));

const july22Data: MonthData = {
  label: "Julio 2022",
  start: july22Start,
  finish: july22Finish,
  users: july22Users.filter(e => e.lastOpen.isSameOrAfter(july22Start, 'day')),
};
monthsData.push(july22Data);


/// Datos Agosto 2022
///
const august22: any[] = require("./actives_2022_08.json");
const august22Start = moment("2022-08-01");
const august22Finish = moment("2022-08-31");
const august22Users: ActiveUser[] = august22.map((e: any) => ({
  country: e.country,
  lastOpen: moment(e.lastOpen, 'x'),
  opens: e.opens,
  opensByDate: e.opensByDate,
  os: e.os,
  version: e.v,
}));

const august22Data: MonthData = {
  label: "Agosto 2022",
  start: august22Start,
  finish: august22Finish,
  users: august22Users.filter(e => e.lastOpen.isSameOrAfter(august22Start, 'day')),
};
monthsData.push(august22Data);

/// Datos Septiembre 2022
///
const september22: any[] = require("./actives_2022_09.json");
const september22Start = moment("2022-09-01");
const september22Finish = moment("2022-09-30");
const september22Users: ActiveUser[] = september22.map((e: any) => ({
  country: e.country,
  lastOpen: moment(e.lastOpen, 'x'),
  opens: e.opens,
  opensByDate: e.opensByDate,
  os: e.os,
  version: e.v,
}));

const september22Data: MonthData = {
  label: "Septiembre 2022",
  start: september22Start,
  finish: september22Finish,
  users: september22Users.filter(e => e.lastOpen.isSameOrAfter(september22Start, 'day')),
};
monthsData.push(september22Data);

/// Datos Octubre 2022
///
const october22: any[] = require("./actives_2022_10.json");
const october22Start = moment("2022-10-01");
const october22Finish = moment("2022-10-31");
const october22Users: ActiveUser[] = october22.map((e: any) => ({
  country: e.country,
  lastOpen: moment(e.lastOpen, 'x'),
  opens: e.opens,
  opensByDate: e.opensByDate,
  os: e.os,
  version: e.v,
}));

const october22Data: MonthData = {
  label: "Octubre 2022",
  start: october22Start,
  finish: october22Finish,
  users: october22Users.filter(e => e.lastOpen.isSameOrAfter(october22Start, 'day')),
};
monthsData.push(october22Data);

/// Datos Noviembre 2022
///

const november22: any = require("./actives_2022_11.json");
const november22Start = moment("2022-11-01");
const november22Finish = moment("2022-11-30");
const november22Users: ActiveUser[] = november22.users.map((e: any) => ({
  country: e.country,
  lastOpen: moment(e.lastOpen, 'x'),
  opens: e.opens,
  opensByDate: e.opensByDate,
  os: e.os,
  version: e.v,
}));

const november22Data: MonthData = {
  label: "Noviembre 2022",
  start: november22Start,
  finish: november22Finish,
  updated: moment(november22.date),
  users: november22Users,
};
monthsData.push(november22Data);


export default monthsData.reverse();