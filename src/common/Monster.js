import Tooltip from 'tooltip.js';
import { Component, renderTemplate, EventBus } from '@local/system';
import Registry from '@local/common/Registry';
import WeatherAPI from '@local/common/WeatherAPI';
import CentralStore from '@local/common/CentralStore';

import './styles/Monster.scss';
import audioSource from '@local/assets/monster.mp3';

const audio = new Audio(audioSource);
audio.preload = 'auto';

export default class Monster extends Component {
    constructor(attributes = {}) {
        super();
        this.setState(attributes);
        this.bind('region', CentralStore);
    }

    view() {
        const template = ''
            + '<div class="monster {{color}}" draggable="true">'
                + '<div class="monster--internal"></div>'
            + '</div>';
        return renderTemplate(template, { color: this.state.skinColor });
    }

    statsView() {
        const template = ''
            + '<div class="bg-800 monster--stats">'
                + '<div class="stats--preview"></div>'
                + '<div class="stats--details">'
                    + '<p class="text-sm stats--description">{{ description }}</p>'
                    + '<div class="stats--power">'
                        + '<span>power {{ power }}</span>'
                        + '{{#powerPercentage}}'
                            + '<span class="stats--power--percentage">{{ . }}%</span>'
                        + '{{/powerPercentage}}'
                    + '</div>'
                + '</div>'
            + '</div>';

        const description = this.getStatsMessage();
        const power = this.state.strength;
        let powerPercentage = getPowerAlterationPercentage(this.state.type, this.state.weather);
        powerPercentage = percentage(powerPercentage);
        return renderTemplate(template, { description, power, powerPercentage });
    }

    events() {
        this.on('dragstart', e => {
            const index = Registry.add(this);
            e.dataTransfer.setData('monster', index);
        });
        this.on('dragstart', () => this.getHTMLElement().classList.add('dragged'));
        this.on('dragend', () => this.getHTMLElement().classList.remove('dragged'));
        this.on('click', '.monster--internal', () => this.activateAbility());
    }

    effects(useEffect) {
        useEffect(() => {
            const $el = this.getHTMLElement();
            const options = {
                title: this.statsView(),
                html: true,
                placement: 'right',
                delay: {
                    show: 500
                },
            };
            const tooltip = new Tooltip($el, options);
            return () => tooltip.dispose();
        });

        if (this.state.region) useEffect(() => {
            const city = this.state.region.referenceCity;
            const handler = weather => this.setState({ weather });
            WeatherAPI.subscribeToWeatherForCity(city, handler);
            return () => WeatherAPI.unsubscribeFromWeatherForCity(city, handler);
        }, [this.state.region.id]);
    }

    getStatsMessage() {
        const skin = `${this.state.skinColor} ${this.state.skinType}`;
        const arms = `${number(this.state.arms)} ${this.state.armType}`;
        const legs = `${number(this.state.legs)} legs`;
        const eyes = `${number(this.state.eyes)} eyes`;
        return `${this.state.name} is a ${this.state.type} monster with ${skin}, ${arms}, ${legs}, and ${eyes}.`;
    }

    activateAbility() {
        this.getHTMLElement().classList.add('special-ability');
        audio.play();
        window.setTimeout(() => {
            this.getHTMLElement().classList.remove('special-ability');
        }, 500);
    }
    
    notify() {
        this.getHTMLElement().classList.add('grow');
        window.setTimeout(() => {
            this.getHTMLElement().classList.remove('grow');
        }, 500);
    }

    moved() {
        EventBus.emit('monster-moved');
    }
}

function number(n) {
    return (n === 0) ? 'no' : n;
}

function percentage(n) {
    let prefix;
    if (n > 0) prefix = '+';
    else if (n < 0) {
        prefix = '-';
        n *= -1;
    }
    else return n;
    return prefix + n;
}

function getPowerAlterationPercentage(type, weather) {
    if (!weather) return 0;
    let percentage = 0;

    if (type === 'water') {
        if ([4, 5].includes(weather.condition.id)) percentage += 10; // rain, showers
        if (weather.temperature <= 20 && weather.temperature >= 5) percentage += 5;
        if (weather.temperature >= 30) percentage -= 10;
    }
    if (type === 'fire') {
        if (weather.temperature >= 20) percentage += 10;
        if (weather.temperature <= 5) percentage -= 10;
        if (weather.condition.id === 6) percentage += 5; // thunderstorm
        if ([4, 5, 7].includes(weather.condition.id)) percentage -= 5; // rain, showers, snow
    }
    if (type === 'earth') {
        if ([3, 8].includes(weather.condition.id)) percentage += 5; // clouds, mist
        if (weather.temperature >= 25) percentage -= 5;
    }
    if (type === 'air') {
        if (weather.condition.id === 1) percentage += 10; // clear
        if (weather.condition.id === 2) percentage += 5; // few clouds
        if ([4, 5, 6, 7].includes(weather.condition.id)) percentage -= 5; // rain, showers, thunderstorm, snow
    }

    return percentage;
}