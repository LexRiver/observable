import { createObservable, checkIfObservable } from "./Functions"

test('Functions', () => {
    let obsString = createObservable('string')
    obsString.eventOnChange.subscribe((x) => console.log('obsString change', x))
    obsString.set('another string')
    obsString.set('11')
    expect(obsString.get()).toEqual('11')
    expect(checkIfObservable(obsString)).toBeTruthy()
    
    let array:number[] = []
    let obsArray = createObservable(array)
    obsArray.eventOnChange.subscribe((x) => console.log('obsArray change', x))
    obsArray.push(0)
    obsArray.push(2)
    obsArray[1] = 3
    expect(obsArray[1]).toEqual(3)
    expect(checkIfObservable(obsArray)).toBeTruthy()

    let map = new Map<string, number>()
    let obsMap = createObservable(map)
    obsMap.eventOnChange.subscribe((k,v) => console.log('obsMap change', k, v))
    obsMap.set('one', 100)
    obsMap.set('two', 200)
    expect(obsMap.get('one')).toEqual(100)
    expect(obsMap.get('three')).toEqual(undefined)
    expect(checkIfObservable(obsMap)).toBeTruthy()

})