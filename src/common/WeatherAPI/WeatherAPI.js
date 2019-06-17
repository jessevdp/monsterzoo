import WeatherCondition from './WeatherCondition';
import ReferenceCity from './ReferenceCity';

const subscriptionTimeout = 60000;

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
        if (!this._subscriptions[city.id]) this._subscriptions[city.id] = { handlers: [] };
        this._subscriptions[city.id].handlers.push(handler);
        this.fetchWeatherForCity(city)
            .then(weather => handler(weather));
    }

    unsubscribeFromWeatherForCity(city, handler) {
        const subscriptions = this._subscriptions[city.id];
        if (!subscriptions) return;
        const index = subscriptions.handlers.indexOf(handler);
        if (index > -1) subscriptions.handlers.splice(index, 1);
    }

    async fetchForSubscriptions() {
        for (const [cityId, subscription] of Object.entries(this._subscriptions)) {
            const city = ReferenceCity.fromID(cityId);

            let weather;
            try {
                weather = await this.fetchWeatherForCity(city);
            } catch (e) { return; }

            if (hasChanged(subscription.previous, weather)) {
                subscription.handlers.forEach(handler => handler(weather));
            }
            subscription.previous = weather;
        }
    }

    cleanup() {
        if (this._interval) window.clearInterval(this._interval);
    }
}

function hasChanged(previous, weather) {
    if (!previous) return true;
    if (previous.temperature !== weather.temperature) return true;
    if (previous.condition.name !== weather.condition.name) return true;
    return false;
}