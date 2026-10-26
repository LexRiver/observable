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
    await x.waitForEvents()
    console.log('ObservableArray set', x.getInternalArray())
    expect(x.getInternalArray()).toEqual([2,3,4])
    expect(countOfChanges).toEqual(1)

    x.push(5)
    await x.waitForEvents()
    expect(x.getInternalArray()).toEqual([2,3,4,5])
    expect(countOfChanges).toEqual(2)

    let result = x.getInternalArray()
    result.push(6)
    expect(x.getInternalArray()).toEqual([2,3,4,5,6])
    expect(countOfChanges).toEqual(2) // event is not triggered

})

test('ObservableArray splice with only start removes through the end', async () => {
    const x = new ObservableArray([1, 2, 3, 4])
    let changes = 0
    x.eventOnChange.subscribe(() => {
        changes++
    })

    expect(x.splice(2)).toEqual([3, 4])
    await x.waitForEvents()

    expect(x.toArray()).toEqual([1, 2])
    expect(changes).toBe(1)
})

test('ObservableArray iteration supports symbols and independent iterators', () => {
    const x = new ObservableArray([1, 2, 3])
    const first = x[Symbol.iterator]()
    const second = x[Symbol.iterator]()

    expect(first.next()).toEqual({value: 1, done: false})
    expect(first.next()).toEqual({value: 2, done: false})
    expect(second.next()).toEqual({value: 1, done: false})
    expect([...x]).toEqual([1, 2, 3])
    expect([...x]).toEqual([1, 2, 3])
})

test('ObservableArray next advances', () => {
    const x = new ObservableArray([1, 2])

    expect(x.next()).toEqual({value: 1, done: false})
    expect(x.next()).toEqual({value: 2, done: false})
    expect(x.next()).toEqual({value: null, done: true})
})

test('ObservableArray getting by index brackets', async() => {
    let countOfChanges = 0
    const x = new ObservableArray<number>([])
    x.eventOnChange.subscribe((changedItem?) => {
        console.log('(2) item changed:', changedItem)
        countOfChanges++
    })
    x.push(100)
    await x.waitForEvents()
    expect(x[0]).toEqual(100)
    x[1] = 200
    await x.waitForEvents()
    expect(x[1]).toEqual(200)
    expect(x.getByIndex(1)).toEqual(200)
    expect(countOfChanges).toEqual(2)
    x[1] = 300
    await x.waitForEvents()
    expect(countOfChanges).toEqual(3)

})


