//PATH: origin/auth
const auth = require("express").Router();

//Routes
auth.get('/', (req,res) => {
  res.write("<h1>This shouldn't have a view but will post for when users sign-up or login!</h1>")
});

module.exports = auth;