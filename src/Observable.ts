import { TypeEvent } from "@lexriver/type-event"

//export type ActionOnChange<T> = (newValue:T, prevValue?:T)=>void
// export abstract class Observable{

//     public abstract eventOnChange:TypeEvent<(...args:any)=>void>

//     public static checkIfObservable(o:any){
//         return o instanceof Observable
//     }


// }

export interface Observable{
    eventOnChange:TypeEvent<(...args:any)=>void>
}