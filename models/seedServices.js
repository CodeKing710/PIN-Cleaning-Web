const {Service} = require('../models');

Service.create(
{
  name: "Window Washing",
  desc: "",
  prices: [/*{
    amount: 10,
    for: 'one-side'
  },{
    amount: 15,
    for: 'two-side'
  }, */{
    amount: 5,
    for: 'one-side (DEAL thru 09/22/2022)'
  }, {
    amount: 7.5,
    for: 'two-side (DEAL thru 09/22/2022)'
  }],
  img: '/assets/services/window-washing.jpg'
},{
  name: "Moving",
  desc: "",
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
  desc: "A flexible option to let you choose individual things you want cleaned!",
  prices: [{
    amount: 20,
    for: 'Oven'
  },{
    amount: 20,
    for: 'Cabinet Interior'
  }, {
    amount: 30,
    for: 'Fixtures'
  }, {
    amount: 20,
    for: 'Refrigerator'
  }, {
    amount: 50,
    for: 'Windows'
  }, {
    amount: 0.3,
    for: 'Per Sq. Ft. of Carpet'
  }],
  img: '/assets/services/flexclean.jpg'
},{
  name: "Commercial Cleaning",
  desc: "",
  dcm: 1.35,
  prices: [{
    amount: 70,
    for: '0-1,000 sqft.'
  },{
    amount: 140,
    for: '1,000-5,000 sqft.'
  }, {
    amount: 200,
    for: '5,000-10,000sqft.'
  }, {
    amount: 300,
    for: '10,000-20,000 sqft.'
  }],
  img: '/assets/services/commercial.jpg'
},
{
  name: "Hoarding Removal",
  desc: "",
  prices: [{
    amount: 0,
    for: "Call to Schedule an Appointment!"
  }],
  img: '/assets/services/hoardremoval.jpg'
},
{
  name: "Biohazard Cleanup",
  desc: "",
  prices: [{
    amount: 0,
    for: "Call to Schedule an Appointment!"
  }],
  img: '/assets/services/biohazard.jpg'
}
).then(()=>{process.exit();});