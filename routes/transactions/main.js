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
    res.send('/payment');
  } catch (e) {console.log(e);res.json({success: false});}
});
onp.get('/', (req, res) => {
  res.render('modal');
});

module.exports = onp;