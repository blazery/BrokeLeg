import World from './world'
import WM from '../Managers/worldManager'
import { Display } from '../../../node_modules/@types/rot-js';
import { WorldNameConstants} from '../Managers/worldManager';
import {computePlayerFov, getCurrentFov, getPreviousFov} from '../Utils/FOVhandler';
import Player from './player';


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
    private _centerDeadZone: Array<number> = [5,3];
    protected _display: Display;


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


        // render explored map.
        const exploMap = world.explorationMap;
        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                const [wx, wy] = this.getWorldPosition(x,y);
                const includes = exploMap.get(`${wx},${wy}`)
                if(includes){
                    const tile = world.getTileAt(wx, wy);
                    if(tile){
                        const { ch, fg, bg } = tile.render();
                        displayToUse.draw(x, y, ch, fg, bg)
                    }
                }
            }
        }

        // render visible map.
        this.updateFov(display);
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

    public updateFov(display?: Display){
        const world = WM.getWorld(this._lookAtWorldName);
        const displayToUse = display || this._display;
        const fov = computePlayerFov(world);
        world.addToExplorationMap(fov);
        for (const [x, y] of fov) {
            const tile = world.getTileAt(x, y)
            const screenPos = this.getScreenPosition(x, y);
            if (tile) {
                if (screenPos) {
                    const [spx, spy] = screenPos;
                    const { ch, fg, bg } = tile.render();
                    displayToUse.draw(spx, spy, ch, fg, bg)
                }
            } else {
                // render empty space
                displayToUse.draw(x, y, '#', '#adaeb2', '#2c2e33')
            }
        }
    }

    public updateWorldPositions(positions: Array<Array<number>>){     
        const world = WM.getWorld(this._lookAtWorldName);     

        // update specified Tiles;
        for(const pos of positions){
            const [wx, wy] = pos;
            const screenPos = this.getScreenPosition(wx, wy);
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

    public get currentDisplay(){
        return this._display;
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