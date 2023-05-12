"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObservableLocalStorageArray = void 0;
var type_event_1 = require("@lexriver/type-event");
var filename = '[ObservableLocalStorageArray]:';
/**
 * 1) set -> saves to localStorage if new
 * 2) localStorage-change events popups -> onChangeEvents triggers
 * 3) onChangeEvents sets current local variable
 */
var ObservableLocalStorageArray = /** @class */ (function () {
    function ObservableLocalStorageArray(p) {
        this.p = p;
        //protected observableVariable:Observable<T|undefined>
        //protected localStorageKey:string
        this.items = [];
        this.eventOnChange = new type_event_1.TypeEvent();
        //#region iterator
        // *[Symbol.iterator]() {
        //     for(let i of this.items) {
        //         yield i;
        //     }
        // }    
        this.iteratorIndex = 0;
        this.assignCurrentValue(false);
        this.subscribeToWindowEvent();
    }
    ObservableLocalStorageArray.prototype.subscribeToWindowEvent = function () {
        var _this = this;
        // warning: 'storage' event is not firing if changes were made on this page !!!!!!!!
        window.addEventListener('storage', function (e) {
            //console.log('localStorage change event from another window, e=', e)
            // e.key: "productDisplayType"
            // e.newValue: ""tiles""
            // e.oldValue: ""list""
            if (e.key != _this.p.localStorageKey)
                return;
            // const oldValue = this.currentValue
            _this.assignCurrentValue(true);
            // this.eventOnChange.triggerAsync(this.items)
        });
    };
    ObservableLocalStorageArray.prototype.getInternalArray = function () {
        return this.items;
    };
    ObservableLocalStorageArray.prototype.getAsCopy = function () {
        return this.items.slice(0);
    };
    ObservableLocalStorageArray.prototype.toArray = function () {
        return this.getAsCopy();
    };
    Object.defineProperty(ObservableLocalStorageArray.prototype, "length", {
        get: function () {
            return this.items.length;
        },
        enumerable: false,
        configurable: true
    });
    ObservableLocalStorageArray.prototype.appendArray = function (arrayToAppend) {
        this.items = this.items.concat(arrayToAppend);
        this.set(this.items);
    };
    /**
     * The every() method tests whether all elements in the array pass the test implemented by the provided function. It returns a Boolean value.
     */
    ObservableLocalStorageArray.prototype.every = function (conditionToCheck) {
        return this.items.every(conditionToCheck);
    };
    /**
     * The fill() method changes all elements in an array to a static value, from a start index (default 0) to an end index (default array.length). It returns the modified array.
     */
    ObservableLocalStorageArray.prototype.fill = function (value, start, end) {
        var result = this.items.fill(value, start, end);
        this.set(result);
        return result;
    };
    /**
     * The filter() method creates a new array with all elements that pass the test implemented by the provided function.
     */
    ObservableLocalStorageArray.prototype.filter = function (action) {
        return this.items.filter(action);
    };
    /**
     * The find() method returns the value of the first element in the provided array that satisfies the provided testing function.
     */
    ObservableLocalStorageArray.prototype.find = function (predicate) {
        return this.items.find(predicate);
    };
    /**
     * The findIndex() method returns the index of the first element in the array that satisfies the provided testing function. Otherwise, it returns -1, indicating that no element passed the test.
     */
    ObservableLocalStorageArray.prototype.findIndex = function (predicate) {
        return this.items.findIndex(predicate);
    };
    /**
     * The forEach() method executes a provided function once for each array element.
     */
    ObservableLocalStorageArray.prototype.forEach = function (action, thisArg) {
        return this.items.forEach(action, thisArg);
    };
    /**
     * The includes() method determines whether an array includes a certain value among its entries, returning true or false as appropriate.
     */
    ObservableLocalStorageArray.prototype.includes = function (searchElement, fromIndex) {
        return this.items.includes(searchElement, fromIndex);
    };
    /**
     * The indexOf() method returns the first index at which a given element can be found in the array, or -1 if it is not present.
     */
    ObservableLocalStorageArray.prototype.indexOf = function (searchElement, fromIndex) {
        return this.items.indexOf(searchElement, fromIndex);
    };
    /**
     * The join() method creates and returns a new string by concatenating all of the elements in an array, separated by commas or a specified separator string. If the array has only one item, then that item will be returned without using the separator.
     */
    ObservableLocalStorageArray.prototype.join = function (separator) {
        return this.items.join(separator);
    };
    /**
     * The keys() method returns a new Array Iterator object that contains the keys for each index in the array
     */
    ObservableLocalStorageArray.prototype.keys = function () {
        return this.items.keys();
    };
    /**
     * The lastIndexOf() method returns the last index at which a given element can be found in the array, or -1 if it is not present. The array is searched backwards, starting at fromIndex.
     */
    ObservableLocalStorageArray.prototype.lastIndexOf = function (searchElement, fromIndex) {
        return this.items.lastIndexOf(searchElement, fromIndex);
    };
    /**
     * The map() method creates a new array populated with the results of calling a provided function on every element in the calling array.
     * @param action
     */
    ObservableLocalStorageArray.prototype.map = function (action, thisArg) {
        return this.items.map(action, thisArg);
    };
    /**
     * The pop() method removes the last element from an array and returns that element. This method changes the length of the array.
     */
    ObservableLocalStorageArray.prototype.pop = function () {
        var result = this.items.pop();
        this.set(this.items);
        return result;
    };
    /**
     * The push() method adds zero or more elements to the end of an array and returns the new length of the array.
     * @param item
     */
    ObservableLocalStorageArray.prototype.push = function (item) {
        this.items.push(item);
        this.set(this.items);
        return this.items.length;
    };
    /**
     * The reduce() method executes a reducer function (that you provide) on each element of the array, resulting in single output value.
     */
    ObservableLocalStorageArray.prototype.reduce = function (action, initValue) {
        return this.items.reduce(action, initValue);
    };
    /**
     * The reduceRight() method applies a function against an accumulator and each value of the array (from right-to-left) to reduce it to a single value.
     */
    ObservableLocalStorageArray.prototype.reduceRight = function (action, initValue) {
        return this.items.reduceRight(action, initValue);
    };
    /**
     * The reverse() method reverses an array in place. The first array element becomes the last, and the last array element becomes the first.
     */
    ObservableLocalStorageArray.prototype.reverse = function () {
        this.items.reverse();
        this.set(this.items);
    };
    /**
     * Removes the first element from an array and returns it.
     */
    ObservableLocalStorageArray.prototype.shift = function () {
        var result = this.items.shift();
        this.set(this.items);
        return result;
    };
    /**
     * Returns a section of an array.
     * @param start The beginning of the specified portion of the array.
     * @param end The end of the specified portion of the array. This is exclusive of the element at the index 'end'.
     */
    ObservableLocalStorageArray.prototype.slice = function (start, end) {
        return this.items.slice(start, end);
    };
    /**
     * Determines whether the specified callback function returns true for any element of an array.
     * @param callbackfn A function that accepts up to three arguments. The some method calls
     * the callbackfn function for each element in the array until the callbackfn returns a value
     * which is coercible to the Boolean value true, or until the end of the array.
     * @param thisArg An object to which the this keyword can refer in the callbackfn function.
     * If thisArg is omitted, undefined is used as the this value.
     */
    ObservableLocalStorageArray.prototype.some = function (predicate, thisArg) {
        return this.items.some(predicate, thisArg);
    };
    /**
     * Sorts an array.
     * @param compareFn Function used to determine the order of the elements. It is expected to return
     * a negative value if first argument is less than second argument, zero if they're equal and a positive
     * value otherwise. If omitted, the elements are sorted in ascending, ASCII character order.
     * ```ts
     * [11,2,22,1].sort((a, b) => a - b)
     * ```
     */
    ObservableLocalStorageArray.prototype.sort = function (compareFn) {
        var result = this.items.sort(compareFn);
        this.set(this.items);
        return result;
    };
    ObservableLocalStorageArray.prototype.splice = function (start, deleteCount) {
        var _a;
        var items = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            items[_i - 2] = arguments[_i];
        }
        var result = typeof deleteCount === 'number'
            ? (_a = this.items).splice.apply(_a, __spreadArray([start, deleteCount], __read(items), false)) : this.items.splice(start, deleteCount);
        this.set(this.items);
        return result;
    };
    /**
     * A string representing the elements of the array.
     */
    ObservableLocalStorageArray.prototype.toString = function () {
        return "ObservableLocalStorageArray:" + this.items.toString();
    };
    /**
     * Inserts new elements at the start of an array.
     * @param items  Elements to insert at the start of the Array.
     */
    ObservableLocalStorageArray.prototype.unshift = function () {
        var _a;
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        var result = (_a = this.items).unshift.apply(_a, __spreadArray([], __read(items), false));
        this.set(this.items);
        return result;
    };
    /**
     * Returns an iterable of values in the array
     */
    ObservableLocalStorageArray.prototype.values = function () {
        return this.items.values();
    };
    ObservableLocalStorageArray.prototype.getByIndex = function (index) {
        return this.items[index];
    };
    ObservableLocalStorageArray.prototype.setByIndex = function (index, value) {
        this.items[index] = value;
        this.set(this.items);
    };
    ObservableLocalStorageArray.prototype.removeItemByIndex = function (index) {
        // const itemToBeRemoved = this.items[index]
        this.items.splice(index, 1);
        //this.eventOnRemove.triggerAsync(itemToBeRemoved)
        this.set(this.items);
    };
    /**
     * Removes first item in array.
     * Returns true if successful.
     * @param item
     * @returns
     */
    ObservableLocalStorageArray.prototype.removeFirst = function (item) {
        var index = this.items.indexOf(item);
        if (index >= 0) {
            this.removeItemByIndex(index);
            return true;
        }
        return false;
    };
    ObservableLocalStorageArray.prototype[Symbol.iterator] = function () {
        return this;
    };
    ObservableLocalStorageArray.prototype.next = function () {
        if (this.iteratorIndex < this.items.length) {
            return { value: this.items[this.iteratorIndex], done: false };
        }
        return { value: null, done: true };
    };
    //#endregion iterator
    ObservableLocalStorageArray.prototype.set = function (items) {
        var valueToPut = JSON.stringify(items);
        var valueInLocalStorageAsString = window.localStorage.getItem(this.p.localStorageKey);
        if (valueToPut !== valueInLocalStorageAsString) {
            // const prevValue = this.currentValue
            window.localStorage.setItem(this.p.localStorageKey, valueToPut); // event is not triggered for current window
            this.assignCurrentValue(true);
        }
    };
    ObservableLocalStorageArray.prototype.getValueFromLocalStorage = function () {
        var valueInLocalStorageAsString = window.localStorage.getItem(this.p.localStorageKey);
        if (valueInLocalStorageAsString == null || valueInLocalStorageAsString === "undefined") {
            // we have no value, let's remove this item
            window.localStorage.removeItem(this.p.localStorageKey);
            return undefined;
        }
        return valueInLocalStorageAsString;
    };
    ObservableLocalStorageArray.prototype.assignCurrentValue = function (triggerEventIfNew) {
        var previousItemsAsString = JSON.stringify(this.items);
        var newItemsAsString = this.getValueFromLocalStorage();
        if (newItemsAsString === previousItemsAsString)
            return;
        this.items = this.p.defaultValueIfNotInLocalStorage || [];
        // let stringValue = this.getValueFromLocalStorage()
        if (newItemsAsString) {
            try {
                this.items = JSON.parse(newItemsAsString);
                if (triggerEventIfNew) {
                    this.eventOnChange.triggerAsync(this.items);
                }
            }
            catch (x) {
                console.warn('unable to parse', newItemsAsString);
            }
        }
    };
    return ObservableLocalStorageArray;
}());
exports.ObservableLocalStorageArray = ObservableLocalStorageArray;
