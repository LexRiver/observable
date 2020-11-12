import { TypeEvent } from "@lexriver/type-event";
import { Observable } from "./Observable";
export declare class ObservableMap<K, V> implements Observable {
    eventOnChange: TypeEvent<(key: K, value: V) => void>;
    eventOnDelete: TypeEvent<(key: K) => void>;
    eventOnClear: TypeEvent<() => void>;
    protected internalMap: Map<K, V>;
    constructor(mapEntries?: Iterable<readonly [K, V]>);
    /**
     * The entries() method returns a new Iterator object that contains the [key, value] pairs for each element in the Map object in insertion order.
     */
    entries(): IterableIterator<[K, V]>;
    /**
     * The has() method returns a boolean indicating whether an element with the specified key exists or not.
     */
    has(key: K): boolean;
    /**
     * The forEach() method executes a provided function once per each key/value pair in the Map object, in insertion order.
     * @param callbackfn
     * @param thisArg
     */
    forEach(callbackfn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any): void;
    set(key: K, value: V): void;
    get(key: K): V | undefined;
    toArray(): [K, V][];
    initFromArray(mapEntries: Iterable<readonly [K, V]>): void;
    delete(key: K): boolean;
    clear(): void;
    /**
     * The keys() method returns a new Iterator object that contains the keys for each element in the Map object in insertion order.
     */
    keys(): IterableIterator<K>;
    /**
     * The values() method returns a new Iterator object that contains the values for each element in the Map object in insertion order.
     */
    values(): IterableIterator<V>;
    isEmpty(): boolean;
    get size(): number;
}
