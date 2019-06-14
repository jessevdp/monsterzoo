/* global process */

export default {
    app: {
        name: process.env.APP_NAME || 'Monster Zoo',
    },
    openWeatherMap: {
        apiKey: process.env.OPEN_WEATHER_MAP_API_KEY
    }
};