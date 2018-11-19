import { IRenderInfo } from "./entity";
import * as ROT from 'rot-js';
const black = '#000000';
export default class LightTile {

    private _color?: [number, number, number];

    constructor() {

    }

    public shade(info: IRenderInfo){
        if(this._color){
            const color = ROT.Color.multiply(this._color, ROT.Color.fromString(info.bg || black))
            return {...info, bg: ROT.Color.toHex(color)}
        }
        return {...info, bg:black};
    } 

    public set color(v: [number, number, number]){
        this._color = v;
    }
}