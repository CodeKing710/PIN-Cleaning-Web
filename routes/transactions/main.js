//Handles all stripe transactions via custom fetch routes
const stripe = require('stripe')(process.env.API_KEY);
const onp = require('express').Router();

onp.post('/', async (req, res) => {
  try {
    const charge = await stripe.charges.create({
      amount: req.body.amount,
      currency: 'usd',
      source: req.body.cardName,
      description: req.body.chargeReason
    });
    res.redirect('/payment/finalized');
  } catch (e) {console.log(e);res.redirect('/payment/failed');}
});
onp.get('/', (req, res) => {
  res.render('cart/checkout');
});

onp.get('/finalized', (req, res) => {
 res.render('cart/success');
});
onp.get('/failed', (req, res) => {
 res.render('cart/fail');
});

module.exports = onp;