import { RadioButtonGroup } from '@local/common/form';
import Region from './Region';

export default class RegionSelector extends RadioButtonGroup {
    constructor() {
        const regions = Region.getAll().map(region => region.name);
        super('region', regions);
    }

    setState(state) {
        
        if (state.hasOwnProperty('region')) {
            const name = state.region.name
            let value;
            if (this.state.options.includes(name)) value = name;
            else value = this.state.options[0];
            this.value = value;
            return;
        }

        super.setState(state);
        super.setState({
            region: Region.fromName(this.state.value),
        });
    }
}