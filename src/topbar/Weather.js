import { Component, renderTemplate } from '@local/system';
import WeatherAPI from '@local/common/WeatherAPI';
import CentralStore from '@local/common/CentralStore';

import WeatherIcon from './WeatherIcon';
import './styles/Weather.scss';

export default class Weather extends Component {
    constructor() {
        super();
        this.bind('region', CentralStore);
    }

    view() {
        const icon = this.getConditionIcon();
        const template = ''
            + '<div class="weather bg-900">'
                + '<div class="weather--icon">'
                    + '{{{ icon }}}'
                + '</div>'
                + '<span class="weather--temperature">'
                    + '{{#temperature}}{{.}}{{/temperature}}'
                    + '{{^temperature}}&mdash;&nbsp;{{/temperature}}'
                + '</span>'
                + '&deg;'
            + '</div>';
        return renderTemplate(template, {...this.state, icon});
    }

    getConditionIcon() {
        if (!this.state.condition) return WeatherIcon.noData;

        switch (this.state.condition.id) {
        case 1: return WeatherIcon.sun;
        case 2: return WeatherIcon.cloudSun;
        case 3: return WeatherIcon.cloud;
        case 4: return WeatherIcon.rain;
        case 5: return WeatherIcon.showers;
        case 6: return WeatherIcon.lightning;
        case 7: return WeatherIcon.snow;
        case 8: return WeatherIcon.mist;
        default: return WeatherIcon.noData;
        }
    }

    effects(useEffect) {
        if (this.state.region) useEffect(() => {
            const city = this.state.region.referenceCity;
            const handler = weather => this.setState(weather);
            WeatherAPI.subscribeToWeatherForCity(city, handler);
            return () => WeatherAPI.unsubscribeFromWeatherForCity(city, handler);
        }, [this.state.region.id]);
    }
}