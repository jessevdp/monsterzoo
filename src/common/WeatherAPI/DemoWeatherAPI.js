import WeatherAPI from './WeatherAPI';
import WeatherCondition from './WeatherCondition';

export default class DemoWeatherAPI extends WeatherAPI {
    async fetchWeatherForCity() {
        return {
            temperature: 10,
            condition: WeatherCondition.mist,
        }
    }
}