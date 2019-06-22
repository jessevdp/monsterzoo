import Two from 'two.js';
import { Component } from '@local/system';

export default class Background extends Component {
    view() {
        return '<div class="background"></div>';
    }

    effects(useEffect) {
        useEffect(() => {
            if (!this.two) {
                const $el = this.getHTMLElement();
                this.two = new Two({
                    height: $el.clientHeight,
                    width: $el.clientWidth,
                    autostart: true,
                });
                this.two.appendTo($el);
            }
            executeBackground(this.two);
            return () => {
                this.two.clear();
                this.two.unbind();
                this.two = null;
            }
        });
    }

    events() {
        this._resize = window.addEventListener('resize', () => {
            if (this.two) {
                const $two = this.getHTMLElement('svg');
                const $el = this.getHTMLElement();
                const oldHeight = $two.clientHeight;
                const oldWidth = $two.clientWidth;
                const newHeight = $el.clientHeight; 
                const newWidth = $el.clientWidth;

                if (oldHeight === newHeight && oldWidth === newWidth) return;

                this.two.renderer.setSize(newWidth, newHeight);
                this.two.height = newHeight;
                this.two.width = newWidth;

                executeBackground(this.two);
            }
        });
    }

    cleanup() {
        super.cleanup();
        if (this._resize) window.removeEventListener('resize', this._resize);
    }
}

function executeBackground(two) {
    two.clear();
    two.unbind();
    draw(two);
    two.update();
}

let theta = 0;

function draw(two) {
    const amplitude = two.height / 16;
    const velocity = Math.PI / 200;

    const x = two.width / 2;
    const y = two.height;

    const water = two.makeRectangle(x, y, two.width * 1.25, two.height * 0.25);
    water.linewidth = 40;
    water.subdivide(32);
    water.stroke = 'rgba(222, 240, 216, .5)';
    water.fill = '#CFE6D0';

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