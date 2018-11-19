import World from '../Objects/world'
import * as Rot from 'rot-js';

export const WorldNameConstants = {
    'DEFAULT': 'DEFAULT',
    'CAVE': 'CAVE'
}

export class WorldManager {
    private _worlds : Map<string, World>;

    constructor() {
        this._worlds = new Map<string, World>();
        this.createDefaultWorld();
    }


    public getWorld(name: string): World{
        return this._worlds.get(name) as World;
    };

    private createDefaultWorld(): void {
        this._worlds.set(WorldNameConstants.DEFAULT, new World(20,15, WorldNameConstants.DEFAULT))
    }

    public createCaveWorld(): void{
        const w = 165, h = 52, s = 4;
        const map = new Rot.Map.Cellular(w, h);
        const floorPlan: Array<Array<number>> = [];
        for(let i = 0 ; i < w ; i++){
            floorPlan[i] = []
        }

        map.randomize(0.5);
        for (let i = 0; i < s; i++) {
            map.create((x, y, c) => {
                floorPlan[x][y] = c;
            });
        }
      
        map.connect((x, y, c) => {
            floorPlan[x][y] = c;
        }, 1)

        const world = new World(w,h, WorldNameConstants.CAVE)
        world.setFloorPlan(floorPlan);
        this._worlds.set(WorldNameConstants.CAVE, world);
    }
}






const wm = new WorldManager();
export default wm;
    