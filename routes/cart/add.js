const add = require('express').Router();
const {User} = require('../../models');

add.post('/add', async (req,res) => {
  req.body.qty = Number(req.body.qty);
  req.body.price = Number(req.body.price);
  try {
    const userdata = await User.findOneAndUpdate({username: req.session.userid},{$push: {cart: req.body}});
    res.json({data: userdata});
  } catch (e) {
    console.log("Unable to add to user's cart: "+e);
  }
});

module.exports = add;