const cart = require('express').Router();
const {User} = require('../../models');

cart.get('/', async (req,res) => {
  try {
    const user = await User.findOne({username: req.session.userid});
    res.render('cart/index', {user: user});
  }catch (e) {
    console.log("Unable to retrieve user's cart: "+e);
  }
});

module.exports = cart;