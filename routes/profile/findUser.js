const fu = require('express').Router();
const {User} = require('../../models');

fu.post('/:sq', async (req,res) => {
  const searchQuery = req.params.sq;
  try {
    const user = await User.findOne({username: searchQuery, email: searchQuery, fname: searchQuery, lname: searchQuery, bname: searchQuery});
  } catch (e) {console.log(e)}
});

module.exports = fu;