module.exports = function() {
  const fs = require('fs/promises');
  return {
    requestRecurringOrder: async (order) => {
      const moment = require('moment');
      const file = await fs.open('./ROs.json','rw');
    
      //This has a chance to be empty if its the first recurring order (recurring orders can be removed so this file could become empty very easily)
      const fileobj = JSON.parse(await (await file.readFile()).toJSON().data);
      const [time, length] = order.freq.split(" ");
      fileobj[order.username] = {...order, nexttime: moment(order.time).add(time, length).toDate()};
      fileobj.timeleft = moment(fileobj.nexttime).subtract(fileobj.time).toDate().getHours();
    
      //Write new contents
      await file.writeFile(JSON.stringify(fileobj));
    },
    getROList: async () => {
      const file = await (await fs.readFile('./ROs.json')).toJSON();
      return file.data;
    }
  }
}