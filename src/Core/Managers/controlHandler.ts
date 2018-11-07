import Player from '../Objects/player';
import {ActionName as MoveActionName, Directions as DIRS} from '../Actions/move';


export default class ControlHandler{
    public handle(e: KeyboardEvent){
        switch (e.code) {
            case 'Numpad1' :
                Player.doAction(MoveActionName, { dir: DIRS.SW })
                break;
            case 'Numpad2':
                Player.doAction(MoveActionName, { dir: DIRS.S })
                break;
            case 'Numpad3':
                Player.doAction(MoveActionName, { dir: DIRS.SE })
                break;
            case 'Numpad4':
                Player.doAction(MoveActionName, { dir: DIRS.W })
                break;
            case 'Numpad6':
                Player.doAction(MoveActionName, { dir: DIRS.E })
                break;
            case 'Numpad7':
                Player.doAction(MoveActionName, { dir: DIRS.NW })
                break;
            case 'Numpad8':
                Player.doAction(MoveActionName, { dir: DIRS.N })
                break;
            case 'Numpad9':
                Player.doAction(MoveActionName, { dir: DIRS.NE })
                break;
            default:
                break;
        }

    }
}