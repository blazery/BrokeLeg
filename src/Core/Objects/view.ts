import World from './world'
import WM from '../Managers/worldManager'
import { Display } from '../../../node_modules/@types/rot-js';
import { WorldNameConstants} from '../Managers/worldManager';

export interface IViewOptions { 
    width: number, 
    height: number, 
    x?: number, 
    y?: number,
    worldName?: string 
}


export default class View {
    private _position: Array<number>;
    private _dimensions: Array<number>;
    private _lookAtWorld: World;

    constructor({width, height, x = 0, y = 0, worldName}: IViewOptions) {
        this._position = [x,y];
        this._dimensions = [width, height];
        this._lookAtWorld = WM.getWorld(worldName || WorldNameConstants.DEFAULT );
    }


    public render (display: Display): void{
        display.clear();
        const [width, height] = this._dimensions;

        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                const [world_x, world_y] = this.getWorldPosition(x,y);
                const tile = this._lookAtWorld.getTileAt(world_x, world_y)
                if(tile){
                    const {ch, fg, bg} = tile.render();
                    display.draw(x, y, ch, fg, bg)
                }
            }
        }
    }

    private getWorldPosition(x: number, y: number): Array<number>{
        const [xp, yp] = this._position;
        return [x + xp, y + yp];
    }
}