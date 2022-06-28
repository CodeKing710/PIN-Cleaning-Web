require("dotenv").config();
const {connect, model} = require("mongoose");

connect(process.env.MDB, {useUnifiedTopology: true, useNewUrlParser: true});

exports.Service = model("Service", require("./services"));