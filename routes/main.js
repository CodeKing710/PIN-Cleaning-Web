//PATH: origin/
const main = require("express").Router();

//Routes
main.get('/', (req, res) => {
  if(process.env.NODE_ENV === "development") {
    console.log("[PINCsys]: DEV SERVER");
  } else {
    console.log("[PINCsys]: PROD SERVER");
  }
  res.status(200).render('home');
});

main.get('/about', (req, res) => {
  res.status(200).render('about/about');
});

main.get('/policies', (req,res) => {
  res.status(200).render('about/privacy')
});

main.get('/terms', (req,res) => {
  res.status(200).render('about/terms');
});

main.get('/refunds', (req,res) => {
  res.status(200).render('about/refund');
});

module.exports = main;
