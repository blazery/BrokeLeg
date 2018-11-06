import * as React from "react";
import * as Rot from 'rot-js';
import MapViewer from './MapViewer';
import View from '../../Core/Objects/view';

export interface AppState{
    display: any;
}

export interface AppProps {

}

export class App extends React.Component<AppProps, AppState> {
    public readonly state: AppState = {
        display: new Rot.Display({width: 165, height: 52, layout: 'rect' })
    }

    constructor(props: Object, ...rest: Array<any>){
        super(props, ...rest);

        const view = new View({width: 25, height: 25});
        view.render(this.state.display);
    }


    render() {
        return (
        <React.Fragment>
                <MapViewer displayCanvas={this.state.display.getContainer()}/>
        </React.Fragment>
        );
    }
}