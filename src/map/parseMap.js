import Tile from './Tile';
import Obstacle from './Obstacle';
import Monster from '../Monster';

export default function parseMap(data) {
    const map = data.map(parseRow);
    return linkTiles(map);
}

function parseRow(row) {
    return row.map(tile => createTile(tile));
}

function createTile(object) {
    if (object.class === 'Tile') {
        const tile = new Tile();
        if (object.monster) tile.placeMonster(new Monster(object.monster));
        return tile;
    }
    else if (object.class === 'Obstacle') return new Obstacle();
}

function linkTiles(map) {
    const height = map.length;
    const width = map[0].length;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const current = map[y][x];
            if (x > 0) current.west = map[y][x - 1];
            if (x < width - 1) current.east = map[y][x + 1];
            if (y > 0) current.north = map[y - 1][x];
            if (y < height - 1) current.south = map[y + 1][x];
        }
    }

    return map;
}