const axios = require('axios');

const { getData } = require('./utils');
const { getCoordinate } = require('./forecast');

const currentlyWeather = async (city) => {
    try {
        const { longitude, latitude, place } = await getCoordinate(city);
        const { data } = await getData(`https://api.darksky.net/forecast/4e83db33f015be851ced6106e527d1f4/${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}?units=si`);
    
        return {
            forecast: `${data.daily.summary} It is currently ${data.currently.temperature} degrees out. There is a ${data.currently.precipProbability}% chance of rain`,
            place,
            pressure: data.currently.pressure,
            error: false
        }
    } catch (e) {
        console.log('Check your internet connection');
        return {
            forecast: 'Cant find the place',
            place: 'No place with this name',
            error: true
        };
    }
}

module.exports = {
    currentlyWeather
}