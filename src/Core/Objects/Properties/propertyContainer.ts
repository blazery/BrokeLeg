import Property from "./property";
import { propertyAlreadyDefined } from '../../Errors/error';
import { ITrigger } from "../entity";


export interface IPropertyContainerOptions{
    props?: Array<Property> 
}

export default class PropertyContainer{
    private _triggers: Map<string, Array<Function>> = new Map<string, Array<Function>>();
    private _properties: Array<Property>;
    private _propertyCache?: object;
    private _cacheNeedsUpdate: boolean = false;

    constructor(props?: Array<Property>){
        this._properties = props || [];
        this.buildPropertyObejct();
    }

    public addProperty(p: Property){
        this._properties.push(p);
        this._cacheNeedsUpdate = true;
    }

    private buildPropertyObejct() {
        const newProps: any = {};
        for(const p of this._properties){
            const entries = (<any>Object).entries(p)
            entries.forEach( ([k, v]: Array<any>) => {
                if (!newProps[k]){
                    if (k !== '_values') newProps[k] = v;
                } else {
                    throw propertyAlreadyDefined;
                }
            });
        }
        this._propertyCache = newProps;
        this._cacheNeedsUpdate = false;
    }

    public get props() {
        if (this._cacheNeedsUpdate === true){
            this.buildPropertyObejct();
        }
        return this._propertyCache;
    }

    public bindTrigger(info: ITrigger) {
        const {func, triggers} = info;

        for ( const t of triggers){
            const list = this._triggers.get(t);
            if(list){
                const notContains = list.indexOf(func) === -1;
                notContains && list.push(func);
            } else{
                this._triggers.set(t, [func]);
            }
        }
    }

    public trigger(trigger: string) {
        const list = this._triggers.get(trigger);
        list && list.forEach((f) => { f && f()})
    }
}