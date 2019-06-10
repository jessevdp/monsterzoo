import { Component } from '@local/system';
import './Obstacle.scss';

export default class Obstacle extends Component {
    view() {
        return ''
            + '<div class="obstacle">'
                + '<div class="obstacle--content"></div>'
            +'</div>';
    }
}