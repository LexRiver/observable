import { expect, test } from 'vitest'
import { ObservableVariable } from "./ObservableVariable.mjs"

test('ObservableVariable', () => {
    let counter = 0
    const x = new ObservableVariable<number>(100)
    x.eventOnChange.subscribe((newValue, prevValue) => {
        if(prevValue){
            counter = prevValue+newValue
        }
    })
    x.set(1)
    expect(x.get()).toBe(1)
    expect(counter).toEqual(100+1)
})

