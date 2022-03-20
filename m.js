const moment = require("moment");

console.log(moment().format("hh:mm:ss"))
// console.log(moment().format("LTS"))

const m = moment("13:00", "hhmm").format("hh:mm")

console.log(m > moment().format("hh:mm:ss"))

console.log(moment().add(10, "minutes").format("hh:mm"))