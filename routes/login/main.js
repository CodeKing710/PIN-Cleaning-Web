// ROUTE: /login
const login = require('express').Router();
const bcyrpt = require('bcrypt');
const {User} = require('../../models');

login.get('/', (req,res) => {
  res.render('login/login');
});

login.post('/', async (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const getuser = await User.findOne({username: username});
    
    if(await bcyrpt.compare(password, getuser.password)) {
      req.session.userid = username;
      global.cache.session = req.session;
      res.redirect('/services');
    }
  } catch (e) {
    console.log("Unable to find user "+username+": "+e);
  }
});

module.exports = login;