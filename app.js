const {parseCoords} = require('./utils/coords')
const {getData} = require('./utils/fetch')
const format = require('./format')

//Node modules
require('dotenv').config()
const chalk = require('chalk')


//Base url for requests
const url = 'http://api.weatherapi.com/v1/forecast.json?'

//Params for API call
const q = parseCoords('./sources/coord.txt')


//Console args
const args = process.argv.slice(2)

if (args.length === 0){
    console.log('Error: no arguments found');
    //Show options
    console.log(`Available arguments: ${chalk.green(`-week`)}, ${chalk.green(`-rainiest`)}, ${chalk.green(`-today`)}`)
    return;
}

if (args.length > 1){
    console.log('Too many arguments');
    return;
}

//Build url for api request
callUrl = `${url}key=${process.env.API_KEY}&q=${q}`
switch(args[0]){
    case('-week'): {
        getData(`${callUrl}&days=5`)
            .then((data) => {

                const {forecast: {forecastday}} = data;

                const max = forecastday.map((curr) => {
                    return curr.day.maxtemp_c
                })
                const min = forecastday.map((curr) => {
                    return curr.day.mintemp_c
                })

                format.formatForecast(new Date(), max, min)
            })
        break;  
    }

    case('-rainiest'): {

        getData(`${callUrl}&days=7`)
            .then((data) => {
                
                const {forecast: {forecastday}} = data
                const precipitationChance = forecastday.map((curr) => {
                    return curr.day.daily_chance_of_rain
                })
                const time = forecastday.map((curr) => {
                    return curr.date
                })
                format.formatRainiestDay(new Date(),time,precipitationChance)
            })
        break;
    }

    case('-today'): {
        getData(`${callUrl}&days=1`)
            .then((data) => {
                const {forecast: {forecastday}} = data;
                const hourlyData = forecastday.map((curr) => {
                    return curr.hour
                })
                format.formatTodaysRain(hourlyData[0])
            })  
        break;
    }

    default: {
        console.log(`Error: ${chalk.red(args[0])} is not a valid command`);
    }
}
