import WeatherCondition from './WeatherCondition';

export default class WeatherAPI {
    constructor(key) {
        this._key = key;
    }

    async fetchWeatherForCity(city) {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?id=${city.id}&APPID=${this._key}&units=metric`);
        const data = await response.json();
        return {
            temperature: data.main.temp,
            condition: WeatherCondition.fromID(data.weather[0].id),
        };
    }
}
