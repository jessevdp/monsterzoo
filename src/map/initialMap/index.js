import Region from '@local/common/Region';
import jungle from './jungle.json';
import desert from './desert.json';
import northPole from './northPole.json';

export default function initialMap(region) {
    switch (region) {
    case Region.jungle: return jungle;
    case Region.desert: return desert;
    case Region.northPole: return northPole;
    default: return jungle;
    }
}