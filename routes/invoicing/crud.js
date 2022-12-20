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
  await checkAndRun(req,res, async (req,res) => {
    await Unpaid.updateOne({},{$push:{list: {...req.body}}});
  });
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