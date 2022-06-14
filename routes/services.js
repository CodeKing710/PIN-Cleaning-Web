//PATH: origin/services
const service = require("express").Router();
// const {Services} = require('../models');
const services = [
  "Window Washing",
  "Moving",
  "Office Cleaning",
  "Bar Cleaning",
  "Store Cleaning",
  "Factory Cleaning",
  "Apartment Lobby and Hall Cleaning"
];

//Routes
service.get('/', async (req,res) => {
  //Check if services have been cached
  if(!global.cache.services) {
    // const services = await Services.find();
    global.cache.services = services;
  } 
  res.render('services/index', {services: cache.services});
});

module.exports = service;