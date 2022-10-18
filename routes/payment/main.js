require('dotenv').config();

const payment = require('express').Router();
const {User} = require('../../models');
const stripe = require('stripe')(process.env.TSAPI_KEY); //DONT FORGET TO CHANGE BACK!!
const mailer = require('nodemailer').createTransport({
  service: 'gmail',
  auth: {
    user: 'admin@thepriceisnicecleaning.com',
    pass: 'z3axtM37!'
  }
});

payment.get('/', async (req,res) => {
  if(req.session.userid === 'guest') {
    res.render('cart/checkout');
  } else {
    try {
      const user = await User.findOne({username: req.session.userid});
      //Calculate totals
      let priceSubtotal = 0;
      let chargeDesc = "";
      for(let i = 0; i < user.cart.length; i++) {
        priceSubtotal += (user.cart[i].get('price') * user.cart[i].get('qty'));
        //Generate description
        chargeDesc += `${user.cart[i].get('name')} - ${user.cart[i].get('item')}\n`;
      }
  
      //Render
      res.render('cart/checkout', {total: priceSubtotal, desc: chargeDesc});
    } catch (e) {
      console.log("Couldn't find user: "+e);
    }
  }
});

payment.post('/', async (req,res) => {
  if(req.session.userid === 'guest') {
    res.render('login/login'); //Should force them back to login after server restart
  } else {
    const token = req.body.stripeToken ?? "";
    const total = parseFloat(req.body.total)*100 ?? 0;
    const desc = req.body.chargeDesc ?? "";
    const time = req.body.datetime ?? "";
    const place = req.body.place ?? "";
  
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
      const user = await User.findOne({username: req.session.userid});
  
      const customerMailOptions = {
        from: 'admin@thepriceisnicecleaning.com',
        to: user.email,
        subject: `Order for ${user.username} on ${time}`,
        text: desc
      };
  
      mailer.sendMail(customerMailOptions, (e, info) => {
        if(e){
          console.log(e);
        } else {
          console.log("Email sent: "+info.response);
        }
      });
  
      //Send Order to Clarence
  
      const clarenceMailOptions = {
        from: 'admin@thepriceisnicecleaning.com',
        to: 'clarenceprice@thepriceisnicecleaning.com',
        subject: `Order from ${user.username} on ${time}`,
        text: desc
      };
  
      mailer.sendMail(clarenceMailOptions, (e, info) => {
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
  }
});

module.exports = payment;