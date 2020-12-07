"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObservableMap = void 0;
var type_event_1 = require("@lexriver/type-event");
//import { Observable } from "./Observable.ts.old"
var ObservableMap = /** @class */ (function () {
    function ObservableMap(mapEntries) {
        this.eventOnChange = new type_event_1.TypeEvent();
        this.eventOnChangeKey = new type_event_1.TypeEvent();
        this.eventOnDeleteKey = new type_event_1.TypeEvent();
        this.eventOnClear = new type_event_1.TypeEvent();
        this.internalMap = new Map();
        if (mapEntries) {
            this.internalMap = new Map(mapEntries);
        }
    }
    /**
     * The entries() method returns a new Iterator object that contains the [key, value] pairs for each element in the Map object in insertion order.
     */
    ObservableMap.prototype.entries = function () {
        return this.internalMap.entries();
    };
    /**
     * The has() method returns a boolean indicating whether an element with the specified key exists or not.
     */
    ObservableMap.prototype.has = function (key) {
        return this.internalMap.has(key);
    };
    /**
     * The forEach() method executes a provided function once per each key/value pair in the Map object, in insertion order.
     * @param callbackfn
     * @param thisArg
     */
    ObservableMap.prototype.forEach = function (callbackfn, thisArg) {
        return this.internalMap.forEach(callbackfn, thisArg);
    };
    ObservableMap.prototype.set = function (key, value) {
        this.internalMap.set(key, value);
        this.eventOnChangeKey.triggerAsync(key, value);
        this.eventOnChange.triggerAsync(key, value);
    };
    ObservableMap.prototype.get = function (key) {
        return this.internalMap.get(key);
    };
    ObservableMap.prototype.toArray = function () {
        return Array.from(this.internalMap.entries());
    };
    ObservableMap.prototype.initFromArray = function (mapEntries) {
        this.internalMap = new Map(mapEntries);
        this.eventOnChange.triggerAsync();
    };
    ObservableMap.prototype.delete = function (key) {
        var result = this.internalMap.delete(key);
        if (result) {
            this.eventOnDeleteKey.triggerAsync(key);
            this.eventOnChange.triggerAsync(key);
        }
        return result;
    };
    ObservableMap.prototype.clear = function () {
        this.internalMap.clear();
        this.eventOnClear.triggerAsync();
        this.eventOnChange.triggerAsync();
    };
    /**
     * The keys() method returns a new Iterator object that contains the keys for each element in the Map object in insertion order.
     */
    ObservableMap.prototype.keys = function () {
        return this.internalMap.keys();
    };
    /**
     * The values() method returns a new Iterator object that contains the values for each element in the Map object in insertion order.
     */
    ObservableMap.prototype.values = function () {
        return this.internalMap.values();
    };
    ObservableMap.prototype.isEmpty = function () {
        return this.internalMap.size == 0;
    };
    Object.defineProperty(ObservableMap.prototype, "size", {
        get: function () {
            return this.internalMap.size;
        },
        enumerable: false,
        configurable: true
    });
    return ObservableMap;
}());
exports.ObservableMap = ObservableMap;
