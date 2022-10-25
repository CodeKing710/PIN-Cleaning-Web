//FOR ADMINS ONLY!!
const create = require('express').Router();
const {User} = require('../../models');

//All routes require id check
const checkID = require('../../utils').checkID;

create.post('/create', async (req,res) => {
  //Add Invoice to customer
});

create.put('/edit/$user/$id', async (req,res) => {
  //UPDATE PASSED CUSTOMER INVOICE
  const id = req.params.id;
  const userid = req.params.user;
});

create.delete('/delete/$user/$id', async(req,res) => {
  //DELETE PASSED CUSTOMER INVOICE
  const id = req.params.id;
  const userid = req.params.user;
});

//CUSTOMER ROUTES
const stripe = require('stripe')(process.env.SAPI_KEY);
create.post('/pay', async (req,res) => {
  //
});

module.exports = create;