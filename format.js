const chalk = require('chalk')

function intToDay(num){
    switch(num){
        case 0: return 'Sunday';
        case 1: return 'Monday';
        case 2: return 'Tuesday';
        case 3: return 'Wednesday';
        case 4: return 'Thursday';
        case 5: return 'Friday';
        case 6: return 'Saturday'
    }
}


function formatForecast(date,high,low) {
    let currDay = date.getDay();
    
    console.log('This is the forecast for the next 5 days: ');

    const forecast = {}

    function Day(low,high){
        this.low = low;
        this.high = high
    }

    for (const [i, value] of high.entries()){
        forecast[`${intToDay((currDay + i) % 7)}`] = new Day(`${low[i]}°C`, `${value}°C`)
    }

    console.table(forecast)
}

function formatRainiestDay(date,time,rain){
    let currDay = date.getDay();

    if ((new Set(rain)).size === 1){
        console.log("Probability of precipitation is 0% for this week");
    }
    else{
        const max = Math.max(...rain);
        const index = rain.indexOf(max);
        console.log(`The day with the highest probability of precipitation is ${intToDay((currDay + index) % 7)} ${time[index]}, with a probability of ${max}%`);

    }
}

function formatTodaysRain(hourly){
    console.log("Precipitation chance for today: \n");
    const day = {}
    for (hour of hourly){
        day[`${hour.time.slice(11)}`] = `${hour.chance_of_rain}%`;
    }
    console.table(day)
}

module.exports = {
    formatForecast,
    formatRainiestDay,
    formatTodaysRain
}
