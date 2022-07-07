//PATH: origin/cart
const cart = require("express").Router();
const mailer = require('nodemailer');

//Routes
cart.get('/', (req,res) => {
  res.render('cart');
});

cart.post('/', (req,res) => {
  const sender = mailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'admin@thepriceisnicecleaning.com',
      pass: 'z3axtM37!'
    }
  });

  const mailOptions = req.body;

  sender.sendMail(mailOptions, function(e, info) {
    if(e) {
      console.log(e);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  res.status(200);
});

module.exports = cart;