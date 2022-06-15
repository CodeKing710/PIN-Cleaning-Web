//PATH: origin/
const main = require("express").Router();

//Routes
main.get('/', (req, res) => {
  res.status(200).render('home');
});

main.get('/about', (req, res) => {
  res.status(200).render('about');
});

module.exports = main;
