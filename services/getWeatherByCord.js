const {default: axios} = require("axios");
const {API_WEATHER} = require('../config/constans')
const getWeatherByCord = async ({longitude, latitude}) => {
    const { data } = await axios.get(API_WEATHER, {
        params: {
            longitude,
            latitude,
            'hourly': 'temperature_2m,relativehumidity_2m,windspeed_10m',
            'current_weather': true,
            'timezone': 'auto'
        }
    })

    return data
}

module.exports = {
    getWeatherByCord
}