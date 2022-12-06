require('dotenv').config();

const payment = require('express').Router();
const {User} = require('../../models');
const stripe = require('stripe')(process.env.NODE_ENV === 'development' ? process.env.TSAPI_KEY : process.env.SAPI_KEY);

const mailer = require('nodemailer').createTransport({
  service: 'gmail',
  auth: {
    user: 'admin@thepriceisnicecleaning.com',
    pass: 'z3axtM37!'
  }
});
const ro = require('../../utils').ro;

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
        if(user.cart[i].get('name') === 'Commercial Cleaning') {
          priceSubtotal += Number(user.cart[i].get('price'));
        } else {
          priceSubtotal += (Number(user.cart[i].get('price')) * Number(user.cart[i].get('qty')));
        }
        //Generate description
        chargeDesc += `${user.cart[i].get('name')} - ${user.cart[i].get('item')} - Amount: ${user.cart[i].get('qty')}\n`;
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
    const phone = req.body.phone ?? "";
    const recur = req.body.recur ?? false;

    if(recur) {
      //Send Recurring Order Storage Request for current user
      try {
        const user = await User.findOne({uername: req.session.userid});
        await ro.requestRecurringOrder({
          username: req.session.userid,
          name: `${user.fname} ${user.lname}`,
          token: token,
          total: total,
          desc: desc,
          time: time,
          place: place,
          phone: phone,
          freq: req.body.frequency
        });
      } catch (e) {
        console.log("Failed to Create Recurring Order: " +e);
      }
    }
  
    //Set Stripe Variable based on host location (dev v prod)
    // let stripe;
    if(process.env.NODE_ENV === 'development') {
      // stripe = require('stripe')(process.env.TSAPI_KEY);
      console.log("[STRIPE]: USING TEST KEYS!");
    } else {
      // stripe = require('stripe')(process.env.SAPI_KEY);
      console.log("[STRIPE]: USING LIVE KEYS!");
    }

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
      const custEmailDesc = `Your order for:<br><br>${desc.replace('\n','<br>')}<br><br>To be done on ${time} has been processed!<br><br><h1>The Price is Nice Cleaning LLC</h1>`;
  
      const customerMailOptions = {
        from: 'admin@thepriceisnicecleaning.com',
        to: user.email,
        subject: `Order for ${user.username} on ${time}`,
        html: custEmailDesc
      };
  
      mailer.sendMail(customerMailOptions, (e, info) => {
        if(e){
          console.log(e);
        } else {
          console.log("Email sent: "+info.response);
        }
      });
  
      //Send Order to Clarence
      const clarenceEmailDesc = `You have a new order from ${user.username}(${user.email})\n\n${desc}\n\nThis is to be scheduled for ${time}.\nAddress is ${place}.\n\nHave a nice day!`;
  
      const clarenceMailOptions = {
        from: 'admin@thepriceisnicecleaning.com',
        to: 'clarenceprice@thepriceisnicecleaning.com',
        subject: `Order from ${user.username} on ${time}`,
        text: clarenceEmailDesc
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