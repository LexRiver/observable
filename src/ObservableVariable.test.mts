import { expect, test } from 'vitest'
import { ObservableVariable } from "./ObservableVariable.mjs"

test('ObservableVariable', async () => {
    let counter = 0
    const x = new ObservableVariable<number>(100)
    x.eventOnChange.subscribe((newValue, prevValue) => {
        if(prevValue){
            counter = prevValue+newValue
        }
    })
    x.set(1)
    await x.waitForEvents()
    expect(x.get()).toBe(1)
    expect(counter).toEqual(100+1)
})

test('serializes async change handlers', async () => {
    const x = new ObservableVariable(0)
    const order:string[] = []
    let releaseFirst!:()=>void
    const firstCanFinish = new Promise<void>(resolve => {
        releaseFirst = resolve
    })

    x.eventOnChange.subscribe(async value => {
        order.push(`start:${value}`)
        if(value === 1) await firstCanFinish
        order.push(`end:${value}`)
    })

    x.set(1)
    x.set(2)

    expect(order).toEqual(['start:1'])
    releaseFirst()
    await x.waitForEvents()

    expect(order).toEqual(['start:1', 'end:1', 'start:2', 'end:2'])
})

test('reports rejected handlers and continues delivering events', async () => {
    const x = new ObservableVariable(0)
    const delivered:number[] = []
    const errors:unknown[] = []

    x.eventOnChange.subscribe(async value => {
        delivered.push(value)
        if(value === 1) throw new Error('listener failed')
    })
    x.eventOnError.subscribe(error => {
        errors.push(error)
    })

    x.set(1)
    x.set(2)
    await x.waitForEvents()

    expect(delivered).toEqual([1, 2])
    expect(errors).toHaveLength(1)
    expect(errors[0]).toEqual(new Error('listener failed'))
})

