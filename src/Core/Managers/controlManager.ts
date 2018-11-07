import ControlHandler from "./controlHandler";

export enum HandlerNames{
    PLAYER_HANDLER,
    INVENTORY_HANDLER,
    TEXT_HANDLER,
}


export class ControlManager {
    private _activeControlHandler: ControlHandler | undefined;
    private _controlHandlers: Map<HandlerNames, ControlHandler> = new Map<HandlerNames, ControlHandler>();


    public init(handler? : ControlHandler){
        window.addEventListener('keydown', this.onKeyDown, true);
        this._controlHandlers.set(HandlerNames.PLAYER_HANDLER, new ControlHandler());
        this.setActiveHandler(HandlerNames.PLAYER_HANDLER);
    }

    public setActiveHandler(h : HandlerNames){
        const hdl = this._controlHandlers.get(h);
        if(!hdl) throw 'No handler found';
        this._activeControlHandler = hdl
    }

    private onKeyDown = (e: KeyboardEvent) => {
        if(this._activeControlHandler){
            this._activeControlHandler.handle(e);
        }
    }


}






const cm = new ControlManager();
export default cm;
