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
exports.ObservableArray = void 0;
var type_event_1 = require("@lexriver/type-event");
//TODO: implement missing members to match array closely
var ObservableArray = /** @class */ (function () {
    function ObservableArray(initialArray) {
        var _this = this;
        this.eventOnChange = new type_event_1.TypeEvent();
        //eventOnAdd:TypeEvent<(item:T, index:number)=>void> = new TypeEvent()
        //eventOnRemove:TypeEvent<(item:T, index:number)=>void> = new TypeEvent()
        this.items = [];
        //#region iterator
        // *[Symbol.iterator]() {
        //     for(let i of this.items) {
        //         yield i;
        //     }
        // }    
        this.iteratorIndex = 0;
        if (initialArray) {
            this.items = initialArray;
        }
        var proxySettings = {
            get: function (target, prop, receiver) {
                var propNumber = parseInt(prop);
                if (propNumber >= 0) {
                    return _this.items[propNumber];
                }
                var result = Reflect.get(target, prop, receiver);
                //console.log('proxy get', 'prop=', prop, typeof prop)
                return result;
            },
            set: function (target, prop, value, receiver) {
                //console.log('proxy set', 'target=', target, 'prop=', prop, typeof prop, 'value=', value, 'receiver=', receiver)
                if (prop === 'items') {
                    _this.items = value;
                    //this.eventOnChange.triggerAsync() // this is triggered in method
                    return true;
                }
                var propNumber = parseInt(prop);
                if (propNumber >= 0) {
                    //console.log('proxy SET', 'prop=', prop, 'value=', value)
                    _this.items[propNumber] = value;
                    _this.eventOnChange.triggerAsync(value);
                }
                return true;
            }
        };
        return new Proxy(this, proxySettings);
    }
    ObservableArray.prototype.getItemsCopy = function () {
        return this.items.slice(0);
    };
    Object.defineProperty(ObservableArray.prototype, "length", {
        get: function () {
            return this.items.length;
        },
        enumerable: false,
        configurable: true
    });
    ObservableArray.prototype.getInternalArray = function () {
        return this.items;
    };
    ObservableArray.prototype.getAsArray = function () {
        return this.getItemsCopy();
    };
    ObservableArray.prototype.toArray = function () {
        return this.getAsArray();
    };
    ObservableArray.prototype.set = function (items) {
        this.items = items;
        //console.log('set:', 'items=', items, 'this.items=', this.items)
        this.eventOnChange.triggerAsync();
    };
    ObservableArray.prototype.setByPrevious = function (setter) {
        var prevItems = this.items;
        var nextItems = setter(prevItems);
        this.items = nextItems;
        this.eventOnChange.triggerAsync();
    };
    ObservableArray.prototype.appendArray = function (arrayToAppend) {
        this.items = this.items.concat(arrayToAppend);
        this.eventOnChange.triggerAsync();
    };
    /**
     * The every() method tests whether all elements in the array pass the test implemented by the provided function. It returns a Boolean value.
     */
    ObservableArray.prototype.every = function (conditionToCheck) {
        return this.items.every(conditionToCheck);
    };
    /**
     * The fill() method changes all elements in an array to a static value, from a start index (default 0) to an end index (default array.length). It returns the modified array.
     */
    ObservableArray.prototype.fill = function (value, start, end) {
        var result = this.items.fill(value, start, end);
        this.eventOnChange.triggerAsync();
        return result;
    };
    /**
     * The filter() method creates a new array with all elements that pass the test implemented by the provided function.
     */
    ObservableArray.prototype.filter = function (action) {
        return this.items.filter(action);
    };
    /**
     * The find() method returns the value of the first element in the provided array that satisfies the provided testing function.
     */
    ObservableArray.prototype.find = function (predicate) {
        return this.items.find(predicate);
    };
    /**
     * The findIndex() method returns the index of the first element in the array that satisfies the provided testing function. Otherwise, it returns -1, indicating that no element passed the test.
     */
    ObservableArray.prototype.findIndex = function (predicate) {
        return this.items.findIndex(predicate);
    };
    // /**
    //  * The flat() method creates a new array with all sub-array elements concatenated into it recursively up to the specified depth.
    //  */
    // flat(){
    //     this.items.flat()
    // }
    /**
     * The forEach() method executes a provided function once for each array element.
     */
    ObservableArray.prototype.forEach = function (action, thisArg) {
        return this.items.forEach(action, thisArg);
    };
    /**
     * The includes() method determines whether an array includes a certain value among its entries, returning true or false as appropriate.
     */
    ObservableArray.prototype.includes = function (searchElement, fromIndex) {
        return this.items.includes(searchElement, fromIndex);
    };
    /**
     * The indexOf() method returns the first index at which a given element can be found in the array, or -1 if it is not present.
     */
    ObservableArray.prototype.indexOf = function (searchElement, fromIndex) {
        return this.items.indexOf(searchElement, fromIndex);
    };
    /**
     * The join() method creates and returns a new string by concatenating all of the elements in an array, separated by commas or a specified separator string. If the array has only one item, then that item will be returned without using the separator.
     */
    ObservableArray.prototype.join = function (separator) {
        return this.items.join(separator);
    };
    /**
     * The keys() method returns a new Array Iterator object that contains the keys for each index in the array
     */
    ObservableArray.prototype.keys = function () {
        return this.items.keys();
    };
    /**
     * The lastIndexOf() method returns the last index at which a given element can be found in the array, or -1 if it is not present. The array is searched backwards, starting at fromIndex.
     */
    ObservableArray.prototype.lastIndexOf = function (searchElement, fromIndex) {
        return this.items.lastIndexOf(searchElement, fromIndex);
    };
    /**
     * The map() method creates a new array populated with the results of calling a provided function on every element in the calling array.
     * @param action
     */
    ObservableArray.prototype.map = function (action, thisArg) {
        return this.items.map(action, thisArg);
    };
    /**
     * The pop() method removes the last element from an array and returns that element. This method changes the length of the array.
     */
    ObservableArray.prototype.pop = function () {
        var result = this.items.pop();
        this.eventOnChange.triggerAsync();
        return result;
    };
    /**
     * The push() method adds zero or more elements to the end of an array and returns the new length of the array.
     * @param item
     */
    ObservableArray.prototype.push = function (item) {
        this.items.push(item);
        this.eventOnChange.triggerAsync(item);
        //this.eventOnPush.triggerAsync(item)
        return this.items.length;
    };
    /**
     * The reduce() method executes a reducer function (that you provide) on each element of the array, resulting in single output value.
     */
    ObservableArray.prototype.reduce = function (action, initValue) {
        return this.items.reduce(action, initValue);
    };
    /**
     * The reduceRight() method applies a function against an accumulator and each value of the array (from right-to-left) to reduce it to a single value.
     */
    ObservableArray.prototype.reduceRight = function (action, initValue) {
        return this.items.reduceRight(action, initValue);
    };
    /**
     * The reverse() method reverses an array in place. The first array element becomes the last, and the last array element becomes the first.
     */
    ObservableArray.prototype.reverse = function () {
        this.items.reverse();
        this.eventOnChange.triggerAsync();
    };
    /**
     * Removes the first element from an array and returns it.
     */
    ObservableArray.prototype.shift = function () {
        var result = this.items.shift();
        this.eventOnChange.triggerAsync(result);
        return result;
    };
    /**
     * Returns a section of an array.
     * @param start The beginning of the specified portion of the array.
     * @param end The end of the specified portion of the array. This is exclusive of the element at the index 'end'.
     */
    ObservableArray.prototype.slice = function (start, end) {
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
    ObservableArray.prototype.some = function (predicate, thisArg) {
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
    ObservableArray.prototype.sort = function (compareFn) {
        var result = this.items.sort(compareFn);
        this.eventOnChange.triggerAsync();
        return result;
    };
    ObservableArray.prototype.splice = function (start, deleteCount) {
        var _a;
        var items = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            items[_i - 2] = arguments[_i];
        }
        var result = typeof deleteCount === 'number'
            ? (_a = this.items).splice.apply(_a, __spreadArray([start, deleteCount], __read(items), false)) : this.items.splice(start, deleteCount);
        this.eventOnChange.triggerAsync();
        return result;
    };
    // /**
    //  * The toLocaleString() method returns a string representing the elements of the array. The elements are converted to Strings using their toLocaleString methods and these Strings are separated by a locale-specific String (such as a comma “,”).
    //  */
    // toLocaleString(locales?:string, options?:any){
    //     //return this.items.toLocaleString(locales, options)
    // }
    /**
     * A string representing the elements of the array.
     */
    ObservableArray.prototype.toString = function () {
        return "ObservableArray:" + this.items.toString();
    };
    /**
     * Inserts new elements at the start of an array.
     * @param items  Elements to insert at the start of the Array.
     */
    ObservableArray.prototype.unshift = function () {
        var _a;
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        var result = (_a = this.items).unshift.apply(_a, __spreadArray([], __read(items), false));
        this.eventOnChange.triggerAsync();
        return result;
    };
    /**
     * Returns an iterable of values in the array
     */
    ObservableArray.prototype.values = function () {
        return this.items.values();
    };
    ObservableArray.prototype.getByIndex = function (index) {
        return this.items[index];
    };
    ObservableArray.prototype.setByIndex = function (index, value) {
        this.items[index] = value;
        this.eventOnChange.triggerAsync(value);
    };
    ObservableArray.prototype.removeItemByIndex = function (index) {
        var itemToBeRemoved = this.items[index];
        this.items.splice(index, 1);
        //this.eventOnRemove.triggerAsync(itemToBeRemoved)
        this.eventOnChange.triggerAsync(itemToBeRemoved);
    };
    ObservableArray.prototype[Symbol.iterator] = function () {
        return this;
    };
    ObservableArray.prototype.next = function () {
        if (this.iteratorIndex < this.items.length) {
            return { value: this.items[this.iteratorIndex], done: false };
        }
        return { value: null, done: true };
    };
    return ObservableArray;
}());
exports.ObservableArray = ObservableArray;
