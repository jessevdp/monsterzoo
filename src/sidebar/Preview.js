import Monster from '@local/Monster';
import SidebarTile from './SidebarTile';

const title = 'Your Monster';
const description = 'This is a preview of the monster configured above. You can drag it out onto the grid. You can also drag a monster here in order to update it.';

export default class Preview extends SidebarTile {
    constructor(resetConfigurator) {
        super(title, description);
        this.resetConfigurator = resetConfigurator;
    }

    setState(state) {
        if (state.monster instanceof Monster) {
            super.placeMonster(state.monster);
        }
        else super.setState(state);
    }

    removeMonster() {
        super.removeMonster();
        this.resetConfigurator();
    }
}