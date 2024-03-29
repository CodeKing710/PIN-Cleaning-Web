(async () => {
  //Initialize any extra environment vars
  require('dotenv').config();

  //Initialize app globals and libraries
  const express = require('express');
  const ejs = require('ejs');
  const cp = require('cookie-parser');
  const sessions = require('express-session');
  const mo = require('method-override');
  const cookieLife = 1000*60*60*4;
  const app = express();
  const PORT = process.env.PORT ?? 3000;
  const routes = require('./routes');
  const utils = require('./utils');
  global.cache = {
    session: null,
    ROs: null
  };

  //Set app middlewares
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
  app.use(mo("__m"));
  app.use(utils.vars());

  //Apply routes to app
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

  //Weird domain forward fix
  app.get('//', (req,res) => {
    res.redirect('/');
  });

  //404 Errors
  app.get('*', (req, res) => {
    res.status(404).render('404');
  });

  //Start recurring order counters (from where they left off)
  const ro = utils.ro();
  global.cache.ROs = await ro.getROList();
  global.cache.ROs.filter((RO, index) => {
    ro.start(global.cache.ROs[index]);
  });

  //Start listening for requests
  app.listen(PORT, console.log(`Listening on port ${PORT}...`));
})();
