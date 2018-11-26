
import Property from './property';

export default class ImpassibleProperty extends Property {

    constructor(props?: Array<Property>) {
        super(props);
    }

    public isPassible = (): boolean => {
        return false;
    }
}