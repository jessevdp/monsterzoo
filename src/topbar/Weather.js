import { Component, renderTemplate } from '@local/system';
import WeatherAPI from '@local/common/WeatherAPI';

import './styles/Weather.scss';

export default class Weather extends Component {
    constructor(city) {
        super();
        this.setState({ city });
    }

    view() {
        const template = ''
            + '<div class="weather bg-900">'
                + '{{#temperature}}{{.}}{{/temperature}}'
                + '{{^temperature}}&mdash;&nbsp;{{/temperature}}'
                + '&deg;'
            + '</div>';
        return renderTemplate(template, this.state);
    }

    effects(useEffect) {
        useEffect(() => {
            const handler = weather => this.setState(weather);
            WeatherAPI.subscribeToWeatherForCity(this.state.city, handler);
            return () => WeatherAPI.unsubscribeFromWeatherForCity(this.state.city, handler);
        }, [this.state.city]);
    }
}