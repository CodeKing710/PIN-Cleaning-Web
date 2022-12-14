const ro = require('express').Router();
const {removeRecurringOrder} = require('../../utils');

ro.post('/:id/cancel', async (req,res) => {
  await removeRecurringOrder(req.params.id);
  res.send('success');
});

module.exports = ro;