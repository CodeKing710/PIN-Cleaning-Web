require('dotenv').config();

const express = require('express');
const ejs = require('ejs');
const app = express();
const PORT = process.env.PORT ?? 3000;
const routes = require('./routes');
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

app.listen(PORT, console.log(`Listening on port ${PORT}...`));