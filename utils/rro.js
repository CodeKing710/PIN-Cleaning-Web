module.exports = async function(order) {
  const moment = require('moment');
  const fs = require('fs/promises');
  const file = await fs.open('./ROs.json');

  //This has a chance to be empty if its the first recurring order (recurring orders can be removed so this file could become empty very easily)
  const fileobj = await JSON.parse(await file.readFile());
  const [time, length] = order.freq.split(" ");
  fileobj[order.username] = {...order, nexttime: moment(order.time).add(time, length).toDate()};
  fileobj.timeleft = moment(fileobj.nexttime).subtract(fileobj.time).toDate().getHours();

  //Write new contents
  file.writeFile(fileobj);
}