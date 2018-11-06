import World from '../Objects/World'



export const WorldNameConstants = {
    'DEFAULT': 'DEFAULT'
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
        this._worlds.set(WorldNameConstants.DEFAULT, new World(20,15))
    }

}






const wm = new WorldManager();
export default wm;
