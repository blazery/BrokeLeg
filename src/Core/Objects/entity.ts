import { WorldNameConstants } from "../Managers/worldManager";
import { notImplementedError} from '../Errors/error';
import PropertyContainer from "./Properties/propertyContainer";

export interface IEntityOptions {
        world?: string;
        position?: [number, number];
}

export interface IRenderInfo {
    ch: string;
    fg?: string;
    bg?: string;
}

export interface IEntiryRenderInfo {
    ch: string;
    prio: number;
    fg?: string;
    bg?: string;
}

export default abstract class Entity {
    protected _currentWorld: string
    protected _position: [number, number]
    protected _propContainer: PropertyContainer;

    constructor({world, position}: IEntityOptions) {
        this._position = position || [-1, -1];
        this._currentWorld = world || WorldNameConstants.DEFAULT;
        this._propContainer = new PropertyContainer();
    }

    public render(): IEntiryRenderInfo | null {
        console.warn(notImplementedError);
        return null;
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

    public get props(): any {
        return this._propContainer.props;
    }
}
