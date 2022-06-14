//PATH: origin/
const main = require("express").Router();

//Routes
main.get('/', (req, res) => {
  res.status(200).render('home');
});

main.get('/about', (req, res) => {
  res.write("<h1>About page</h1>");
});

module.exports = main;
