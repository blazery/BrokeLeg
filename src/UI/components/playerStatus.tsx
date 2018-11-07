import * as React from "react";
import VM, {ViewNames} from '../../Core/Managers/viewManager';

export interface PlayerStatusState {

}

export interface PlayerStatusProps {

}


export default class PlayerStatus extends React.Component<PlayerStatusProps, PlayerStatusState> {


    componentDidMount() {
        const element = document.getElementById('playerStatusPlaceHolder');
        const view = VM.getView(ViewNames.SIDE);
        if (element && element.parentNode) {
            element.parentNode.replaceChild(view.currentDisplay.getContainer(), element);
            view.render();
        }
    }

    render() {
        return (
            <div className={'playerStatus'} >
                <div id="playerStatusPlaceHolder" ></div>
            </div>
        )
    }
}