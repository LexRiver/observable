//import {equal} from 'assert'
import { ObservableValue } from "./ObservableValue"

test('ObservableValue', () => {
    let counter = 0
    const x = new ObservableValue<number>(100)
    x.eventOnChange.subscribe((newValue, prevValue) => {
        if(prevValue){
            counter = prevValue+newValue
        }
    })
    x.set(1)
    expect(x.get()).toBe(1)
    expect(counter).toEqual(100+1)
})

