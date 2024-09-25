import { expect, test } from 'vitest'
import { ObservableArray } from "./ObservableArray.mjs"

test('ObservableArray', async () => {
    const x = new ObservableArray<number>([])
    x.eventOnChange.subscribe((changedItem?:number) => {
        console.log('changed item = ', changedItem)
    })
    x.push(100)
    expect(x.getByIndex(0)).toEqual(100)

    // setTimeout(() => {
    //     console.log('test')
    // }, 1000)

})

test('ObservableArray set', async () => {
    let countOfChanges = 0
    const x = new ObservableArray<number>([1,2,3])
    x.eventOnChange.subscribe(() => {
        countOfChanges++
        console.log('ObservableArray set: change', countOfChanges, x.getInternalArray())
    })
    x.set([2,3,4])
    console.log('ObservableArray set', x.getInternalArray())
    expect(x.getInternalArray()).toEqual([2,3,4])
    expect(countOfChanges).toEqual(1)

    x.push(5)
    expect(x.getInternalArray()).toEqual([2,3,4,5])
    expect(countOfChanges).toEqual(2)

    let result = x.getInternalArray()
    result.push(6)
    expect(x.getInternalArray()).toEqual([2,3,4,5,6])
    expect(countOfChanges).toEqual(2) // event is not triggered

})

test('ObservableArray getting by index brackets', async() => {
    let countOfChanges = 0
    const x = new ObservableArray<number>([])
    x.eventOnChange.subscribe((changedItem?) => {
        console.log('(2) item changed:', changedItem)
        countOfChanges++
    })
    x.push(100)
    expect(x[0]).toEqual(100)
    x[1] = 200
    expect(x[1]).toEqual(200)
    expect(x.getByIndex(1)).toEqual(200)
    expect(countOfChanges).toEqual(2)
    x[1] = 300
    expect(countOfChanges).toEqual(3)

})


