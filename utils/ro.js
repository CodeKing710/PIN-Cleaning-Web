module.exports = function() {
  const fs = require('fs/promises');
  const minute = 1000*60;
  const day = minute*60*24;
  const week = day*7;
  const month = {
    0: day*31,
    1: (0 == Number(new Date().getFullYear()) % 4) && (0 != Number(new Date().getFullYear()) % 100) || (0 == Number(new Date().getFullYear()) % 400) ? day * 29 : day * 28,
    2: day*31,
    3: day*30,
    4: day*31,
    5: day*30,
    6: day*31,
    7: day*31,
    8: day*30,
    9: day*31,
    10: day*30,
    11: day*31
  };

  return {
    intervalID: [],
    countdown: function(RO) {
      RO.timeUntil -= minute;
      if(RO.timeUntil <= 0) {
        this.placeOrder(RO);
        RO.timeUntil = RO.nextTime;
      }
      this.updateCountdownsOnFile();
    },
    start: function(RO) {
      console.log("Started "+RO.username+" recurring order!")
      this.intervalID.push({name: RO.username, id: setInterval(()=>{this.countdown(RO)},minute)});
    },
    stop: function(RO) {
      this.intervalID.forEach((id) => {
        if(id.name == RO.username) {
          clearInterval(id.id);
        }
      });
    },
    requestRecurringOrder: async (order) => {    
      //This has a chance to be empty if its the first recurring order (recurring orders can be removed so this file could become empty very easily)
      const fileobj = JSON.parse(await fs.readFile('./ROs.json','utf-8'));
      const [time, length] = order.freq.replace('d',day).replace('w',week).replace('M',month[new Date().getMonth()]).split(" ");
   
      fileobj.push({
        ...order,
        nextTime: Number(time)*Number(length),
        timeUntil: Number(time)*Number(length) //Must match for first order
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
    },
    placeOrder: async () => {
      console.log("Order placement reached!");
    }
  }
}