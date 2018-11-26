import World from './world'
import WM from '../Managers/worldManager'
import Player from './player';
import { Display } from 'rot-js';
import View, { IViewOptions } from './view'


export interface IStatusViewOptions {
    width: number,
    height: number,
    display: Display
    x?: number,
    y?: number,
    worldName?: string;
}


export default class StatusView extends View {

    constructor(p: IViewOptions) {
        super(p);
    }


    public render(){
        const hp = Player.health
        if(hp){
        const hps = Math.floor(hp);
        let hpString = '';
        for (let i = 0; i < hps; i++) {
            hpString += '*'
        }
        
        const lp = Math.floor(Player.legPower / 5);
        let lpString = '';
        for (let i = 0; i < lp; i++) {
            lpString += '*'
        }

            this._display.clear();
            this._display.drawText(5, 5, `Health:(${hp}) [${hpString}]`)
            this._display.drawText(3, 10, `LegPower:(${Player.legPower}) [${lpString}]`)
        }else{
            this._display.clear();
            this._display.drawText(13, 3, `You Died!`);
        }
    }
}