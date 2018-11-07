import { WorldNameConstants } from "../Managers/worldManager";
import Move, {Directions} from '../Actions/move';
import Action from '../Actions/action';
import VM, { ViewNames } from '../Managers/viewManager';

export interface IPlayerOptions {

}

export class Player {
    private _health: number
    private _legPower: number
    private _hunger: number
    private _currentWorld: string
    private _position: Array<number>
    private _actions: Map<string, Action>


    constructor({}: IPlayerOptions) {
        this._health = 100;
        this._hunger = 0
        this._legPower = 50;
        this._position = [0,0]; 
        this._currentWorld = WorldNameConstants.DEFAULT;

        this._actions = new Map<string, Action>([
            [Move.name, new Move({ dirs: (<any>Object).values(Directions), centerCamera: true})]
        ])
    }

    public render() {
        return { ch: '☻', fg: '#f736ad' }
    }

    public doAction(actionName: string, opt: any){
        const action = this._actions.get(actionName);
        if(action){
            action.doAction(this, opt)
        }else{
            // needs chat interface
            console.log(`You can't ${actionName} yet, maybe in some later version`)
        }
    }

    public setPosition(x: number, y: number, worldName: string){
        this._position = [x,y]
        this._currentWorld = worldName;

        if(this._health){
            const view = VM.getView(ViewNames.MAIN)
            view && view.center(x,y);
        }
    }
    public get position() {
        return this._position;
    }
    
    public get currentWorld() {
        return this._currentWorld;
    }

    public useEnergy(n: number){
        this._legPower -= n;
    }
}

const ply = new Player({});
export default ply;