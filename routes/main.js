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
  res.status(200).render('details/about');
});

main.get('/policies', (req,res) => {
  res.status(200).render('details/privacy')
});

main.get('/terms', (req,res) => {
  res.status(200).render('details/terms');
});

main.get('/refunds', (req,res) => {
  res.status(200).render('details/refund');
});

module.exports = main;
