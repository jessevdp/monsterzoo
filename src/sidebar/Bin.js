import SidebarTile from './SidebarTile';

const title = 'Monster Bin';
const description = 'Drag a monster here to remove it form the zoo.';

export default class Bin extends SidebarTile {
    constructor() {
        super(title, description);
    }

    placeMonster(monster) {
        super.placeMonster(monster);
        this.removeMonster();
    }
}