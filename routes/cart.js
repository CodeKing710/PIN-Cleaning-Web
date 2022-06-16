//PATH: origin/cart
const cart = require("express").Router();

//Routes
cart.get('/', (req,res) => {
  res.render('cart');
});

module.exports = cart;