import View from '../Objects/view';
import * as Rot from 'rot-js';
import { Display } from 'rot-js';
import {WorldNameConstants} from './worldManager';
import StatusView from '../Objects/statusView';

export enum ViewNames {
    MAIN,
    SIDE,
}

export class ViewManager {
    private _views = new Map<ViewNames, View>()

    public init(){
        const mainDisplay = new Rot.Display({ width: 100, height: 30, layout: 'rect', fontSize: 24 })
        this._views.set(ViewNames.MAIN, new View({ width: 25, height: 25, worldName: WorldNameConstants.CAVE, display: mainDisplay}));

        const playerStatusDisplay = new Rot.Display({ width: 35, height: 30, layout: 'rect', fontSize: 24, bg: '#bcac84', fg: '#3a362b'})
        this._views.set(ViewNames.SIDE, new StatusView({ width: 25, height: 25, worldName: WorldNameConstants.CAVE, display: playerStatusDisplay }));
    }

    public getView(viewName: ViewNames): View {
        const view = this._views.get(viewName);
        if (view) {
            return view;
        } 
        throw 'no view found.'
    }

}

const vm = new ViewManager();
export default vm;
    