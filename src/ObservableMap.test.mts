import { expect, test } from 'vitest'
import { ObservableMap } from "./ObservableMap.mjs"

test('map', () => {
    let myMapO = new ObservableMap<string, number>()
    let counter = 0
    myMapO.eventOnChange.subscribe((k,v) => {
        console.log('k=', k, 'v=', v)
        counter++
    })
    myMapO.set('one', 1)
    expect(myMapO.get('one')).toEqual(1)
    expect(counter).toEqual(1)
})

test('ctor', () => {
    let myMapO = new ObservableMap<string, number>([['first', 1], ['second', 2]])
    expect(myMapO.get('second')).toEqual(2)
})

test('entries', () => {
    let myMapO = new ObservableMap<string, number>([['first', 1], ['second', 2]])
    let counter = 0
    for(let [k,v] of myMapO.entries()){
        counter += v
    }
    expect(counter).toEqual(3)
})

test('forEach', () => {
    let myMapO = new ObservableMap<string, number>([['first', 1], ['second', 2]])
    let counter = 0
    myMapO.forEach((value, key) => {
        counter += value
    })
    expect(counter).toEqual(3)
})