import Action from "./action";
import { Player } from "../Objects/player";
import WM from '../Managers/worldManager';
import VM, { ViewNames } from '../Managers/viewManager';


export const ActionName: string = 'Move';

export const Directions = {
    'N': 'n',
    'NE': 'ne',
    'E': 'e',
    'SE': 'se',
    'S': 's',
    'SW': 'sw',
    'W': 'w',
    NW: 'nw'
}

const DirectionMap = {
    [Directions.N]: [0, -1],
    [Directions.NE]: [1, -1],
    [Directions.E]: [1, 0],
    [Directions.SE]: [1, 1],
    [Directions.S]: [0, 1],
    [Directions.SW]: [-1, 1],
    [Directions.W]: [-1, 0],
    [Directions.NW]: [-1, -1],

}

export default class Move extends Action {
    public name: string = ActionName;
    private _dirs: Array<string>;
    private _energyCost: number;
    private _centerCamera: boolean;

    constructor(opt: any) {
        super();
        this._dirs = [];
        this._energyCost = 1;
        this._centerCamera = false;

        if(opt.dirs){
            this._dirs = opt.dirs as Array<string>;
        }

        if(opt.energyCost){
            this._energyCost = opt.energyCost
        }

        if (opt.centerCamera) {
            this._centerCamera = opt.centerCamera
        }
    }
    
    public doAction(ent: Player, opt: any) {
        if(!opt.dir) throw 'No direction provided'
        const dirValues = DirectionMap[opt.dir];
        if(!dirValues) throw 'Unknown direction provided'
        
        const [ex, ey] = ent.position;
        const [nx, ny] = [ex + dirValues[0], ey + dirValues[1]]
        const world = WM.getWorld(ent.currentWorld);
        const currentPosTile = world.getTileAt(ex, ey);
        const newPosTile = world.getTileAt(nx, ny);

        if(currentPosTile && newPosTile){
            if(!newPosTile.hasWall){
            currentPosTile.removeEntity(ent);
            newPosTile.addEntity(ent);

            const view = VM.getView(ViewNames.MAIN);
            view && view.updateWorldPositions([
                [ex, ey],
                [nx, ny]
            ])

            if (view && this._centerCamera){
                view.center(nx, ny);
            }

            ent.useEnergy(this._energyCost);
        }else{
            console.log('there is a wall there')
        }
        }else{
            throw 'One of the tiles could not be found.'
        }
    }
}