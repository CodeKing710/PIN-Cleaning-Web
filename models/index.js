require("dotenv").config();
const {connect, model} = require("mongoose");

connect(process.env.MDB);

exports.Service = model("Service", require("./services"));