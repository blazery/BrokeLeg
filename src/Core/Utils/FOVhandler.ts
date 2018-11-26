import World from "../Objects/world";
import * as ROT from 'rot-js';
import Player from '../Objects/player';

let currentFOV: Array<Array<number>> =[]
let previousFOV: Array<Array<number>> = [];

// doesn't need world , can use players current world.
export const  computePlayerFov = (world: World ) =>{
    /* input callback */
    const _checkLightPassibility = (x: number, y: number) => {
        const tile = world.getTileAt(x, y);
        if (tile) {
           return !tile.hasWall
        }
        return false;
    }

    const fov = new ROT.FOV.PreciseShadowcasting(_checkLightPassibility);
    const [px, py] = Player.position;
    const result = [] as Array<Array<number>>;
    fov.compute(px, py, 10, (x, y, r, visibility) => {
       if(visibility > 0) result.push([x,y]);
    });
    
    setFOV(result);
    return result;
}

function setFOV(v: Array<Array<number>>){
    previousFOV = currentFOV;
    currentFOV = v;
}

export const getCurrentFov = () => {
    return currentFOV;
}

export const getPreviousFov = () => {
    return previousFOV;
}

export default {
    computePlayerFov,
    getCurrentFov,
    getPreviousFov
}