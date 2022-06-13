//PATH: origin/
const main = require("express").Router();

//Routes
main.get('/', (req, res) => {
  res.status(200).render('home');
});

module.exports = main;
