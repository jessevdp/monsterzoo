import { Component } from '@local/system';

const defaultNeighbors = {
    north: null,
    east: null,
    south: null,
    west: null
};

export default class BaseTile extends Component {
    constructor() {
        super();
        this.setState(defaultNeighbors);
    }

    notify() {
        return;
    }

    get north() {
        return this.state.north;
    }
    set north(north) {
        this.setState({ north });
    }

    get east() {
        return this.state.east;
    }
    set east(east) {
        this.setState({ east });
    }

    get south() {
        return this.state.south;
    }
    set south(south) {
        this.setState({ south });
    }

    get west() {
        return this.state.west;
    }
    set west(west) {
        this.setState({ west });
    }
}