require('dotenv').config();

const express = require('express');
const ejs = require('ejs');
const app = express();
const ssl = express();
const PORT = process.env.PORT ?? 3000;
const S_PORT = process.env.S_PORT ?? 403;
const routes = require('./routes');
const fs = require('fs');
global.cache = {};

app.set('view engine','ejs');
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));

for(const route in routes) {
  app.use(routes[route].path, routes[route].ctrl);
}

app.get('//', (req,res) => {
  res.redirect('/');
});

app.get('*', (req, res) => {
  res.status(404).render('404');
});

const ssl_routes = require('./routes/transactions');
ssl.use(express.json());
ssl.use(express.urlencoded({extended: true}));
// ssl.use(fs.readFileSync('./certs/key.pem'));

for(const route in ssl_routes) {
  ssl.use(ssl_routes[route].path, ssl_routes[route].ctrl);
}

app.listen(PORT, console.log(`Listening on port ${PORT}...`));
require('https').createServer({
  key: process.env.SSLKEY,
  cert: process.env.SSLCERT
}, ssl).listen(S_PORT, console.log(`SSL Secure Server Listening on ${S_PORT}...`));