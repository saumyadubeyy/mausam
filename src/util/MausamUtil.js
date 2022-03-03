//to calculate sunrise and sunset in human time format
export const sunTimings = (sun) => {
    const sunTime = new Date(sun*1000);
    const res = sunTime.toLocaleTimeString({},
        {hour12:true,hour:'numeric',minute:'numeric'})
    return res;
}

//to calculate DD:MM:YYYY
export const dateFunction = (dt) => {
    const date = new Date(dt*1000);
    const res = date.toLocaleDateString('en-In', {
      month: "long",
      year: "numeric",
    });
    

    return res;
}


// to return HH:MM
export const time = (dt) => {
    const date = new Date(dt*1000)
    const time = date.toLocaleTimeString('en-In', {
        hour: "numeric",
        minute: "2-digit"
    })
    return time;
}

export const day = (date) => {
    const day = new Date(date*1000);
    const res = day.toLocaleDateString('en-In', {
        weekday: "long"
    })
    return res;
}

//to give 'th' to dates:
export const dateSuffix = (date) => {
    const day = new Date(date*1000);
    const th = day.toLocaleDateString('en-In', {
      day: "numeric"
    })

    const nth = function(d) {
        if (d > 3 && d < 21) return 'th';
        switch (d % 10) {
          case 1:  return "st";
          case 2:  return "nd";
          case 3:  return "rd";
          default: return "th";
        }
      }

      return `${th}${nth(th)} `;
}


//To calculate day of the week in words
export const dayFunction = (date) => {
    const day = new Date(date*1000);
    return day.toLocaleDateString('en-IN', {weekday: 'short'});
}



//To calculate time in HH:MM format
export const timeFunction = (date) => {
    const time = new Date(date*1000);
    return time.toLocaleTimeString('en-In', {hour: "numeric", hour12: true, minute: "numeric"})
}