# Observable

This package provides observable data structures: 
* [ObservableValue](#observableValueT)
* [ObservableArray](#observableArrayT)
* [ObservableMap](#observableMapKV)
* [ObservableLocalStorageVariable](#observableLocalStorageVariableT)

## Install

```
npm install @lexriver/observable
```

## Import

``` typescript
import {ObservableValue, ObservableArray, ObservableMap, ObservableLocalStorageVariable} from '@lexriver/observable'
```



## Example of usage

```typescript
const myNumberO = new ObservableValue<number>(100) // 100 is initial value

// subscribe to event on change
myNumberO.eventOnChange.subscribe((newValue, prevValue) => {
    console.log('newValue=', newValue, 'prevValue=', prevValue)
})

console.log('myNumberO=', myNumberO.get()) // 100

myNumberO.set(200)

console.log('myNumberO=', myNumberO.get()) // 200
```

Yes, it's recommended to add suffix capital "O" for convenience and not to compare values directly by mistake
```typescript
myNumberO === 100 // WRONG!
myNumberO.get() === 100 // correct
```

<br/>
<br/>

/# ObservableValue
## `ObservableValue<T>` 

Use this class to create observable value.
Value can be of any type, but the `eventOnChange` will be triggered only on `.set(..)` method. So for array and map use `ObservableArray<T>` and `ObservableMap<K,V>`.

```typescript
const myStringO = new ObservableValue<string>('default text')
```
<br/>

### `eventOnChange:TypeEvent<(newValue:T, prevValue?:T)=>void>`

This event will be triggered every time the value changes.

```typescript
myStringO.eventOnChange.subscribe((newValue, prevValue) => {
    console.log('the value was changed from ', prveValue, 'to', newValue)
})
```

For more details on TypeEvent please visit <https://github.com/LexRiver/type-event>

<br/>

### `set(value:T)`
Set new value.
```typescript
myStringO.set('new value')
```
This method triggers `.eventOnChange` event

<br/>

### `setByPrevious(setter:(oldValue:T)=>T)`
Set new value by previous value.
```typescript
myStringO.set((previous) => previous+'!')
```
This method will also trigger `.eventOnChange`.

<br/>

### `get()`
Get current value. 
```typescript
let result = myStringO.get()
```
<br/>






















<br/>
<br/>
<br/>



# `ObservableArray<T>`

__Example of usage__

```typescript
const myArrayO = new ObservableArray<number>() 

myArrayO.eventOnChange.subscribe(() => console.log('array was changed'))

myArrayO.push(100)
console.log(myArrayO[0]) // 100
myArrayO[0] = 200
console.log(myArrayO[0]) // 200

```

<br/>

### Create observable array

```typescript
// init with empty array
const myArrayO = new ObservableArray<number>() 

// init with exact array
const myAnotherArrayO = new ObservableArray<number>([1,2,3])

```
<br/>

### `eventOnChange:TypeEvent<(changedItem?:T)=>void>`

This event will be triggered every time the array changes.

```typescript
myArrayO.eventOnChange.subscribe((changedItem) => {
    console.log('array was changed')
    if(changedItem){
        console.log('changed item=', changedItem)
    }
})
```

For more details on TypeEvent please visit <https://github.com/LexRiver/type-event>


<br/>

### `length`

Property to get length of the array.

```typescript
myArrayO.length 
```

<br/>

### `getInternalArray():T[]`

Get current internal array.

Warning: modifying the result value will cause original elements to change without triggering the event!

```typescript
myArrayO.set([100,200])
let result = myArrayO.getInternalArray() // [100,200]
result.push(300) // .eventOnChange is not triggered here!
myArrayO.getInternalArray() // [100, 200, 300] !
```

<br/>

### `toArray():T[]` or `getAsArray():T[]`
Get current array as a copy.
```typescript
myArrayO.set([100,200])
let copy = myArrayO.toArray()
copy.push(300)
copy // [100,200,300]
myArrayO.toArray() // [100,200]
```
<br/>



<br/>

### `set(items:T[])`
Replace array with new items
```typescript
myArrayO.set([2,3,4])
```
This method triggers `.eventOnChange`

<br/>

### `setByPrevious(setter:(oldValue:T[])=>T[])`
Replace array with new items using current values
```typescript
myArrayO.setByPrevious((oldArray:number[]) => oldArray.filter(x => x>0))
```
This method triggers `.eventOnChange`

<br/>

### `appendArray(arrayToAppend:T[])`

Append array to current array.
```typescript
myArrayO.set([1,2,3])
myArrayO.appendArray([4,5,6])
myArrayO.get() // [1,2,3,4,5,6]
```
This method triggers `.eventOnChange`

<br/>

### `every(conditionToCheck:(value:T, index?:number, array?:T[])=>boolean)`

The every() method tests whether all elements in the array pass the test implemented by the provided function. It returns a Boolean value.

```typescript
myArrayO.every(x => x>0)
```

<br/>

### `fill(value:T, start?:number, end?:number)`
The fill() method changes all elements in an array to a static value, from a start index (default 0) to an end index (default array.length). It returns the modified array.

```typescript
myArrayO.fill(100, 0, 10) // fill 10 first items with 100 value
```
This method triggers `.eventOnChange`

<br/>

### `filter(action:(value:T, index?:number, array?:T[])=>boolean)`

The filter() method creates a new array with all elements that pass the test implemented by the provided function.

```typescript
myArrayO.filtex(x => x === 0)
```

<br/>

### `find(predicate:(value:T, index?:number, array?:T[])=>boolean)`

The find() method returns the value of the first element in the provided array that satisfies the provided testing function.

```typescript
myArrayO.find(x => x>0)
```

<br/>

### `findIndex(predicate:(value:T, index?:number, array?:T[])=>boolean)`

The findIndex() method returns the index of the first element in the array that satisfies the provided testing function. Otherwise, it returns -1, indicating that no element passed the test. 

```typescript
myArrayO.findIndex(x => x>0)
```

<br/>

### `forEach(action:(value:T, index?:number, array?:T[])=>void, thisArg?:any)`

The forEach() method executes a provided function once for each array element.

```typescript
myArrayO.forEach(x => {
    console.log(x)
})
```

<br/>

### `includes(searchElement:T, fromIndex?:number):boolean`

The includes() method determines whether an array includes a certain value among its entries, returning true or false as appropriate.

```typescript
myArrayO.includes(100) 
```

<br/>

### `indexOf(searchElement:T, fromIndex?:number):number`

The indexOf() method returns the first index at which a given element can be found in the array, or -1 if it is not present.


```typescript
myArrayO.indexOf(100)
```

<br/>

### `join(separator?:string):string`
The join() method creates and returns a new string by concatenating all of the elements in an array, separated by commas or a specified separator string. If the array has only one item, then that item will be returned without using the separator.

```typescript
myArrayO.join(', ')
```

<br/>

### `keys()`
The keys() method returns a new Array Iterator object that contains the keys for each index in the array

```typescript
for(let k of myArrayO.keys()){
    console.log(k)
}
```

<br/>

### `lastIndexOf(searchElement:T, fromIndex?:number):number`
The lastIndexOf() method returns the last index at which a given element can be found in the array, or -1 if it is not present. The array is searched backwards, starting at fromIndex.

```typescript
myArrayO.lastIndexOf(100)
```

<br/>

### `map(action:(value:T, index?:number, array?:T[])=>void, thisArg?:any)`
The map() method creates a new array populated with the results of calling a provided function on every element in the calling array.

```typescript
myArrayO.map(x => x+1)
```

<br/>

### `pop():T`
The pop() method removes the last element from an array and returns that element. This method changes the length of the array.

```typescript
myArrayO.pop()
```

This method triggers `.eventOnChange`

<br/>

### `push(item:T):number`
The push() method adds zero or more elements to the end of an array and returns the new length of the array.

```typescript
myArrayO.push(200)
```

This method triggers `.eventOnChange`

<br/>

### `reduce<R>(action:(accumulator:R, value:T, index?:Number) => R, initValue:R)`
The reduce() method executes a reducer function (that you provide) on each element of the array, resulting in single output value.

```typescript
myArrayO.reduce((result, value) => result += value, 0)
```

<br/>

### `reduceRight<R>(action:(accumulator:R, value:T, index?:Number) => R, initValue:R)`
The reduceRight() method applies a function against an accumulator and each value of the array (from right-to-left) to reduce it to a single value.

```typescript
myArrayO.reduceRight((result, value) => result += value+'--', '--')
```

<br/>

### `reverse()`
The reverse() method reverses an array in place. The first array element becomes the last, and the last array element becomes the first.

```typescript
myArrayO.reverse()
```

This method triggers `.eventOnChange`

<br/>

### `shift(): T | undefined`
Removes the first element from an array and returns it.

```typescript
let first = myArrayO.shift()
```

This method triggers `.eventOnChange`

<br/>

### `slice(start?:number, end?:number):T[]`
Returns a section of an array.

```typescript
myArrayO.slice(2,4)
```

<br/>

### `some(predicate:(value:T, index?:number, array?:T[])=>boolean, thisArg?:any):boolean`
Determines whether the specified callback function returns true for any element of an array.

```typescript
myArrayO.some(x = x>0)
```

<br/>

### `sort(compareFn?:(a:T, b:T)=>number)`
Sorts an array in place.

```typescript
myArrayO.sort()
```

This method triggers `.eventOnChange`

<br/>

### `splice(start: number, deleteCount: number, ...items: T[]): T[]`
Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.

```typescript
myArrayO.splice(0, 1, 1000) // replace first element
```

This method triggers `.eventOnChange`

<br/>

### `toString()`
A string representing the elements of the array.
```typescript
myArrayO.toString()
```
<br/>

### unshift(...items: T[]): number
Inserts new elements at the start of an array.
```typescript
myArrayO.unshift(10, 20)
```
This method triggers `.eventOnChange`
<br/>

### `values()`
Returns an iterable of values in the array
<br/>

### `getByIndex(index:number)`
Get element by index.
```typescript
myArrayO.getByIndex(0)
myArrayO[0] // the same
```
<br/>

### `setByIndex(index:number, value:T)`
Set new value by index.
```typescript
myArrayO.setByIndex(2, 200)
myArrayO[2] = 200 //the same
```
This method triggers `.eventOnChange`
<br/>

### `removeItemByIndex(index:number)`
Delete element by index.
```typescript
myArrayO.removeItemByIndex(2)
```
This method triggers `.eventOnChange`
<br/>



























<br/>
<br/>
<br/>

# `ObservableMap<K,V>`

__Example of usage__

```typescript
let myMapO = new ObservableMap<string, number>()
myMapO.eventOnChange.subscribe((k,v) => {
    console.log('k=', k, 'v=', v)
})
myMapO.set('one', 1)
expect(myMapO.get('one')).toEqual(1)
expect(counter).toEqual(1)

```

<br/>

### Create ObservableMap
```typescript
const myMapO = new ObservableMap<string, number>()
const myAnotherMapO = new ObservableMap<string, number>([['one', 1], ['two', 2]])
```

<br/>

### `eventOnChange:TypeEvent<(key?:K, value?:V)=>void>`
This event will be triggered every time the map changes

```typescript
myMapO.eventOnChange.subscribe((key, value) => {
    console.log('map was changed', 'key=', key, 'value=', value)
})
```

<br/>

### `eventOnChangeKey:TypeEvent<(key:K, value:V)=>void>`
This event will be triggered every time some key was changed or added or deleted.

```typescript
myMapO.eventOnChangeKey.subscribe((key, value) => {
    console.log('key was changed', key, 'value=', value)
})
```

<br/>

### `eventOnDeleteKey:TypeEvent<(key:K)=>void>`

This event will be triggered every time key was deleted.

```typescript
myMapO.eventOnDeleteKey.subscribe((key) => {
    console.log('key was deleted', key)
})
```

<br/>

### `eventOnClear:TypeEvent<() => void>`

This event will be triggered every time map was cleared.

```typescript
myMapO.eventOnClear.subscribe(() => {
    console.log('map is empty')
})
```
<br/>

### `entries()`

The entries() method returns a new Iterator object that contains the [key, value] pairs for each element in the Map object in insertion order.

```typescript
for(let [k,v] of myMapO.entries()){
    console.log('key=', k, 'value=', v)
}
```

<br/>

### `has(key:K):boolean`

The has() method returns a boolean indicating whether an element with the specified key exists or not.

```typescript
myMapO.has('some key') // true or false
```

<br/>

### `forEach(callbackfn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any): void`

The forEach() method executes a provided function once per each key/value pair in the Map object, in insertion order.

```typescript
myMapO.forEach((value, key) => {
    console.log('key=', key, 'value=', value)
})
```

<br/>

### `set(key:K, value:V)`

Add or set new value for key.

```typescript
myMapO.set('my key', 200)
```

This method triggers `.eventOnChangeKey` and `.eventOnChange`

<br/>

### `get(key:K):V|undefined`

Get value by key or undefined.

```typescript
myMapO.get('my key')
```

<br/>

### `toArray()`

Create new array from map.

```typescript
myMapO.toArray()
```

<br/>

### `initFromArray(mapEntries:Iterable<readonly [K, V]>)`

Replace all values in map by values from array.

```typescript
myMapO.initFromArray([['k1', 1], ['k2', 2]])
```

This method triggers `.eventOnChange`

<br/>

### `delete(key:K)`

Delete key from map.

```typescript
myMapO.delete('my key')
```

This method triggers `.eventOnDeleteKey` and `.eventOnChange` if key exists.

<br/>

### `clear()`

Clear all keys from map.

```typescript
myMapO.clear()
```

This method triggers `.eventOnClear` and `.eventOnChange`.

<br/>

### `keys()`

The keys() method returns a new Iterator object that contains the keys for each element in the Map object in insertion order.

```typescript
for(let key of myMapO.keys()){
    console.log('key=', key)
}
```

<br/>

### `values()`

The values() method returns a new Iterator object that contains the values for each element in the Map object in insertion order.

```typescript
for(let value of myMapO.value()){
    console.log('value=', value)
}
```

<br/>

### `isEmpty():boolean`

Check is map is empty.

```typescript
myMapO.isEmpty() // true or false
```

<br/>

### `size:number`

Get size of map.

```typescript
console.log('size of map is ', myMapO.size)
```

<br/>


<br/>
<br/>

# ObservableLocalStorageVariable<T>

ObservableLocalStorageVariable allows to track changes on value in localStorage in browser.


```typescript
const myStringO = new ObservableLocalStorageValue<string>({
    localStorageKey: 'my-key-in-local-storage',
    defaultValueIfNotInLocalStorage: 'default text' // optional
})
```
<br/>

### `eventOnChange:TypeEvent<(newValue:T, prevValue?:T)=>void>`

This event will be triggered every time the value changes.

```typescript
myStringO.eventOnChange.subscribe((newValue, prevValue) => {
    console.log('the value was changed from ', prveValue, 'to', newValue)
})
```

For more details on TypeEvent please visit <https://github.com/LexRiver/type-event>

<br/>

### `set(value:T)`
Set new value.
```typescript
myStringO.set('new value')
```
This method triggers `.eventOnChange` event

<br/>

### `setByPrevious(setter:(oldValue:T)=>T)`
Set new value by previous value.
```typescript
myStringO.set((previous) => previous+'!')
```
This method will also trigger `.eventOnChange`.

<br/>

### `get()`
Get current value. 
```typescript
let result = myStringO.get()
```
<br/>


