const {Service} = require('../models');

Service.create(
{
  name: "Window Washing",
  prices: [{
    amount: 10,
    for: 'one-side'
  },{
    amount: 15,
    for: 'two-side'
  }, {
    amount: 5,
    for: 'one-side (DEAL thru 09/22/2022)'
  }, {
    amount: 7.5,
    for: 'two-side (DEAL thru 09/22/2022)'
  }],
  img: '/assets/services/window-washing.jpg'
},{
  name: "Moving",
  dcm: 1.5,
  prices: [{
    amount: 65,
    for: '1 bed 1 bath'
  },{
    amount: 85,
    for: '1 bed 2 bath'
  }, {
    amount: 90,
    for: '2 bed 1 bath'
  }, {
    amount: 100,
    for: '2 bed 2 bath'
  },{
    amount: 140,
    for: '3 bed 2 bath'
  },{
    amount: 150,
    for: '4 bed 2 bath'
  }],
  img: '/assets/services/moving.jpg'
},{
  name: "Flex Clean",
  prices: [{
    amount: 10,
    for: 'one-side'
  },{
    amount: 15,
    for: 'two-side'
  }, {
    amount: 5,
    for: 'one-side (DEAL thru 09/22/2022)'
  }, {
    amount: 7.5,
    for: 'two-side (DEAL thru 09/22/2022)'
  }],
  img: '/assets/services/flexclean.jpg'
},{
  name: "Commercial Cleaning",
  prices: [{
    amount: 10,
    for: 'one-side'
  },{
    amount: 15,
    for: 'two-side'
  }, {
    amount: 5,
    for: 'one-side (DEAL thru 09/22/2022)'
  }, {
    amount: 7.5,
    for: 'two-side (DEAL thru 09/22/2022)'
  }],
  img: '/assets/services/commercial.jpg'
}
).then(()=>{process.exit();});