import Property from "./property";
import { propertyAlreadyDefined } from '../../Errors/error';


export interface IPropertyContainerOptions{
    props?: Array<Property> 
}

export default class PropertyContainer{
    private _properties: Array<Property>;
    private _propertyCache?: object;
    private _cacheNeedsUpdate: boolean = false;

    constructor(props?: Array<Property>){
        this._properties = props || [];
        this.buildPropertyObejct();
    }

    private buildPropertyObejct() {
        const newProps: any = {};
        for(const p of this._properties){
            const entries = (<any>Object).entries(p)
            entries.forEach( ([k, v]: Array<any>) => {
                if(!newProps[k]){
                    newProps[k] = v;
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
}