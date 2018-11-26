import { invalidOptions} from '../../Errors/error'
import Entity, { TriggerStrings } from '../entity';
import Property from './property';
import WM from '../../Managers/worldManager'

export interface lightSourceInfo{
            x: number;
            y: number;
            color : [number, number, number];
    }

export interface lightSourceValues {
    entity: Entity;
    color: [number, number, number];
    registeredToWorld?: string;
}

export default class LightSource extends Property {

    protected _values: lightSourceValues;

    constructor(options: any) {
        super(options);
        if(options.entity && options.color){
            this._values = { entity: options.entity, color: options.color}
            const world = WM.getWorld(this._values.entity.currentWorld);
            world.lightMap.registerLightScource(this._values.entity);
            this._values.registeredToWorld = this._values.entity.currentWorld;

            const updateOnMove = () => {
                const currentWorld = this._values.entity.currentWorld;
                if(currentWorld !== this._values.registeredToWorld && this._values.registeredToWorld){
                    const prevWorld = WM.getWorld(this._values.registeredToWorld);
                    prevWorld.lightMap.unregisterLightScource(this._values.entity);
                    WM.getWorld(currentWorld).lightMap.registerLightScource(this._values.entity);
                    this._values.registeredToWorld = currentWorld;
                }
                const worldToUse = WM.getWorld(currentWorld);
                worldToUse.lightMap.updateLightMap();
            }

            this._values.entity.bindTrigger({func: updateOnMove, triggers: [TriggerStrings.MOVE] })
        } else {
            throw invalidOptions;
        }
    }

    getLightScource = (): lightSourceInfo => {
        const [x, y] = this._values.entity.position;
        return {x, y, color: this._values.color}
    }
}