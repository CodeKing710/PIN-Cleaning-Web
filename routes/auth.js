//PATH: origin/auth
const auth = require("express").Router();
const bcrypt = require('bcrypt');
const {User} = require('../models');

//Routes
auth.get('/', (req,res) => {
  res.write("<h1>This shouldn't have a view but will post for when users sign-up or login!</h1>");
});

auth.get('/signup', async (req,res) => {
  if(!req.session.userid || req.session.userid == 'guest') {
    res.render('user/signup');
  } else {
    res.redirect('/');
  }
});

auth.get('/login', async (req,res) => {
  if(!req.session.userid || req.session.userid == 'guest') {
    res.render('user/login');
  } else {
    res.redirect('/');
  }
});

auth.post('/', async (req,res) => {
  const login = req.body.login ?? false;
  const username = req.body.username.indexOf('@') > 0 ? req.body.email : req.body.username;
  let password = req.body.password;
  const email = req.body?.email;

  if(login) {
    try {
      let user;
      if(username.indexOf('@') > 0) {
        user = await User.findOne({email: username});
      } else {
        user = await User.findOne({username: username});
      }

      if(await bcrypt.compare(password, user.password)) {
        req.session.userid = username;
        res.redirect('/');
      }
    } catch (e) {console.log(e); res.render('404', {msg: "User not found!"})}
  } else {
    try {
      password = await bcrypt.hash(password, 12);
      await User.create({
        name: username,
        email: email,
        password: password
      });
    } catch (e) {console.log(e); res.render('404', {msg: "Unable to create User!"});}
  }
});

module.exports = auth;