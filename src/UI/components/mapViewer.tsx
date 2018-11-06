import * as React from "react";

export interface MapViewerState {

}

export interface MapViewerProps {
    displayCanvas: HTMLCanvasElement;
}


export default class MapViewer extends React.Component<MapViewerProps, MapViewerState> {


    componentDidMount() {
        const element = document.getElementById('uniquePlaceHolderKey');
        if (element && element.parentNode){
            element.parentNode.replaceChild(this.props.displayCanvas, element);
        }
    }


    render(){        
        return (
        <div className={'map-container'} >
                <div id="uniquePlaceHolderKey" ></div>
        </div>
        )
    }
}