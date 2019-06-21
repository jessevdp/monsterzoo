import { RadioButtonGroup } from '@local/common/form';
import Region from '@local/common/Region';

export default class RegionSelector extends RadioButtonGroup {
    constructor() {
        const regions = Region.getAll().map(region => region.name);
        super('region', regions);
        loadRegionFromStorage(this);
    }

    setState(state) {
        if (state.hasOwnProperty('region')) {
            const name = state.region.name;
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

    effects(useEffect) {
        useEffect(() => localStorage.setItem('region', this.value));
    }
}

function loadRegionFromStorage(regionSelector) {
    const storedValue = localStorage.getItem('region');
    const region = Region.fromName(storedValue);
    if (region) regionSelector.value = region.name;
}