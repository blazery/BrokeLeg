import {Player} from "./player";
import Entity, { IRenderInfo } from "./entity";

export interface ITileOptions {
    x: number;
    y: number;
    worldName: string
    objects? : Array<Entity>;
}

export interface ITileRender {
    x: number;
    y: number;
    ch: string;
    fg?: string;
    bg?: string;
}

export default class Tile {
    private _position: Array<number>;
    private _objects: Array<Entity>;
    private _worldName: string;


    constructor({ x, y, objects, worldName}: ITileOptions) {
        this._position = [x,y]
        this._objects = objects || [];
        this._worldName = worldName;
    }

    public render(): IRenderInfo {
        const [x,y] = this._position;

        if(this._objects.length){
            const renderInfo = this._objects[0].render();
            if(renderInfo){
                return {...renderInfo}
            }
        }

        return {ch: '⋅', fg: '#adaeb2', bg: '#2c2e33'}
    }

    public addEntity(ent: Player){
        this._objects.push(ent);
        const [x,y] = this._position;
        ent.setPosition(x,y, this._worldName);
    }

    public removeEntity(ent: Player) {
        const index = this._objects.indexOf(ent)
        if(index === -1){
            console.warn('entity not found: ', ent);
            return;
        }
        const result = this._objects.splice(index,1)
    }

    public get hasWall(): boolean{
        for(const o of this._objects){
            const {isPassible} = o.props;
            if (isPassible && !isPassible()){
                return true;
            }
        }
        return false;
    }

    public get Objects(){
        return this._objects;
    }
}