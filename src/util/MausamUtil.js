//to calculate sunrise and sunset in human time format
export const sunTimings = (sun,timezone) => {
    const sunTime = new Date(sun*1000);
    const res = sunTime.toLocaleTimeString({},
        {hour12:true,hour:'numeric',minute:'numeric', timeZone: timezone})
    return res;
}

//to calculate DD:MM:YYYY
export const dateFunction = (dt, timezone) => {
    const date = new Date(dt*1000);
    const res = date.toLocaleDateString('en-In', {
      month: "long",
      year: "numeric",
      timeZone: timezone
    });
    return res;
}

// to return HH:MM
export const time = (dt, timezone) => {
    const date = new Date(dt*1000)
    const time = date.toLocaleTimeString('en-In', {
        hour: "numeric",
        minute: "2-digit",
        timeZone: timezone
    })
    return time;
}

export const day = (date, timezone) => {
    const day = new Date(date*1000);
    const res = day.toLocaleDateString('en-In', {
        weekday: "long",
        timeZone: timezone
    })
    return res;
}

//to give 'th' to dates:
export const dateSuffix = (date, timezone) => {
    const day = new Date(date*1000);
    const th = day.toLocaleDateString('en-In', {
      day: "numeric",
      timeZone: timezone
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
export const dayFunction = (date, timezone) => {
    const day = new Date(date*1000);
    return day.toLocaleDateString('en-IN', {weekday: 'short', timeZone: timezone});
}



//To calculate time in HH:MM format
export const timeFunction = (date, timezone) => {
    const time = new Date(date*1000);
    return time.toLocaleTimeString('en-In', {hour: "numeric", hour12: true, minute: "numeric", timeZone: timezone})
}