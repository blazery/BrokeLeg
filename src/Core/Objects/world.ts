import Tile from './tile'
import {Player} from './player';
import {RNG} from 'rot-js';
import LightMap from './lightMap';
import Wall from './wall';
import { IRenderInfo } from './entity';

export default class World{
    private _positions: Array<Array<Tile>>;
    private _dimensions: Array<number>;
    private _name: string
    private _lightMap: LightMap;
    private _explorationMap: Map<string, string> = new Map<string, string>();

    constructor(width: number, height: number, name: string){
        this._positions = [];
        for(let i = 0; i < width ; i++){
            this._positions[i] = []
            for (let j = 0; j < height; j++) {
                this._positions[i][j] = new Tile({x:i, y:j, worldName: name});
            }
        }
        this._dimensions = [width, height];
        this._name = name;
        this._lightMap = new LightMap(width, height, this);
    }


    public render(x: number, y: number, inFOV: boolean = true): IRenderInfo | null{
        const tile = this.getTileAt(x, y);
        if(tile){
            const renderInfo = tile.render();
            const lightedTile = this._lightMap.shadeTile(x, y, inFOV, renderInfo);
            return lightedTile;
        }
        return null
    }

    private _computeLightMap(){
        this._lightMap.compute();
    }

    get lightMap() {
        return this._lightMap;
    }

    public getTileAt(x: number, y: number): Tile | null {
        const column = this._positions[x];
        if (column && column[y]) return column[y];
        return null
    }

    public addToExplorationMap(positions: Array<Array<number>> ){
        for (const [x,y] of positions){
            const stringCoord = `${x},${y}`;
            if (!this._explorationMap.get(stringCoord)){
                this._explorationMap.set(stringCoord, stringCoord);
            }
        }
    }

    public get explorationMap(): Map<string, string> {
        return this._explorationMap;
    }

    public setFloorPlan(plan: Array<Array<number>>){
        const width = plan.length,  height = plan[0].length;

        for (let i = 0; i < width; i++) {
            this._positions[i] = []
            for (let j = 0; j < height; j++) {
                const objs = !plan[i][j] ? [new Wall({})] : [];
                this._positions[i][j] = new Tile({ x: i, y: j, objects: objs, worldName: this._name });
            }
        }
        this._dimensions = [width, height];
        this._computeLightMap();
    }

    public spawnPlayer(player: Player){
        const [w, h] = this._dimensions;
        for(let i = 0; i < 100; i++){
        // const x = RNG.getUniformInt(0, w - 2)
        // const y = RNG.getUniformInt(0, h - 2)
            const x = RNG.getUniformInt(0, 45)
            const y = RNG.getUniformInt(0, 45)
        const tile = this.getTileAt(x,y);
            if(tile && !tile.hasWall){
                tile.addEntity(player);
                return;
            }
        }
        
        throw new Error('No spawnLocation Found');
        
    }
}