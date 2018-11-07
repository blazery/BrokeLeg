import {Player} from "./player";

export interface ITileOptions {
    x: number;
    y: number;
    worldName: string
    isWall?: boolean;
    objects? : Array<Player>;
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
    private _objects: Array<Player>;
    private _hasWall: boolean;
    private _worldName: string;


    constructor({ x, y, isWall, objects, worldName}: ITileOptions) {
        this._position = [x,y]
        this._hasWall = !!isWall;
        this._objects = objects || [];
        this._worldName = worldName;
    }

    public render(): ITileRender {
        const [x,y] = this._position;

        if(this._objects.length){
            const renderInfo = this._objects[0].render();
            return { x, y, ...renderInfo}
        }

        if(this._hasWall){
            return { x, y, ch: '#', fg: '#adaeb2', bg:'#2c2e33' }
        }

        return { x, y, ch: '⋅', fg: '#adaeb2', bg: '#2c2e33'}
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

    public get hasWall(){
        return this._hasWall;
    }
}