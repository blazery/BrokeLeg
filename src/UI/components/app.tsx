import * as React from "react";
import * as Rot from 'rot-js';
import MapViewer from './MapViewer';
import WM, { WorldNameConstants } from '../../Core/Managers/worldManager'
import CM from '../../Core/Managers/controlManager';
import VM, { ViewNames } from '../../Core/Managers/viewManager';

import View from '../../Core/Objects/view';
import Player from "../../Core/Objects/player";
import InterFacePanel from "./rightInterface";

export interface AppState{
    display: Rot.Display;
}

export interface AppProps {

}

export class App extends React.Component<AppProps, AppState> {
    constructor(props: Object, ...rest: Array<any>){
        super(props, ...rest);

        CM.init();
        VM.init();
        WM.createCaveWorld();
        WM.getWorld(WorldNameConstants.CAVE).spawnPlayer(Player);
        VM.getView(ViewNames.MAIN).render();
    }

    render() {
        return (
        <div className={'app-container'} >
                <MapViewer/>
                <InterFacePanel/>
        </div>
        );
    }
}