const fu = require('express').Router();
const {User} = require('../../models');
const {checkID} = require('../../utils');

fu.post('/:sq', async (req,res) => {
  const searchQuery = req.params.sq;
  try {
    const user = await User.findOne({username: searchQuery, email: searchQuery, fname: searchQuery, lname: searchQuery, bname: searchQuery});
  } catch (e) {console.log(e)}
});

fu.post('/unpaid', async (req,res) => {
  console.log("Accessing unpaid users")
  if(await checkID(req.session.userid)) {
    console.log("User allowed");
    if(req.body.sq === null) {
      const users = await User.find({bills: {$exists: true, $ne: []}});
      res.json({users: users});
    } else {
      const users = await User.find({username: req.body.sq, bills: {$exists: true, $ne: []}});
      res.json({users: users});
    }
  }
});

module.exports = fu;