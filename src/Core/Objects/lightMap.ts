import Tile from './tile'
import { Player } from './player';
import * as ROT from 'rot-js';
import World from './world';
import LightTile from './lightTile';
import VM, {ViewNames} from '../Managers/viewManager';
import { IRenderInfo } from './entity';

export default class LightMap {
    private _positions: Array<Array<LightTile>>;
    private _dimensions: Array<number>;
    private _world: World
    private _fov: ROT.FOV.PreciseShadowcasting;
    private _ambientLight: string = '#000000'

    constructor(width: number, height: number, world: World) {
        this._positions = [];
        for (let i = 0; i < width; i++) {
            this._positions[i] = []
            for (let j = 0; j < height; j++) {
                this._positions[i][j] = new LightTile({ambientLight: this._ambientLight});
            }
        }
        this._dimensions = [width, height];
        this._world = world;
        this._fov = new ROT.FOV.PreciseShadowcasting(this._checkLightPassibility, {topology: 8});
    }

    public shadeTile(x: number, y: number, info: IRenderInfo): IRenderInfo | null{
        const light = this.getTileAt(x,y);
        if(light){
            return light.shade(info);
        }
        return null;
    }

    public getTileAt(x: number, y: number): LightTile | null {
        const column = this._positions[x];
        if (column && column[y]) return column[y];
        return null
    }


    public compute(){
        const lighting = new ROT.Lighting(this._checkLightReflectivity, {range: 12})
        lighting.setFOV(this._fov);
        lighting.setLight(12, 12, [240, 240, 30]);
        lighting.setLight(20, 20, [240, 60, 60]);
        lighting.setLight(45, 25, [200, 200, 200]);

        lighting.compute(this._lightingCallback);
    }

    private _lightingCallback = (x: number, y:number, color: [number, number, number]) => {
       const xArray = this._positions[x];
       const value = xArray && xArray[y];
       if(value){
           value.color = color;
       }
    }

    private _checkLightPassibility = (x: number, y: number) => {
        const tile = this._world.getTileAt(x, y);
        if(tile){
            return !tile.hasWall;
         }else{
            return false;
        }
    }

    private _checkLightReflectivity = (x: number, y: number) => {
        const tile = this._world.getTileAt(x, y);
        return 0.2
    }
}