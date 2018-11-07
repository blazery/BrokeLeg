import * as React from "react";
import * as Rot from 'rot-js';
import MapViewer from './MapViewer';
import WM, { WorldNameConstants } from '../../Core/Managers/worldManager'
import CM from '../../Core/Managers/controlManager';
import VM, { ViewNames } from '../../Core/Managers/viewManager';

import View from '../../Core/Objects/view';
import Player from "../../Core/Objects/player";

export interface AppState{
    display: Rot.Display;
}

export interface AppProps {

}

export class App extends React.Component<AppProps, AppState> {
    public readonly state: AppState = {
        display: new Rot.Display({width: 165, height: 52, layout: 'rect' })
    }

    constructor(props: Object, ...rest: Array<any>){
        super(props, ...rest);

        WM.createCaveWorld(this.state.display);
        WM.getWorld(WorldNameConstants.CAVE).spawnPlayer(Player);
        CM.init();
        VM.init(this.state.display);
        VM.renderView(ViewNames.MAIN, this.state.display);
    }


    render() {
        return (
        <React.Fragment>
                <MapViewer displayCanvas={this.state.display.getContainer()}/>
        </React.Fragment>
        );
    }
}