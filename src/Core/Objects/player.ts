import { WorldNameConstants } from "../Managers/worldManager";
import Move, {Directions} from '../Actions/move';
import Action from '../Actions/action';
import VM, { ViewNames } from '../Managers/viewManager';
import Entity, { IEntityOptions, IEntiryRenderInfo } from "./entity";

export interface IPlayerOptions extends IEntityOptions {

}

export class Player extends Entity {
    private _health: number
    private _legPower: number
    private _hunger: number
    private _actions: Map<string, Action>


    constructor(options: IPlayerOptions) {
        super(options);
        this._health = 10;
        this._hunger = 0
        this._legPower = 50;

        this._actions = new Map<string, Action>([
            [Move.name, new Move({ dirs: (<any>Object).values(Directions), centerCamera: true})]
        ])
    }

    public render(): IEntiryRenderInfo{
        return { ch: '☻', fg: '#f736ad', prio: 3}
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
        super.setPosition(x, y, worldName);

        const view = VM.getView(ViewNames.MAIN)
        if(view){
            view.center(x, y);
            view.updateFov();
        }
        
    }
    public get position() {
        return this._position;
    }
    
    public get currentWorld() {
        return this._currentWorld;
    }

    public get health(){
        return this._health;
    }

    public get legPower() {
        return this._legPower;
    }

    public reduceHP(n: number){
        const newValue = this._health - n;
        if (newValue < 0) {
            this._health = 0
        } else {
            this._health = newValue
            VM.getView(ViewNames.SIDE).render();
        }
    }

    public useEnergy(n: number){
        const newValue = this._legPower - n;
        if(newValue < 0){
            this._legPower = 0
            this.reduceHP(1);
            console.log('you are too tired to move, but push yourself to do it anyway.')
        }else{
            this._legPower = newValue
            VM.getView(ViewNames.SIDE).render();
        }
    }

    public canUseEnergy(n: number): boolean{
        if(this._legPower - n > 0){
            return true
        } else{
            return false;
        }
    }
}

const ply = new Player({});
export default ply;