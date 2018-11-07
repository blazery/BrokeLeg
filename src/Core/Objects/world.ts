import Tile from './tile'
import {Player} from './player';
import {RNG} from 'rot-js';

export default class World{
    private _positions: Array<Array<Tile>>;
    private _dimensions: Array<number>;
    private _name: string

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
    }

    public getTileAt(x: number, y: number): Tile | null {
        const column = this._positions[x];
        if (column && column[y]) return column[y];
        return null
    }

    public setFloorPlan(plan: Array<Array<number>>){
        const width = plan.length,  height = plan[0].length;

        for (let i = 0; i < width; i++) {
            this._positions[i] = []
            for (let j = 0; j < height; j++) {
                this._positions[i][j] = new Tile({ x: i, y: j, isWall: !plan[i][j], worldName: this._name });
            }
        }
        this._dimensions = [width, height];
    }

    public spawnPlayer(player: Player){
        const [w, h] = this._dimensions;
        for(let i = 0; i < 100; i++){
        const x = RNG.getUniformInt(0, w -2)
        const y = RNG.getUniformInt(0, h - 2)
        const tile = this.getTileAt(x,y);
            if(tile && !tile.hasWall){
                tile.addEntity(player);
                return;
            }
        }
        
        throw new Error('No spawnLocation Found');
        
    }
}