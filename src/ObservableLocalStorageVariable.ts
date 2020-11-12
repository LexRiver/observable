import { TypeEvent } from "@lexriver/type-event";
import { Observable } from "./Observable";

const filename = '[ObservableLocalStorageVariable]:'

/**
 * 1) set -> saves to localStorage if new
 * 2) localStorage-change events popups -> onChangeEvents triggers
 * 3) onChangeEvents sets current local variable
 */
export class ObservableLocalStorageVariable<T> implements Observable{
    //protected observableVariable:Observable<T|undefined>
    //protected localStorageKey:string
    protected currentValue:T|undefined = undefined

    public eventOnChange:TypeEvent<(newValue?:T, oldValue?:T)=>void> = new TypeEvent<(newValue?:T, oldValue?:T)=>void>()

    constructor(protected p:{
        localStorageKey: string,
        defaultValueIfNotInLocalStorage?:T
    }) {
        
        this.assignCurrentValue()
        this.subscribeToWindowEvent()

    }

    protected subscribeToWindowEvent(){
        // warning: 'storage' event is not firing if changes were made on this page !!!!!!!!
        window.addEventListener('storage', (e) => {
            //console.log('localStorage change event from another window, e=', e)
            // e.key: "productDisplayType"
            // e.newValue: ""tiles""
            // e.oldValue: ""list""
            if(e.key != this.p.localStorageKey) return

            const oldValue = this.currentValue
            this.assignCurrentValue()
            this.eventOnChange.triggerAsync(this.currentValue, oldValue)
        })
    }

    get():T|undefined{
        return this.currentValue
    }

    set(value:T|undefined){
        const valueToPut = JSON.stringify(value)
        const valueInLocalStorageAsString = window.localStorage.getItem(this.p.localStorageKey)
        if(valueToPut !== valueInLocalStorageAsString){
            const prevValue = this.currentValue
            window.localStorage.setItem(this.p.localStorageKey, valueToPut)  // event is not triggered for current window
            this.assignCurrentValue()
            this.eventOnChange.triggerAsync(value, prevValue)
        }
    }

    protected getValueFromLocalStorage(){
        const valueInLocalStorageAsString = window.localStorage.getItem(this.p.localStorageKey)
        if(valueInLocalStorageAsString == null || valueInLocalStorageAsString === "undefined"){
            // we have no value, let's remove this item
            window.localStorage.removeItem(this.p.localStorageKey) 
            return undefined
        }
        return valueInLocalStorageAsString
    }

    protected assignCurrentValue(){
        this.currentValue = this.p.defaultValueIfNotInLocalStorage || undefined
        let stringValue = this.getValueFromLocalStorage()
        if(stringValue){
            try {
                this.currentValue = JSON.parse(stringValue)
            } catch(x){
                console.warn('unable to parse', stringValue)
            }
        }

    }


}