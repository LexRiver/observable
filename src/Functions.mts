import { Observable } from './Observable.mjs'
import { ObservableArray } from './ObservableArray.mjs'
import { ObservableMap } from './ObservableMap.mjs'
import { ObservableVariable } from './ObservableVariable.mjs'

// export function createObservable<T extends Map<K,V>|Array<V>|string|number|boolean, K, V>(initialValue:T):
//     T extends Map<K, V> ?
//     ObservableMap<K, V> :
//     T extends Array<V> ?
//     ObservableArray<V> :
//     ObservableValue<T>
// {

//     if(Data.isArray(initialValue)){
//         return new ObservableArray<V>(initialValue as Array<V>) as any

//     } else if(initialValue instanceof Map){
//         return new ObservableMap<K,V>(initialValue) as any

//     } else return new ObservableValue<T>(initialValue) as any
// }



export function createObservable(x:string):ObservableVariable<string>;
export function createObservable(x:number):ObservableVariable<number>;
export function createObservable(x:boolean):ObservableVariable<boolean>;
export function createObservable<T extends Array<V>, V>(x:Array<V>):ObservableArray<V>;
export function createObservable<T extends Map<K,V>, K, V>(x:Map<K,V>):ObservableMap<K,V>;
export function createObservable<T extends string | number | boolean | Array<V> | Map<K,V>, K, V>(x:T){
    if(typeof x === 'string'){
        return new ObservableVariable<string>(x)
    }
    if(typeof x === 'number'){
        return new ObservableVariable<number>(x)
    }
    if(typeof x === 'boolean'){
        return new ObservableVariable<boolean>(x)
    }
    if(Array.isArray(x)){
        return new ObservableArray<V>(x)
    }
    if(x instanceof Map){
        return new ObservableMap<K,V>(x)
    }
    console.error('argument=', x, typeof x)
    throw new Error('unable to create Observable from this argument type')
}

export function checkIfObservable(o:any): o is Observable{
    return o instanceof ObservableVariable || o instanceof ObservableArray || o instanceof ObservableMap
}
