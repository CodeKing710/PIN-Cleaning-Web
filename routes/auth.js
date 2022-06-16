//PATH: origin/auth
const auth = require("express").Router();

//Routes
auth.get('/', (req,res) => {
  res.write("<h1>This shouldn't have a view but will post for when users sign-up or login!</h1>");
});

auth.get('/signup', async (req,res) => {
  if(!req.session.userid) {
    res.render('user/signup');
  } else {
    res.redirect('/');
  }
});

auth.get('/login', async (req,res) => {
  if(!req.session.userid) {
    res.render('user/login');
  } else {
    res.redirect('/');
  }
});

auth.post('/', async (req,res) => {

});

module.exports = auth;