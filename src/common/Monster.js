import Tooltip from 'tooltip.js';
import { Component, renderTemplate } from '@local/system';
import Registry from '@local/common/Registry';
import './styles/Monster.scss';

import audioSource from '@local/assets/monster.mp3';

export default class Monster extends Component {
    constructor(attributes = {}) {
        super();
        this.setState(attributes);
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
                    + '<div class="stats--power">power {{ power }}</div>'
                + '</div>'
            + '</div>';
        const description = this.getStatsMessage();
        const power = this.state.strength;
        return renderTemplate(template, { description, power });
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
        const audio = new Audio(audioSource);
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
}

function number(n) {
    return (n === 0) ? 'no' : n;
}