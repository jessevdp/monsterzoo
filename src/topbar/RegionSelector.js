import { RadioButtonGroup } from '@local/common/form';
import Region from './Region';

export default class RegionSelector extends RadioButtonGroup {
    constructor() {
        const regions = Region.getAll().map(region => region.name);
        super('region', regions);
    }

    setState(state) {
        super.setState(state);
        super.setState({
            region: Region.fromName(this.state.value),
        });
    }
}