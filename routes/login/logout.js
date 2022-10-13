// ROUTE: /login
const logout = require('express').Router();

logout.get('/logout', (req,res) => {
  req.session.destroy();
  global.cache.session = null;
  res.render('login/logout');
});

module.exports = logout;