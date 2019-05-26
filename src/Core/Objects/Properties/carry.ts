import { invalidOptions } from '../../Errors/error'
import Entity, { TriggerStrings } from '../entity';
import Property from './property';
import WM from '../../Managers/worldManager'

export interface CarryInfo {

}

export interface CarryValues {
    items: Array<Entity>;
    entity: Entity;
}

export default class Carry extends Property {

    protected _values: CarryValues;

    constructor(options: any) {
        super(options);
        if (options.entity) {
            this._values = {entity: options.entity, items : options.items || []}


            const moveHandler = () => {
                const [x, y] = this._values.entity.position;
                const worldName = this._values.entity.currentWorld;
                for (const item of this._values.items) {
                    item.setPosition(x, y, worldName);
                }
            }

            this._values.entity.bindTrigger({ func: moveHandler, triggers: [TriggerStrings.MOVE]})
        } else {
            throw invalidOptions;
        }
    }
}