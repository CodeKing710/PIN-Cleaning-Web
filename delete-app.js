require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MDB, () => {mongoose.connection.db.dropDatabase();});