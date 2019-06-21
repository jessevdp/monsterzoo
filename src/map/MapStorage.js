import { excludeProperties } from '@local/utilities';
import Monster from '@local/common/Monster';
import initialMap from './initialMap';

class MapStorage {
    put(region, map) {
        const key = storageKey(region);
        const data = prepareMapForStorage(map);
        localStorage.setItem(key, JSON.stringify(data));
    }
    get(region) {
        const key = storageKey(region);
        const data = localStorage.getItem(key);
        if (data) return JSON.parse(data);
        else return initialMap(region);
    }
}

function prepareMapForStorage(mapData) {
    return mapData.map(row => {
        return row.map(tile =>  {
            const data = { class: tile.constructor.name };
            if (tile.state.monster instanceof Monster) {
                data.monster = excludeProperties(['region', 'weather'], tile.state.monster.state);
            }
            return data;
        });
    });
}

function storageKey(region) {
    return 'map#' + region.id;
}

export default new MapStorage();