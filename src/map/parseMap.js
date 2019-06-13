import Tile from './Tile';
import Obstacle from './Obstacle';
import Monster from '../Monster';

export default function parseMap(data) {
    return data.map(parseRow);
}

function parseRow(row) {
    return row.map(tile => createTile(tile))
}

function createTile(object) {
    if (object.class === 'Tile') {
        const tile = new Tile();
        if (object.monster) tile.placeMonster(new Monster(object.monster));
        return tile;
    }
    else if (object.class === 'Obstacle') return new Obstacle();
}