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
      user: 'pinc-order-mailer@thepriceisnicecleaning.com',
      pass: '0rd3rUp!'
    }
  });

  const mailOptions = req.body;
  console.log(req.body);

  sender.sendMail(mailOptions, (e, info) => {
    if(e) {
      console.log(e);
      res.status(400);
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200);
    }
  });
});

module.exports = cart;