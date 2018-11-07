import * as React from "react";

export interface PlayerStatusState {

}

export interface PlayerStatusProps {

}


export default class PlayerStatus extends React.Component<PlayerStatusProps, PlayerStatusState> {

    render() {
        return (
            <div className={'playerStatus'} >
                <div>
                    <span>HEALTH: </span>
                </div>
            </div>
        )
    }
}