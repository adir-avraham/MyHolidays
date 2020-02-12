import moment from 'moment';

export function getGreeting() {
    const format = 'HH:mm:ss';
  
    const morning = moment(moment() ,format),
    beforeTime1 = moment('06:00:00', format),
    afterTime1 = moment('11:00:00', format);
    
    const afternoon = moment(moment() ,format),
    beforeTime2 = moment('11:00:00', format),
    afterTime2 = moment('17:00:00', format);
  
    const evening = moment(moment() ,format),
    beforeTime3 = moment('17:00:00', format),
    afterTime3 = moment('21:00:00', format);
  
    const night = moment(moment() ,format),
    beforeTime4 = moment('21:00:00', format),
    afterTime4 = moment('24:00:00', format);
    
    if (morning.isBetween(beforeTime1, afterTime1)) return "Good Morning";
    if (afternoon.isBetween(beforeTime2, afterTime2)) return "Good Afternoon";
    if (evening.isBetween(beforeTime3, afterTime3)) return "Good Evening";
    if (night.isBetween(beforeTime4, afterTime4)) return "Good Night";
  }