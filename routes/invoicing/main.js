const inv = require('express').Router();
const {User} = require('../../models');

const checkID = require('../../utils').checkID;

inv.get('/', async (req,res) => {
  try {
    const user = await User.findOne({username: req.session.userid});
    res.render('invoicing/index', {user: user, cust: user, bills: user.bills});
  } catch (e) {
    console.log('Unable to find user: '+e);
    res.render('invoicing/na');
  }
});

inv.get('/pay/:id', async (req,res) => {
  //Reuse cart checkout code (build total and desc vars to pass to template)
  try {
    const user = await User.findOne({username: req.session.userid});
    const id = req.params.id;
    //Render
    res.render('cart/checkout', {total: user.bills[id].amount, desc: user.bills[id].name, invoice: true});
  } catch (e) {
    console.log("Couldn't find user: "+e);
  }
});

//ADMIN ROUTES
inv.get('/create', async (req,res) => {
  if(await checkID(req.session.userid)) {
    res.render('invoicing/create');
  } else {
    res.render('invoicing/na');
  }
});

inv.get('/edit/:id', async (req,res) => {
  if(await checkID(req.session.userid)) {
    res.render('invoicing/edit');
  } else {
    res.render('invoicing/na');
  }
});

inv.get('/delete', async (req,res) => {
  //Just a show route to show that something deleted successfully
  if (await checkID(req.session.userid)) {
    res.render('invoicing/delete');
  } else {
    res.render('invoicing/na');
  }
});

inv.get('/:id', async (req,res) => {
  if(await checkID(req.session.userid)) {
    try {
      const user = await User.findOne({username: req.session.userid});
      const cust = await User.findOne({username: req.params.id});
      res.render('invoicing/index', {user: user, cust: cust, bills: user.bills});
    } catch (e) {console.log(e);}
  } else {
    res.render('invoicing/na');
  }
});

inv.get('/:id/create', async (req,res) => {
  if(await checkID(req.session.userid)) {
    res.render('invoicing/create', {userid: req.params.id});
  } else {
    res.render('invoicing/na');
  }
});

module.exports = inv;