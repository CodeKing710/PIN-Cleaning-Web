//PATH: origin/services
const services = require("express").Router();
const {Service} = require('../models');
// const services = [
//   "Window Washing",
//   "Moving",
//   "Office Cleaning",
//   "Bar Cleaning",
//   "Store Cleaning",
//   "Factory Cleaning",
//   "Apartment Lobby and Hall Cleaning"
// ];
const checkService = async () => {
  if(!global.cache.services) {
    const _services = await Service.find();
    global.cache.services = _services;
  }
}

//Routes
services.get('/', async (req,res) => {
  //Check if services have been cached
  await checkService();
  res.status(200).render('services/index', {services: global.cache.services});
});

services.get('/:name', async (req,res) => {
  await checkService();
  const name = req.params.name;
  let service;
  for(const _service of global.cache.services) {
    const matchName = _service.name.replace(" ","-");
    if(matchName.toLowerCase() == name) {
      service = _service;
      break;
    }
  }
  res.render("services/show", {service: service});
});

module.exports = services;