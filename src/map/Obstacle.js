import BaseTile from './BaseTile';
import './Obstacle.scss';

export default class Obstacle extends BaseTile {
    view() {
        return ''
            + '<div class="obstacle">'
                + '<div class="obstacle--content"></div>'
            + '</div>';
    }
}