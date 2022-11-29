module.exports = function() {
  const fs = require('fs/promises');
  const minute = 1000*60;
  return {
    requestRecurringOrder: async (order) => {
      const moment = require('moment');
    
      //This has a chance to be empty if its the first recurring order (recurring orders can be removed so this file could become empty very easily)
      const fileobj = await (await fs.readFile('./ROs.json')).toJSON().data;
      const [time, length] = order.freq.split(" ");
      fileobj[order.username] = {
        ...order,
        nexttime: moment(order.time).add(time, length).toDate().getMilliseconds(),
        timeUntil: this.nexttime - this.time,
        countdown: function() {
          this.timeUntil -= minute;
        },
        start: setInterval(()=>{this.countdown()}, minute),
        stop: function() {
          clearInterval(this.countdown);
        }
      };

      //Save current ROs globally
      global.cache.ROs = fileobj;
    
      //Write new contents
      await fs.writeFile('./ROs.json', JSON.stringify(fileobj));
    },
    getROList: async () => {
      const file = await (await fs.readFile('./ROs.json')).toJSON();
      return file.data;
    },
    updateCountdownsOnFile: async () => {
      await fs.writeFile('./ROs.json', JSON.stringify(global.cache.ROs));
    }
  }
}