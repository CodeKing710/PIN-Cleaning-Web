require('dotenv').config();

const express = require('express');
const ejs = require('ejs');
const app = express();
const PORT = process.env.PORT ?? 3000;
const routes = require('./routes');
const utils = require('./utils');
const sessions = require('express-session');
global.cache = {};
// exports.cache = cache;

app.set('view engine','ejs');
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(sessions({
  secret: process.env.KEY,
  saveUninitialized: true,
  resave: false,
  cookie: {maxAge: 60000}
}));
// app.use(utils.sessions());
app.use(utils.addVarsToTemplate());

for(const route in routes) {
  app.use(routes[route].path, routes[route].ctrl);
}

app.get('//', (req,res) => {
  res.redirect('/');
});

app.get('*', (req, res) => {
  res.status(404).render('404');
});

app.listen(PORT, console.log(`Listening on port ${PORT}...`));