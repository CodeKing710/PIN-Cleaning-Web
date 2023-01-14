//FOR ADMINS ONLY!!
const create = require('express').Router();
const {User, Unpaid} = require('../../models');

//All routes require id check
const {checkID} = require('../../utils');

const checkAndRun = async (req,res,next) => {
  try {
    const user = await User.findOne({username: req.session.userid});
    if(await checkID(user.username)) {
      next(req,res);
    } else {
      console.log(`User ${user.username} attempted to access sensitive admin data, they have been kicked away.`);
      res.redirect('/');
    }
  } catch (e) {console.log(e);} finally {
    next(req,res);
  }
};

create.post('/create', async (req,res) => {
  //Add Invoice to customer
  if(await checkID(req.session.userid)) {
    try {
      const cust = await User.findOne({username: req.body.name});
      const id = cust.bills.length <= 0 ? 0 : cust.bills[cust.bills.length-1 !== undefined ? cust.bills.length-1 : 0].get('id') + 1 ?? 0;
      const amount = Number(req.body.amount);
      await Unpaid.updateOne({},{$push:{list: {...req.body}}});
      await User.updateOne({username: req.body.name}, {$push: {bills: {id: Number(id), for: req.body.for, amount:amount}}});
      res.redirect('/invoicing/create/success');
    } catch (e) {
      console.log(e);
      res.redirect('/invoicing/create/fail');
    }
  }
});

create.get('/create/success', (req,res) => {
  res.render('invoicing/success');
});
create.get('/create/fail', (req,res) => {
  res.render('invoicing/fail');
});

create.put('/edit/$user/$id', async (req,res) => {
  //UPDATE PASSED CUSTOMER INVOICE
  await checkAndRun(req,res, async (req,res) => {
    const id = req.params.id;
    const user = req.params.user;
  });
});

create.delete('/delete/$user/$id', async(req,res) => {
  //DELETE PASSED CUSTOMER INVOICE
  await checkAndRun(req,res, async (req,res) => {
    const id = req.params.id;
    const user = req.params.user;
  });
});

//CUSTOMER ROUTES
const stripe = require('stripe')(process.env.NODE_ENV === 'development' ? process.env.TSAPI_KEY : process.env.SAPI_KEY);
create.get('/:id/pay', async (req,res) => {
  //
});
create.post('/pay', async (req,res) => {
  //
});

module.exports = create;