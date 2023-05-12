import { TypeEvent } from "@lexriver/type-event";
import { Observable } from "./Observable";
/**
 * 1) set -> saves to localStorage if new
 * 2) localStorage-change events popups -> onChangeEvents triggers
 * 3) onChangeEvents sets current local variable
 */
export declare class ObservableLocalStorageArray<T> implements Observable {
    protected p: {
        localStorageKey: string;
        defaultValueIfNotInLocalStorage?: T[];
    };
    protected items: T[];
    eventOnChange: TypeEvent<(arr: T[]) => void>;
    constructor(p: {
        localStorageKey: string;
        defaultValueIfNotInLocalStorage?: T[];
    });
    protected subscribeToWindowEvent(): void;
    getInternalArray(): T[];
    getAsCopy(): T[];
    toArray(): T[];
    get length(): number;
    appendArray(arrayToAppend: T[]): void;
    /**
     * The every() method tests whether all elements in the array pass the test implemented by the provided function. It returns a Boolean value.
     */
    every(conditionToCheck: (value: T, index?: number, array?: T[]) => boolean): boolean;
    /**
     * The fill() method changes all elements in an array to a static value, from a start index (default 0) to an end index (default array.length). It returns the modified array.
     */
    fill(value: T, start?: number, end?: number): T[];
    /**
     * The filter() method creates a new array with all elements that pass the test implemented by the provided function.
     */
    filter(action: (value: T, index?: number, array?: T[]) => boolean): T[];
    /**
     * The find() method returns the value of the first element in the provided array that satisfies the provided testing function.
     */
    find(predicate: (value: T, index?: number, array?: T[]) => boolean): T | undefined;
    /**
     * The findIndex() method returns the index of the first element in the array that satisfies the provided testing function. Otherwise, it returns -1, indicating that no element passed the test.
     */
    findIndex(predicate: (value: T, index?: number, array?: T[]) => boolean): number;
    /**
     * The forEach() method executes a provided function once for each array element.
     */
    forEach(action: (value: T, index?: number, array?: T[]) => void, thisArg?: any): void;
    /**
     * The includes() method determines whether an array includes a certain value among its entries, returning true or false as appropriate.
     */
    includes(searchElement: T, fromIndex?: number): boolean;
    /**
     * The indexOf() method returns the first index at which a given element can be found in the array, or -1 if it is not present.
     */
    indexOf(searchElement: T, fromIndex?: number): number;
    /**
     * The join() method creates and returns a new string by concatenating all of the elements in an array, separated by commas or a specified separator string. If the array has only one item, then that item will be returned without using the separator.
     */
    join(separator?: string): string;
    /**
     * The keys() method returns a new Array Iterator object that contains the keys for each index in the array
     */
    keys(): IterableIterator<number>;
    /**
     * The lastIndexOf() method returns the last index at which a given element can be found in the array, or -1 if it is not present. The array is searched backwards, starting at fromIndex.
     */
    lastIndexOf(searchElement: T, fromIndex?: number): number;
    /**
     * The map() method creates a new array populated with the results of calling a provided function on every element in the calling array.
     * @param action
     */
    map(action: (value: T, index?: number, array?: T[]) => void, thisArg?: any): void[];
    /**
     * The pop() method removes the last element from an array and returns that element. This method changes the length of the array.
     */
    pop(): T | undefined;
    /**
     * The push() method adds zero or more elements to the end of an array and returns the new length of the array.
     * @param item
     */
    push(item: T): number;
    /**
     * The reduce() method executes a reducer function (that you provide) on each element of the array, resulting in single output value.
     */
    reduce<R>(action: (accumulator: R, value: T, index?: Number) => R, initValue: R): R;
    /**
     * The reduceRight() method applies a function against an accumulator and each value of the array (from right-to-left) to reduce it to a single value.
     */
    reduceRight<R>(action: (accumulator: R, value: T, index?: Number) => R, initValue: R): R;
    /**
     * The reverse() method reverses an array in place. The first array element becomes the last, and the last array element becomes the first.
     */
    reverse(): void;
    /**
     * Removes the first element from an array and returns it.
     */
    shift(): T | undefined;
    /**
     * Returns a section of an array.
     * @param start The beginning of the specified portion of the array.
     * @param end The end of the specified portion of the array. This is exclusive of the element at the index 'end'.
     */
    slice(start?: number, end?: number): T[];
    /**
     * Determines whether the specified callback function returns true for any element of an array.
     * @param callbackfn A function that accepts up to three arguments. The some method calls
     * the callbackfn function for each element in the array until the callbackfn returns a value
     * which is coercible to the Boolean value true, or until the end of the array.
     * @param thisArg An object to which the this keyword can refer in the callbackfn function.
     * If thisArg is omitted, undefined is used as the this value.
     */
    some(predicate: (value: T, index?: number, array?: T[]) => boolean, thisArg?: any): boolean;
    /**
     * Sorts an array.
     * @param compareFn Function used to determine the order of the elements. It is expected to return
     * a negative value if first argument is less than second argument, zero if they're equal and a positive
     * value otherwise. If omitted, the elements are sorted in ascending, ASCII character order.
     * ```ts
     * [11,2,22,1].sort((a, b) => a - b)
     * ```
     */
    sort(compareFn?: (a: T, b: T) => number): T[];
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
    /**
     * A string representing the elements of the array.
     */
    toString(): string;
    /**
     * Inserts new elements at the start of an array.
     * @param items  Elements to insert at the start of the Array.
     */
    unshift(...items: T[]): number;
    /**
     * Returns an iterable of values in the array
     */
    values(): IterableIterator<T>;
    getByIndex(index: number): T;
    setByIndex(index: number, value: T): void;
    removeItemByIndex(index: number): void;
    /**
     * Removes first item in array.
     * Returns true if successful.
     * @param item
     * @returns
     */
    removeFirst(item: T): boolean;
    protected iteratorIndex: number;
    [Symbol.iterator](): IterableIterator<T>;
    next(): IteratorResult<T>;
    set(items: T[]): void;
    protected getValueFromLocalStorage(): string | undefined;
    protected assignCurrentValue(triggerEventIfNew: boolean): void;
}
