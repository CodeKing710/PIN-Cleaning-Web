//PATH: origin/
const main = require("express").Router();

//Routes
main.get('/', (req, res) => {
  res.status(200).render('home');
  // res.status(200).render('homeUC');
});
main.get('/test', (req,res) => {
  //SWAP AFTER CONSTRUCTION
  res.status(200).render('homeUC');
  // res.status(200).render('home');
});

main.get('/about', (req, res) => {
  res.status(200).render('about');
});

module.exports = main;
