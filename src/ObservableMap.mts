import { TypeEvent } from "@lexriver/type-event"
import { Observable } from "./Observable.mjs"
import { SerializedEventDispatcher } from "./SerializedEventDispatcher.mjs"
//import { Observable } from "./Observable.ts.old"

export class ObservableMap<K,V> implements Observable{
    public eventOnChange:TypeEvent<(key?:K, value?:V)=>void> = new TypeEvent()
    public eventOnChangeKey:TypeEvent<(key:K, value:V)=>void> = new TypeEvent()
    public eventOnDeleteKey:TypeEvent<(key:K)=>void> = new TypeEvent()
    public eventOnClear:TypeEvent<() => void> = new TypeEvent()
    protected eventDispatcher = new SerializedEventDispatcher()
    public eventOnError = this.eventDispatcher.eventOnError
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
        this.eventDispatcher.dispatch(this.eventOnChangeKey, key, value)
        this.eventDispatcher.dispatch(this.eventOnChange, key, value)
    }

    public get(key:K):V|undefined{
        return this.internalMap.get(key)
    }

    public toArray(){
        return Array.from(this.internalMap.entries())
    }

    public initFromArray(mapEntries:Iterable<readonly [K, V]>){
        this.internalMap = new Map<K, V>(mapEntries)
        this.eventDispatcher.dispatch(this.eventOnChange)
    }

    public delete(key:K){
        const result = this.internalMap.delete(key)
        if(result) {
            this.eventDispatcher.dispatch(this.eventOnDeleteKey, key)
            this.eventDispatcher.dispatch(this.eventOnChange, key)
        }
        return result
    }

    public clear(){
        this.internalMap.clear()
        this.eventDispatcher.dispatch(this.eventOnClear)
        this.eventDispatcher.dispatch(this.eventOnChange)
    }

    public waitForEvents(){
        return this.eventDispatcher.waitForEvents()
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