import { WorldNameConstants } from "../Managers/worldManager";
import { notImplementedError } from '../Errors/error';
import Entity, { IEntityOptions, IEntiryRenderInfo } from "./entity";
import PropertyContainer from "./Properties/propertyContainer";
import ImpassibleProperty from "./Properties/impassible";
import { LoDashImplicitStringWrapper } from "../../../node_modules/@types/lodash";

export interface IWallOptions extends IEntityOptions {
    world?: string;
    position?: [number, number];
}

export default class Wall extends Entity {

    constructor(options: IEntityOptions) {
        super(options);
        this._propContainer = new PropertyContainer([
            new ImpassibleProperty()
        ]);
    }

    public render(): IEntiryRenderInfo {
        return { ch: '#', fg: '#adaeb2', bg: '#2c2e33', prio: 4}
    }

    public setPosition(x: number, y: number, worldName: string): void {
        this._position = [x, y]
        this._currentWorld = worldName;
    }

    public get position() {
        return this._position;
    }

    public get currentWorld() {
        return this._currentWorld;
    }
}
