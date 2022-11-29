module.exports = function() {
  const fs = require('fs/promises');
  const minute = 1000*60;
  return {
    requestRecurringOrder: async (order) => {
      const moment = require('moment');
    
      //This has a chance to be empty if its the first recurring order (recurring orders can be removed so this file could become empty very easily)
      const fileobj = JSON.parse(await fs.readFile('./ROs.json','utf-8'));
      const [time, length] = order.freq.split(" ");
   
      fileobj.push({
        ...order,
        nextTime: moment(this.time).add(time, length).toDate().getMilliseconds(),
        timeUntil: moment(this.nextTime).subtract(moment(this.time)).toDate().getMilliseconds(),
        countdown: function() {
          console.log("Minute Down")
          this.timeUntil -= minute;
        },
        start: function() {
          console.log("Started "+this.username+" recurring order!")
          this.intervalID = setInterval(()=>{this.countdown()},minute)
        },
        stop: function() {
          clearInterval(this.countdown);
        }
      });

      //Save current ROs globally
      global.cache.ROs = fileobj;
    
      //Write new contents
      await fs.writeFile('./ROs.json', JSON.stringify(fileobj), 'utf-8');
    },
    getROList: async () => {
      try {
        const file = JSON.parse(await fs.readFile('./ROs.json','utf-8'));
        return file;
      } catch (e) {
        console.log("Empty RO file!");
        return [];
      }
    },
    updateCountdownsOnFile: async () => {
      await fs.writeFile('./ROs.json', JSON.stringify(global.cache.ROs), 'utf-8');
    }
  }
}