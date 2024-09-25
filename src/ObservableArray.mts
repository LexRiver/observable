import { TypeEvent } from "@lexriver/type-event"
import { Observable } from "./Observable.mjs"

//TODO: implement missing members to match array closely
export class ObservableArray<T> implements IterableIterator<T>, Observable{
    [key:number]:T

    eventOnChange:TypeEvent<(changedItem?:T)=>void> = new TypeEvent()
    //eventOnAdd:TypeEvent<(item:T, index:number)=>void> = new TypeEvent()
    //eventOnRemove:TypeEvent<(item:T, index:number)=>void> = new TypeEvent()
    protected items:T[] = []

    constructor(initialArray?:T[]){
        if(initialArray){
            this.items = initialArray
        }
        let proxySettings = {
            get: (target: ObservableArray<T>, prop: string, receiver: any) => {
                let propNumber = parseInt(prop)
                if(propNumber>=0){
                    return this.items[propNumber]
                }
                const result = Reflect.get(target, prop, receiver);
                //console.log('proxy get', 'prop=', prop, typeof prop)
                return result
            },
            set: (target:ObservableArray<T>, prop:string, value:any, receiver:any) => {
                //console.log('proxy set', 'target=', target, 'prop=', prop, typeof prop, 'value=', value, 'receiver=', receiver)

                if(prop === 'items'){
                    this.items = value
                    //this.eventOnChange.triggerAsync() // this is triggered in method
                    return true
                }
                
                let propNumber = parseInt(prop)
                if(propNumber>=0){
                    //console.log('proxy SET', 'prop=', prop, 'value=', value)
                    this.items[propNumber] = value
                    this.eventOnChange.triggerAsync(value)
                }
                return true
            }
        }
        return new Proxy(this, proxySettings)
    }

    protected getItemsCopy(){
        return this.items.slice(0)
    }


    get length():number{
        return this.items.length
    }


    getInternalArray(){
        return this.items
    }

    getAsArray(){
        return this.getItemsCopy()
    }

    toArray(){
        return this.getAsArray()
    }


    set(items:T[]){
        this.items = items
        //console.log('set:', 'items=', items, 'this.items=', this.items)
        this.eventOnChange.triggerAsync()
    }

    setByPrevious(setter:(oldValue:T[])=>T[]){
        const prevItems = this.items
        const nextItems = setter(prevItems)
        this.items = nextItems
        this.eventOnChange.triggerAsync()
    }

    appendArray(arrayToAppend:T[]){
        this.items = this.items.concat(arrayToAppend)
        this.eventOnChange.triggerAsync()
    }

    /**
     * The every() method tests whether all elements in the array pass the test implemented by the provided function. It returns a Boolean value.
     */
    every(conditionToCheck:(value:T, index?:number, array?:T[])=>boolean){
        return this.items.every(conditionToCheck)
    }


    /**
     * The fill() method changes all elements in an array to a static value, from a start index (default 0) to an end index (default array.length). It returns the modified array.
     */
    fill(value:T, start?:number, end?:number){
        const result = this.items.fill(value, start, end)
        this.eventOnChange.triggerAsync()
        return result
    }

    /**
     * The filter() method creates a new array with all elements that pass the test implemented by the provided function.
     */
    filter(action:(value:T, index?:number, array?:T[])=>boolean){
        return this.items.filter(action)
    }

    /**
     * The find() method returns the value of the first element in the provided array that satisfies the provided testing function.
     */
    find(predicate:(value:T, index?:number, array?:T[])=>boolean){
        return this.items.find(predicate)
    }

    /**
     * The findIndex() method returns the index of the first element in the array that satisfies the provided testing function. Otherwise, it returns -1, indicating that no element passed the test.
     */
    findIndex(predicate:(value:T, index?:number, array?:T[])=>boolean){
        return this.items.findIndex(predicate)
    }

    // /**
    //  * The flat() method creates a new array with all sub-array elements concatenated into it recursively up to the specified depth.
    //  */
    // flat(){
    //     this.items.flat()
    // }

    /**
     * The forEach() method executes a provided function once for each array element.
     */
    forEach(action:(value:T, index?:number, array?:T[])=>void, thisArg?:any){
        return this.items.forEach(action, thisArg)        
    }

    /**
     * The includes() method determines whether an array includes a certain value among its entries, returning true or false as appropriate.
     */
    includes(searchElement:T, fromIndex?:number):boolean{
        return this.items.includes(searchElement, fromIndex)
    }

    /**
     * The indexOf() method returns the first index at which a given element can be found in the array, or -1 if it is not present.
     */
    indexOf(searchElement:T, fromIndex?:number):number{
        return this.items.indexOf(searchElement, fromIndex)
    }

    /**
     * The join() method creates and returns a new string by concatenating all of the elements in an array, separated by commas or a specified separator string. If the array has only one item, then that item will be returned without using the separator.
     */
    join(separator?:string):string{
        return this.items.join(separator)
    }

    /**
     * The keys() method returns a new Array Iterator object that contains the keys for each index in the array
     */
    keys(){
        return this.items.keys()
    }

    /**
     * The lastIndexOf() method returns the last index at which a given element can be found in the array, or -1 if it is not present. The array is searched backwards, starting at fromIndex.
     */
    lastIndexOf(searchElement:T, fromIndex?:number){
        return this.items.lastIndexOf(searchElement, fromIndex)        
    }

