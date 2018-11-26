import { WorldNameConstants } from "../Managers/worldManager";
import { notImplementedError } from '../Errors/error'; 
import Entity, { IEntiryRenderInfo, IEntityOptions} from "./entity";
import LightSource from "./Properties/lightScource";
import {TriggerStrings} from './entity';

export interface IEntityOptions {
    world?: string;
    position?: [number, number];
}

export default class Lighter extends Entity {

    constructor(options: IEntityOptions) {
       super(options);
        this._propContainer.addProperty(new LightSource({ entity: this, color: [244, 170, 66]}))
    }

    public render(): IEntiryRenderInfo | null {
        console.warn(notImplementedError);
        return null;
    }

    public setPosition(x: number, y: number, worldName: string) {
        super.setPosition(x, y, worldName);

        // update world based on movement
        this._propContainer.trigger(TriggerStrings.MOVE);
    }
}
