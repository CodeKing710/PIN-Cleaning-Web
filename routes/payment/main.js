require('dotenv').config();

const payment = require('express').Router();
const {User} = require('../../models');
const stripe = require('stripe')(process.env.TSAPI_KEY);

payment.get('/', async (req,res) => {
  try {
    const user = await User.findOne({username: req.session.userid});
    //Calculate totals
    let priceTotal = 0;
    let chargeDesc = "";
    for(let i = 0; i < user.cart.length; i++) {
      priceTotal += (user.cart[i].get('price') * user.cart[i].get('qty'));
      //Generate description
      chargeDesc += `${user.cart[i].get('name')} - ${user.cart[i].get('item')}\n`;
    }

    //Render
    res.render('cart/checkout', {total: priceTotal, desc: chargeDesc});
  } catch (e) {
    console.log("Couldn't find user: "+e);
  }
});

payment.post('/', async (req,res) => {
  const token = req.body.stripeToken ?? "";
  const total = req.body.total ?? 0;
  const desc = req.body.chargeDesc ?? "";

  try {
    const charge = await stripe.charges.create({
      amount: total,
      currency: 'usd',
      description: desc,
      source: token
    });

    //Empty the cart since the charge went well
    try {
      const user = await User.findOneAndUpdate({username: req.session.userid},{cart: []});
    } catch (e) {
      console.log("Cart Empty Unsuccessful: "+e);
    }

    //Send Receipt
    const mailer = require('nodemailer').createTransport({
      service: 'gmail',
      auth: {
        user: 'admin@thepriceisnicecleaning.com',
        pass: 'z3axtM37!'
      }
    });

    const user = await User.findOne({username: req.session.userid});

    const mailOptions = {
      from: 'admin@thepriceisnicecleaning.com',
      to: user.email,
      subject: `Order for ${user.username}`,
      text: desc
    };

    mailer.sendMail(mailOptions, (e, info) => {
      if(e){
        console.log(e);
      } else {
        console.log("Email sent: "+info.response);
      }
    });

    res.render('cart/success');
  } catch (e) {
    console.log("Unable to charge card: "+e);
    res.render('cart/fail');
  }
});

module.exports = payment;