import { IRenderInfo } from "./entity";
import * as ROT from 'rot-js';


export interface ILightTileOptions {
    ambientLight: string
}

export default class LightTile {

    private _color?: [number, number, number];
    private _ambientLight: string

    constructor(options: ILightTileOptions ) {
        this._ambientLight = options.ambientLight;
    }

    public shade(info: IRenderInfo, inFOV:boolean){
        if(this._color && inFOV){
                const color = ROT.Color.multiply(this._color, ROT.Color.fromString(info.bg || this._ambientLight))
                return { ...info, bg: ROT.Color.toHex(color) }
        }
        return {...info, bg: this._ambientLight};
    } 

    public set color(v: [number, number, number]){
        this._color = v;
    }
}