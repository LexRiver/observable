import { beforeEach, expect, test, vi } from 'vitest'
import { ObservableLocalStorageArray } from './ObservableLocalStorageArray.mjs'
import { ObservableLocalStorageVariable } from './ObservableLocalStorageVariable.mjs'

class MemoryStorage implements Storage {
    private values = new Map<string, string>()

    get length(){
        return this.values.size
    }

    clear(){
        this.values.clear()
    }

    getItem(key:string){
        return this.values.get(key) ?? null
    }

    key(index:number){
        return Array.from(this.values.keys())[index] ?? null
    }

    removeItem(key:string){
        this.values.delete(key)
    }

    setItem(key:string, value:string){
        this.values.set(key, value)
    }
}

class MemoryWindow extends EventTarget {
    public readonly localStorage = new MemoryStorage()
}

beforeEach(() => {
    vi.stubGlobal('window', new MemoryWindow())
})

function dispatchStorageEvent(key:string|null){
    const event = new Event('storage')
    Object.defineProperty(event, 'key', {value: key})
    window.dispatchEvent(event)
}

const localArrayMutators:Array<{
    name:string,
    mutate:(array:ObservableLocalStorageArray<number>)=>void
}> = [
    {name: 'appendArray', mutate: array => { array.appendArray([4]) }},
    {name: 'fill', mutate: array => { array.fill(4, 0, 1) }},
    {name: 'pop', mutate: array => { array.pop() }},
    {name: 'push', mutate: array => { array.push(4) }},
    {name: 'reverse', mutate: array => { array.reverse() }},
    {name: 'shift', mutate: array => { array.shift() }},
    {name: 'sort', mutate: array => { array.sort() }},
    {name: 'splice', mutate: array => { array.splice(1, 1, 4) }},
    {name: 'unshift', mutate: array => { array.unshift(4) }},
    {name: 'setByIndex', mutate: array => { array.setByIndex(1, 4) }},
    {name: 'removeItemByIndex', mutate: array => { array.removeItemByIndex(1) }},
    {name: 'removeFirst', mutate: array => { array.removeFirst(1) }}
]

test.each(localArrayMutators)('$name emits its locally changed array', async ({mutate}) => {
    const array = new ObservableLocalStorageArray<number>({
        localStorageKey: 'items',
        defaultValueIfNotInLocalStorage: [3, 1, 2]
    })
    const changes:number[][] = []
    array.eventOnChange.subscribe(items => {
        changes.push(items)
    })

    mutate(array)
    await array.waitForEvents()

    expect(changes).toEqual([array.toArray()])
    expect(JSON.parse(window.localStorage.getItem('items')!)).toEqual(array.toArray())
})

test('array emits its default after its storage key is removed', async () => {
    window.localStorage.setItem('items', JSON.stringify([1, 2]))
    const array = new ObservableLocalStorageArray<number>({
        localStorageKey: 'items',
        defaultValueIfNotInLocalStorage: [9]
    })
    const changes:number[][] = []
    array.eventOnChange.subscribe(items => {
        changes.push(items)
    })

    window.localStorage.removeItem('items')
    dispatchStorageEvent('items')
    await array.waitForEvents()

    expect(array.toArray()).toEqual([9])
    expect(changes).toEqual([[9]])
})

test('array handles the storage clear event', async () => {
    window.localStorage.setItem('items', JSON.stringify([1, 2]))
    const array = new ObservableLocalStorageArray<number>({
        localStorageKey: 'items',
        defaultValueIfNotInLocalStorage: [9]
    })
    const changes:number[][] = []
    array.eventOnChange.subscribe(items => {
        changes.push(items)
    })

    window.localStorage.clear()
    dispatchStorageEvent(null)
    await array.waitForEvents()

    expect(array.toArray()).toEqual([9])
    expect(changes).toEqual([[9]])
})

test('variable handles the storage clear event', async () => {
    window.localStorage.setItem('setting', JSON.stringify('stored'))
    const variable = new ObservableLocalStorageVariable<string>({
        localStorageKey: 'setting',
        defaultValueIfNotInLocalStorage: 'fallback'
    })
    const changes:Array<[string|undefined, string|undefined]> = []
    variable.eventOnChange.subscribe((value, oldValue) => {
        changes.push([value, oldValue])
    })

    window.localStorage.clear()
    dispatchStorageEvent(null)
    await variable.waitForEvents()

    expect(variable.get()).toBe('fallback')
    expect(changes).toEqual([['fallback', 'stored']])
})
