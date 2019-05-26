import * as ROT from 'rot-js';
import World from './world';
import LightTile from './lightTile';
import Entity, { IRenderInfo } from './entity';
import { alreadyExists } from '../Errors/error';

// could be an abstraction of world
export default class LightMap {
    private _positions: Array<Array<LightTile>>;
    private _dimensions: Array<number>;
    private _world: World
    private _fov: ROT.FOV.RecursiveShadowcasting;
    private _ambientLight: string = '#000000'
    private _lightScources: Array<Entity> = [];
    private _lightMapNeedsUpdate: boolean = false;

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
        this._fov = new ROT.FOV.RecursiveShadowcasting(this._checkLightPassibility, {topology: 8});
    }

    public registerLightScource(e: Entity){
        if(this._lightScources.indexOf(e) === -1){
            this._lightScources.push(e);
            this._lightMapNeedsUpdate = true;
        }else{
            throw alreadyExists;
        }
    }

    public unregisterLightScource(e: Entity){
        const index = this._lightScources.indexOf(e);
        if(index !== -1){
            this._lightScources = this._lightScources.splice(index, 1);
            this._lightMapNeedsUpdate = true;
        } else {
            throw alreadyExists;
        }
    }

    public updateLightMap(){
        this._lightMapNeedsUpdate = true;
    }

    public shadeTile(x: number, y: number, inFOV: boolean, info: IRenderInfo): IRenderInfo | null{
        if (this._lightMapNeedsUpdate){
            this.compute();
        }

        const light = this.getTileAt(x,y);
        if(light){
            return light.shade(info, inFOV);
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
        lighting.setFOV(this._fov)
        lighting.clearLights(); 
        this._lightScources.forEach((e) => {
            const info = e.props.getLightScource();
            lighting.setLight(info.x, info.y, info.color)
        })
        lighting.compute(this._lightingCallback);
        this._lightMapNeedsUpdate = false;
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