(async () => {
  require('dotenv').config();

  const express = require('express');
  const ejs = require('ejs');
  const cp = require('cookie-parser');
  const sessions = require('express-session');
  const cookieLife = 1000*60*60*4;
  const app = express();
  const PORT = process.env.PORT ?? 3000;
  const routes = require('./routes');
  const utils = require('./utils');
  global.cache = {session: null};

  app.set('view engine','ejs');
  app.use(sessions({
    secret: process.env.KEY,
    saveUninitialized: true,
    cookie: {maxAge: cookieLife},
    resave: false
  }));
  app.use(express.json());
  app.use(express.static("public"));
  app.use(express.urlencoded({extended: true}));
  app.use(cp());
  app.use(utils.vars());

  for(const route in routes) {
    if(typeof routes[route].ctrl !== 'function') {
      //For nested routing
      for(const subroute of routes[route].ctrl) {
        app.use(routes[route].path, subroute);
      }
    } else {
      app.use(routes[route].path, routes[route].ctrl);
    }
  }

  app.get('//', (req,res) => {
    res.redirect('/');
  });

  app.get('*', (req, res) => {
    res.status(404).render('404');
  });

  app.listen(PORT, console.log(`Listening on port ${PORT}...`));
})();
