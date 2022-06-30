import moment from "moment";

const json = require("./actives_anon.json");

const minDate = moment("2022-06-01");

const actives = json.filter(e => moment(e.lastOpen, 'x').isAfter(minDate));

export default actives;