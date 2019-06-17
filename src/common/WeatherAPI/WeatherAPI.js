import WeatherCondition from './WeatherCondition';
import ReferenceCity from './ReferenceCity';

const subscriptionTimeout = 30000;

export default class WeatherAPI {
    constructor(key) {
        this._key = key;
        this._subscriptions = {};
        this._interval = window.setInterval(this.fetchForSubscriptions.bind(this), subscriptionTimeout);
    }

    async fetchWeatherForCity(city) {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?id=${city.id}&APPID=${this._key}&units=metric`);
        const data = await response.json();
        return {
            temperature: Math.round(data.main.temp),
            condition: WeatherCondition.fromID(data.weather[0].id),
        };
    }

    subscribeToWeatherForCity(city, handler) {
        if (!this._subscriptions[city.id]) this._subscriptions[city.id] = [];
        this._subscriptions[city.id].push(handler);
    }

    async fetchForSubscriptions() {
        const entries = Object.entries(this._subscriptions);
        for (const [cityId, handlers] of entries) {
            const city = ReferenceCity.fromID(cityId);
            const weather = await this.fetchWeatherForCity(city);
            handlers.forEach(handler => handler(weather));
        }
    }

    cleanup() {
        if (this._interval) window.clearInterval(this._interval);
    }
}
