export interface ITileOptions {
    x: number;
    y: number;
    objects? : Array<Object>;
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
    private _objects: Array<object>;


    constructor({x,y, objects}: ITileOptions) {
        this._position = [x,y]
        this._objects = objects || [];
    }

    public render(): ITileRender {
        const [x,y] = this._position;

        if(this._objects.length){
            return {x,y, ch: '@'}
        }

        return { x, y, ch: '⋅'}
    }
}