import moment from "moment";
import { ActiveUser } from "./interfaces";

const json: any[] = require("./actives_june_22.json");

const minDate = moment("2022-06-01");

const users: ActiveUser[] = json.map((e: any) => ({
  country: e.country,
  lastOpen: moment(e.lastOpen, 'x'),
  opens: e.opens,
  opensByDate: e.opensByDate,
  os: e.os,
  version: e.v,
}));

const actives = users.filter(e => e.lastOpen.isAfter(minDate));

export default actives;