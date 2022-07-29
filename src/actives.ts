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
  start: juneStart,
  finish: juneFinish,
  users: juneUsers.filter(e => e.lastOpen.isAfter(juneStart)),
};


export default [juneData];