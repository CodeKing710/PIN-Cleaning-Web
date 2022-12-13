//FOR ADMINS ONLY!!
const create = require('express').Router();
const {User} = require('../../models');

//All routes require id check
const {checkID} = require('../../utils');

const checkAndRun = async (req,res,next) => {
  try {
    const user = await User.findOne({username: req.session.userid});
    if(await checkID(user.username)) {

    } else {
      console.log(`User ${user.username} attempted to access sensitive admin data, they have been kicked away.`);
      res.redirect('/');
    }
  } catch (e) {console.log(e);} finally {
    next();
  }
};

create.post('/create', async (req,res) => {
  //Add Invoice to customer
  checkAndRun(req,res, async () => {

  });
});

create.put('/edit/$user/$id', async (req,res) => {
  //UPDATE PASSED CUSTOMER INVOICE
  checkAndRun(req,res, async () => {
    const id = req.params.id;
    const userid = req.params.user;
  });
});

create.delete('/delete/$user/$id', async(req,res) => {
  //DELETE PASSED CUSTOMER INVOICE
  checkAndRun(req,res, async () => {
    const id = req.params.id;
    const userid = req.params.user;
  });
});

//CUSTOMER ROUTES
const stripe = require('stripe')(process.env.NODE_ENV === 'development' ? process.env.TSAPI_KEY : process.env.SAPI_KEY);
create.post('/pay', async (req,res) => {
  //
});

module.exports = create;