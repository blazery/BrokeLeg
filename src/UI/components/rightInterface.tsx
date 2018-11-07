import * as React from "react";
import PlayerStatus from "./playerStatus";

export interface InterFacePanelState {

}

export interface InterFacePanelProps {

}


export default class InterFacePanel extends React.Component<InterFacePanelProps, InterFacePanelState> {

    render() {
        return (
            <div className={'interface-panel'} >
                <PlayerStatus/>
            </div>
        )
    }
}