import Tile from './tile'

export default class World{
    private _positions: Array<Array<Tile>>;

    constructor(width: number, height: number){
        this._positions = [];
        for(let i = 0; i < width ; i++){
            this._positions[i] = []
            for (let j = 0; j < height; j++) {
                this._positions[i][j] = new Tile({x:i, y:j});
            }
        }
    }

    public getTileAt(x: number, y: number): Tile | null {
        const column = this._positions[x];
        if (column && column[y]) return column[y];
        return null
    }
}