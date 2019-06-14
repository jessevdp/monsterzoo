/* global process */

export default {
    app: {
        name: process.env.APP_NAME || 'Monster Zoo',
    },
    /*
     * OpenWeatherMap
     * ---------------------------
     * The OpenWeatherMap API is used to fetch weather data for the application. You can
     * obtain an API key (free for limited use) here: https://openweathermap.org/appid.
     */
    openWeatherMap: {
        apiKey: process.env.OPEN_WEATHER_MAP_API_KEY
    }
};