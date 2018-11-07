import World from './world'
import WM from '../Managers/worldManager'
import { Display } from '../../../node_modules/@types/rot-js';
import { WorldNameConstants} from '../Managers/worldManager';


export enum DisplayTypes{
    FULLSCREEN,
    SQUARE,
    CIRCLE
}

export interface IViewOptions { 
    width: number, 
    height: number, 
    display: Display
    x?: number, 
    y?: number,
    worldName?: string;
    displayType?: DisplayTypes;
}


export default class View {
    private _position: Array<number>;
    private _dimensions: Array<number>;
    private _lookAtWorldName: string;
    private _displayType: DisplayTypes;
    private _display: Display;
    private _centerDeadZone: Array<number> = [5,3];



    constructor({width, height, x = 0, y = 0, worldName, displayType, display}: IViewOptions) {
        this._position = [x,y];
        this._dimensions = [width, height];
        this._lookAtWorldName = worldName || WorldNameConstants.DEFAULT;
        this._displayType = displayType || DisplayTypes.FULLSCREEN;
        this._display = display;
    }


    public render (display?: Display): void{

        const displayToUse = display || this._display;
        const world = WM.getWorld(this._lookAtWorldName);
        if(!world){
            throw new Error('World to look at not found')
        }
       
        const [width, height] = this.getViewPortDimensions(displayToUse);
        displayToUse.clear();

        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                const [world_x, world_y] = this.getWorldPosition(x,y);
                const tile = world.getTileAt(world_x, world_y)
                if(tile){
                    const {ch, fg, bg} = tile.render();
                    displayToUse.draw(x, y, ch, fg, bg)
                }
            }
        }
    }

    public center(x: number, y: number){
        const [wd, hd] = this.getViewPortDimensions(this._display);
        const [cx, cy] = this._position;
        const [dx, dy] = this._centerDeadZone;
        
        const 
            centerX = cx + Math.floor(wd / 2),
            centerY = cy + Math.floor(hd / 2),
            leftBound = centerX - dx,
            rightBound = centerX + dx,
            topBound = centerY - dy,
            bottomBound = centerY + dy;

        let xpan = 0, ypan = 0;

        if (x < leftBound){
            xpan = x - leftBound;
        } else if (x > rightBound){
            xpan = x - rightBound;
        }

        if (y < topBound){
            ypan = y - topBound;
        } else if (y > bottomBound) {
            ypan = y - bottomBound;
        }

        if(xpan || ypan){
            this._position = [cx + xpan, cy + ypan];
            this.render()
        }
    }

    public updateWorldPositions(positions: Array<Array<number>>){     
        const world = WM.getWorld(this._lookAtWorldName);
        for(const pos of positions){
            const [wx, wy] = pos;
            const screenPos = this.getScreenPosition(wx, wy)
            if(screenPos){
                const tile = world.getTileAt(wx, wy);
                const [sx, sy] = screenPos;
                if(tile){
                    const { ch, fg, bg } = tile.render();
                    this._display.draw(sx, sy, '', fg, bg)
                    this._display.draw(sx, sy, ch, fg, bg)
                }else{
                    console.warn('No tile found to update')
                }
            }
        }
    }

    private getViewPortDimensions(display: Display): Array<number> {
        let width, height;
        const [wd, hd] = this._dimensions;
        switch (this._displayType) {
            case (DisplayTypes.FULLSCREEN):
                const options = display.getOptions();
                width = options.width || wd;
                height = options.height || hd;
                break;
            case (DisplayTypes.SQUARE):
                width = wd
                height = hd
                break;
            default:
                throw new Error('Unsupported DisplayType')
        }

        return [width, height];
    }

    private getWorldPosition(x: number, y: number): Array<number>{
        const [xp, yp] = this._position;
        return [x + xp, y + yp];
    }

    private getScreenPosition(x: number, y: number): Array<number> | null {
        const [xp, yp] = this._position;
        const [wd, hd] = this.getViewPortDimensions(this._display);

        if(x < xp) return null;
        if(y < yp) return null;
        if(y > yp + hd) return null
        if(x > xp + wd) return null
        return [x - xp, y - yp];
    }
}