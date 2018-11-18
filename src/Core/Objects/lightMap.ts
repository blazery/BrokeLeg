import Tile from './tile'
import { Player } from './player';
import * as ROT from 'rot-js';
import World from './world';
import LightTile from './lightTile';
import VM, {ViewNames} from '../Managers/viewManager';

export default class LightMap {
    private _positions: Array<Array<LightTile>>;
    private _dimensions: Array<number>;
    private _world: World
    private _fov: ROT.FOV.PreciseShadowcasting;

    constructor(width: number, height: number, world: World) {
        this._positions = [];
        for (let i = 0; i < width; i++) {
            this._positions[i] = []
            for (let j = 0; j < height; j++) {
                this._positions[i][j] = new LightTile();
            }
        }
        this._dimensions = [width, height];
        this._world = world;
        this._fov = new ROT.FOV.PreciseShadowcasting(this._checkLightPassibility, {topology: 8});
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
        const view = VM.getView(ViewNames.MAIN)
        view.currentDisplay.draw(x, y, '.', undefined, ROT.Color.toRGB(color));
    }

    private _checkLightPassibility = (x: number, y: number) => {
        const tile = this._world.getTileAt(x, y);
        if(tile){
            const objects = tile.Objects as any;
            for (const obj of objects){
                const lp = obj.lightPasses;
                if (lp === false){
                    return false;
                }
            }
            return true;
         }else{
            return false;
        }
    }

    private _checkLightReflectivity = (x: number, y: number) => {
        const tile = this._world.getTileAt(x, y);
        return 0.2
    }
}