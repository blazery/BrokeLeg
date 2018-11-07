import * as React from "react";
import VM, {ViewNames} from '../../Core/Managers/viewManager'

export interface MapViewerState {

}

export interface MapViewerProps {

}


export default class MapViewer extends React.Component<MapViewerProps, MapViewerState> {


    componentDidMount() {
        const element = document.getElementById('uniquePlaceHolderKey');
        const view = VM.getView(ViewNames.MAIN);
        if (element && element.parentNode){
            element.parentNode.replaceChild(view.currentDisplay.getContainer(), element);
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