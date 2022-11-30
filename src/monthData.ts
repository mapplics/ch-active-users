import moment from "moment";
import { MonthData } from "./interfaces";

const monthsData: MonthData[] = [];

/// Junio 2022
const june22Data: MonthData = {
  label: "Junio 2022",
  start: moment("2022-06-01"),
  finish: moment("2022-06-30"),
  jsonPath: "./data/actives_2022_06.json",
};
monthsData.unshift(june22Data);

/// Julio 2022
const july22Data: MonthData = {
  label: "Julio 2022",
  start: moment("2022-07-01"),
  finish: moment("2022-07-31"),
  jsonPath: "./data/actives_2022_07.json",

};
monthsData.unshift(july22Data);

/// Agosto 2022
const august22Data: MonthData = {
  label: "Agosto 2022",
  start: moment("2022-08-01"),
  finish: moment("2022-08-31"),
  jsonPath:"./data/actives_2022_08.json",
};
monthsData.unshift(august22Data);

/// Septiembre 2022
const september22Data: MonthData = {
  label: "Septiembre 2022",
  start: moment("2022-09-01"),
  finish: moment("2022-09-30"),
  jsonPath:"./data/actives_2022_09.json",
};
monthsData.unshift(september22Data);

/// Octubre 2022
const october22Data: MonthData = {
  label: "Octubre 2022",
  start: moment("2022-10-01"),
  finish: moment("2022-10-31"),
  jsonPath:"./data/actives_2022_10.json",
};
monthsData.unshift(october22Data);

/// Noviembre 2022
const november22Data: MonthData = {
  label: "Noviembre 2022",
  start: moment("2022-11-01"),
  finish: moment("2022-11-30"),
  jsonPath:"./data/actives_2022_11.json",
};
monthsData.unshift(november22Data);

export default monthsData;