    /**
     * The map() method creates a new array populated with the results of calling a provided function on every element in the calling array.
     * @param action 
     */
    map(action:(value:T, index?:number, array?:T[])=>void, thisArg?:any){
        return this.items.map(action, thisArg)
    }

    /**
     * The pop() method removes the last element from an array and returns that element. This method changes the length of the array.
     */
    pop(){
        const result = this.items.pop()
        this.eventOnChange.triggerAsync()
        return result
    }

    /**
     * The push() method adds zero or more elements to the end of an array and returns the new length of the array.
     * @param item 
     */
    push(item:T){
        this.items.push(item)
        this.eventOnChange.triggerAsync(item) 
        //this.eventOnPush.triggerAsync(item)
        return this.items.length
    }

    /**
     * The reduce() method executes a reducer function (that you provide) on each element of the array, resulting in single output value.
     */
    reduce<R>(action:(accumulator:R, value:T, index?:Number) => R, initValue:R){
        return this.items.reduce(action, initValue)
    }

    /**
     * The reduceRight() method applies a function against an accumulator and each value of the array (from right-to-left) to reduce it to a single value.
     */
    reduceRight<R>(action:(accumulator:R, value:T, index?:Number) => R, initValue:R){
        return this.items.reduceRight(action, initValue)
    }

    /**
     * The reverse() method reverses an array in place. The first array element becomes the last, and the last array element becomes the first.
     */
    reverse(){
        this.items.reverse()
        this.eventOnChange.triggerAsync()
    }

    /**
     * Removes the first element from an array and returns it.
     */
    shift(): T | undefined{
        const result = this.items.shift()
        this.eventOnChange.triggerAsync(result)
        return result
    }

    /**
     * Returns a section of an array.
     * @param start The beginning of the specified portion of the array.
     * @param end The end of the specified portion of the array. This is exclusive of the element at the index 'end'.
     */
    slice(start?:number, end?:number):T[]{
        return this.items.slice(start, end)
    }

    /**
     * Determines whether the specified callback function returns true for any element of an array.
     * @param callbackfn A function that accepts up to three arguments. The some method calls
     * the callbackfn function for each element in the array until the callbackfn returns a value
     * which is coercible to the Boolean value true, or until the end of the array.
     * @param thisArg An object to which the this keyword can refer in the callbackfn function.
     * If thisArg is omitted, undefined is used as the this value.
     */
    some(predicate:(value:T, index?:number, array?:T[])=>boolean, thisArg?:any):boolean{
        return this.items.some(predicate, thisArg)
    }

    /**
     * Sorts an array.
     * @param compareFn Function used to determine the order of the elements. It is expected to return
     * a negative value if first argument is less than second argument, zero if they're equal and a positive
     * value otherwise. If omitted, the elements are sorted in ascending, ASCII character order.
     * ```ts
     * [11,2,22,1].sort((a, b) => a - b)
     * ```
     */
    sort(compareFn?:(a:T, b:T)=>number){
        const result = this.items.sort(compareFn)
        this.eventOnChange.triggerAsync()
        return result
    }

    /**
     * Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.
     * @param start The zero-based location in the array from which to start removing elements.
     * @param deleteCount The number of elements to remove.
     */
    splice(start: number, deleteCount?: number): T[];
    /**
     * Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.
     * @param start The zero-based location in the array from which to start removing elements.
     * @param deleteCount The number of elements to remove.
     * @param items Elements to insert into the array in place of the deleted elements.
     */
    splice(start: number, deleteCount: number, ...items: T[]): T[];
    splice(start:number, deleteCount?:number, ...items:T[]):T[]{
        const result = typeof deleteCount === 'number'
            ? this.items.splice(start, deleteCount, ...items)
            : this.items.splice(start, deleteCount)
        this.eventOnChange.triggerAsync()
        return result
    }

    // /**
    //  * The toLocaleString() method returns a string representing the elements of the array. The elements are converted to Strings using their toLocaleString methods and these Strings are separated by a locale-specific String (such as a comma “,”).
    //  */
    // toLocaleString(locales?:string, options?:any){
    //     //return this.items.toLocaleString(locales, options)
    // }

    /**
     * A string representing the elements of the array.
     */
    toString(){
        return `ObservableArray:`+this.items.toString()
    }

    /**
     * Inserts new elements at the start of an array.
     * @param items  Elements to insert at the start of the Array.
     */
    unshift(...items: T[]): number{
        const result = this.items.unshift(...items)
        this.eventOnChange.triggerAsync()
        return result
    }

    /**
     * Returns an iterable of values in the array
     */
    values(){
        return this.items.values()
    }


    getByIndex(index:number){
        return this.items[index]
    }

    setByIndex(index:number, value:T){
        this.items[index] = value
        this.eventOnChange.triggerAsync(value)
    }


     removeItemByIndex(index:number){
        const itemToBeRemoved = this.items[index]
        this.items.splice(index,1)
        //this.eventOnRemove.triggerAsync(itemToBeRemoved)
        this.eventOnChange.triggerAsync(itemToBeRemoved)
    }




    //#region iterator

    // *[Symbol.iterator]() {
    //     for(let i of this.items) {
    //         yield i;
    //     }
    // }    
    protected iteratorIndex = 0;
    [Symbol.iterator]():IterableIterator<T> {
        return this
    }
    public next():IteratorResult<T> {
        if(this.iteratorIndex<this.items.length){
            return {value: this.items[this.iteratorIndex], done: false}
        } 
        return {value:null, done:true}
    }
    //#endregion iterator

}