import View from '../Objects/view';
import { Display } from '../../../node_modules/@types/rot-js';
import {WorldNameConstants} from './worldManager';

export enum ViewNames {
    MAIN,
    SIDE,
}

export class ViewManager {
    private _views = new Map<ViewNames, View>()

    public init(display: Display){
        this._views.set(ViewNames.MAIN, new View({ width: 25, height: 25, worldName: WorldNameConstants.CAVE, display: display}));
    }

    public renderView(viewName: ViewNames, display? :Display){
        const view = this._views.get(viewName);
        if(view){
            view.render(display);
        }else{
            console.warn('no view found.')
        }
    }

    public getView(viewName: ViewNames): View | null {
        const view = this._views.get(viewName);
        if (view) {
            return view;
        } 

        console.warn('no view found.')
        return null;
    }

}

const vm = new ViewManager();
export default vm;
    