import Two from 'two.js';
import { Component } from '@local/system';
import CentralStore from '@local/common/CentralStore';

export default class Background extends Component {
    constructor() {
        super();
        this.bind('region', CentralStore);
    }

    view() {
        return '<div class="background"></div>';
    }

    effects(useEffect) {
        useEffect(() => this.setSize());
        useEffect(backgroundEffect.bind(this), [this.state.width, this.state.height, this.state.region]);
    }

    events() {
        this._resize = window.addEventListener('resize', this.setSize.bind(this));
    }

    setSize() {
        const $el = this.getHTMLElement();
        const oldHeight = this.state.height;
        const oldWidth = this.state.width;
        const height = $el.clientHeight; 
        const width = $el.clientWidth;
        if (oldHeight !== height || oldWidth !== width) this.setState({ height, width });
    }

    cleanup() {
        super.cleanup();
        if (this._resize) window.removeEventListener('resize', this._resize);
    }
}

function backgroundEffect() {
    if (!this.two) {
        const $el = this.getHTMLElement();
        this.two = createTwo($el);
        this.two.appendTo($el);
    }
    
    updateTwoSize(this.two, this.state);
    executeBackground(this.two, this.state);

    return () => {
        this.two.clear();
        this.two.unbind();
        this.two = null;
    };
}

function createTwo($el) {
    return new Two({
        height: $el.clientHeight,
        width: $el.clientWidth,
        autostart: true,
    });
}

function updateTwoSize(two, state) {
    two.renderer.setSize(state.width, state.height);
    two.height = state.height;
    two.width = state.width;
}

function executeBackground(two, state) {
    two.clear();
    two.unbind();
    draw(two, state);
    two.update();
}

let theta = 0;

function draw(two, state) {
    const amplitude = two.height / 16;
    const velocity = Math.PI / 200;

    const x = two.width / 2;
    const y = two.height;

    const water = two.makeRectangle(x, y, two.width * 1.25, two.height * 0.25);
    water.linewidth = 40;
    water.subdivide(32);

    if (state.region.id === 1) {
        water.stroke = 'rgba(222, 240, 216, .5)';
        water.fill = '#CFE6D0';
    }
    else if (state.region.id === 2) {
        water.stroke = 'rgba(240, 231, 204, .5)';
        water.fill = '#E8DFC5';
    }
    else {
        water.stroke = 'rgba(218, 240, 242, .5)';
        water.fill = '#D1E5E8';
    }
   
    for (let i = 0; i < water.vertices.length; i++) {
        const vertex = water.vertices[i];
        vertex.origin = new Two.Vector().copy(vertex);
    }

    two.bind('update', function() {
        for (let i = 0; i < water.vertices.length; i++) {
            const vertex = water.vertices[i];
            const pct = i / (water.vertices.length  - 1);
            const offset = Math.PI * 2 * pct;
            vertex.y = vertex.origin.y + amplitude * Math.sin(offset + theta);
            vertex.x = vertex.origin.x;
        }
        theta += velocity;
    });
}