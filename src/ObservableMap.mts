import { TypeEvent } from "@lexriver/type-event"
import { Observable } from "./Observable.mjs"
//import { Observable } from "./Observable.ts.old"

export class ObservableMap<K,V> implements Observable{
    public eventOnChange:TypeEvent<(key?:K, value?:V)=>void> = new TypeEvent()
    public eventOnChangeKey:TypeEvent<(key:K, value:V)=>void> = new TypeEvent()
    public eventOnDeleteKey:TypeEvent<(key:K)=>void> = new TypeEvent()
    public eventOnClear:TypeEvent<() => void> = new TypeEvent()
    protected internalMap = new Map<K, V>()


    constructor(mapEntries?:Iterable<readonly [K, V]>){
        if(mapEntries){
            this.internalMap = new Map<K, V>(mapEntries)
        }
    }

    /**
     * The entries() method returns a new Iterator object that contains the [key, value] pairs for each element in the Map object in insertion order.
     */
    public entries(){
        return this.internalMap.entries()
    }

    /**
     * The has() method returns a boolean indicating whether an element with the specified key exists or not.
     */
    public has(key:K){
        return this.internalMap.has(key)
    }



    /**
     * The forEach() method executes a provided function once per each key/value pair in the Map object, in insertion order.
     * @param callbackfn 
     * @param thisArg 
     */
    public forEach(callbackfn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any): void{
        return this.internalMap.forEach(callbackfn, thisArg)
    }

    public set(key:K, value:V){
        this.internalMap.set(key, value)
        this.eventOnChangeKey.triggerAsync(key, value)
        this.eventOnChange.triggerAsync(key, value)
    }

    public get(key:K):V|undefined{
        return this.internalMap.get(key)
    }

    public toArray(){
        return Array.from(this.internalMap.entries())
    }

    public initFromArray(mapEntries:Iterable<readonly [K, V]>){
        this.internalMap = new Map<K, V>(mapEntries)
        this.eventOnChange.triggerAsync()
    }

    public delete(key:K){
        const result = this.internalMap.delete(key)
        if(result) {
            this.eventOnDeleteKey.triggerAsync(key)
            this.eventOnChange.triggerAsync(key)
        }
        return result
    }

    public clear(){
        this.internalMap.clear()
        this.eventOnClear.triggerAsync()
        this.eventOnChange.triggerAsync()
    }

    /**
     * The keys() method returns a new Iterator object that contains the keys for each element in the Map object in insertion order.
     */
    public keys(){
        return this.internalMap.keys()
    }

    /**
     * The values() method returns a new Iterator object that contains the values for each element in the Map object in insertion order.
     */
    public values(){
        return this.internalMap.values()
    }

    public isEmpty(){
        return this.internalMap.size == 0
    }

    public get size(){
        return this.internalMap.size
    }
}