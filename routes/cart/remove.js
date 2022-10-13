const remove = require('express').Router();
const {User} = require('../../models');

remove.post('/remove', async (req,res) => {
  console.log(req.body);
  req.body.price = Number(req.body.price);
  req.body.qty = Number(req.body.qty);

  try {
    let userdata = await User.findOne({username: req.session.userid});
    // console.log(userdata.cart);
    for(let i = 0; i < userdata.cart.length; i++) {
      if(userdata.cart[i].get('name') === req.body.name && userdata.cart[i].get('item') === req.body.item && userdata.cart[i].get('qty') === req.body.qty && userdata.cart[i].get('price') === req.body.price) {
        userdata.cart.splice(i,i+1);;
        break;
      }
    }
    // console.log(userdata.cart);
    userdata = await User.findOneAndUpdate({username: req.session.userid},{cart: userdata.cart});
    res.json({data: userdata});
  } catch (e) {
    console.log("Couldn't remove item from cart: "+e);
  }
});

remove.post('/clear', async (req,res) => {
  try {
    const userdata = await User.findOneAndUpdate({username: req.session.userid},{cart: []});
    res.json({data: userdata});
  } catch (e) {
    console.log("Couldn't clear cart: "+e);
  }
});

module.exports = remove;