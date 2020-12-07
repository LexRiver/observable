import {TypeEvent} from '@lexriver/type-event'
import { Observable } from './Observable'
//import { Observable } from './Observable.ts.old'


type ActionOnChange<T> = (newValue:T, prevValue?:T)=>void
export class ObservableVariable<T> implements Observable{
    public eventOnChange = new TypeEvent<ActionOnChange<T>>()

    constructor(
        protected value:T, 
        //public validateFunction?:(value:T)=>boolean
    ) {
        
    } 
    public set(value:T){
        // if(this.validateFunction){
        //     if(this.validateFunction(value) == false){
        //         const errorMessage = 'Observable: set failed: validateFunction() returns false'
        //         this.eventOnError.triggerAsync(errorMessage, 'value=', value)
        //         throw new Error(errorMessage)
        //     }
        // }
        const prevValue = this.value
        this.value = value
        this.eventOnChange.triggerAsync(this.value, prevValue)
    }


    public setByPrevious(setter:(oldValue:T)=>T){
        const prevValue = this.value
        const newValue = setter(this.value)
        // if(this.validateFunction && this.validateFunction(newValue) == false){
        //     const errorMessage = 'Observable: setByPrevious failed: validateFunction() returns false'
        //     this.eventOnError.triggerAsync(errorMessage, 'newValue=', newValue)
        //     throw new Error(errorMessage)
        // }
        this.value = newValue
        // if(this.keepHistory){
        //     this.history.push({datetime:new Date(), value:newValue, comment})
        // }
        this.eventOnChange.triggerAsync(this.value, prevValue)
    }

    public get(){
        return this.value
    }

    // public onChange(action:ActionOnChange<T>){
    //     this.eventOnChange.subscribe(action)
    // }

    // public unsubscribeFromChange(action:ActionOnChange<T>){
    //     return this.eventOnChange.unsubscribe(action)
    // }
    
    // public triggerOnChangeEvent(){
    //     this.eventOnChange.triggerAsync(this.value)
    // }

    
}