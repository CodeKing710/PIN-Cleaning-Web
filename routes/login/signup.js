// ROUTE: /login
const signup = require('express').Router();
const bcrypt = require('bcrypt');
const {User} = require('../../models');

signup.get('/signup', (req,res) => {
  res.render('login/signup');
});

signup.post('/signup', async (req, res) => {
  const username = req.body.username;
  const password = await bcrypt.hash(req.body.password, 12);
  const email = req.body.email;

  try {
    const creation = await User.create({
      username: username,
      password: password,
      email: email
    });

    if(creation.username === username) {
      req.session.userid = username;
      global.cache.session = req.session;
      res.redirect('/services');
    }
  } catch (e) {
    console.log("Unable to create user; "+e);
  }
});

module.exports = signup