//PATH: origin/cart
const cart = require("express").Router();

//Routes
cart.get('/', (req,res) => {
  res.write("<h1>USER CART</h1>")
});

module.exports = cart;