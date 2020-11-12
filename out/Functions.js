"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfObservable = exports.createObservable = void 0;
var ObservableArray_1 = require("./ObservableArray");
var ObservableMap_1 = require("./ObservableMap");
var ObservableValue_1 = require("./ObservableValue");
function createObservable(x) {
    if (typeof x === 'string') {
        return new ObservableValue_1.ObservableValue(x);
    }
    if (typeof x === 'number') {
        return new ObservableValue_1.ObservableValue(x);
    }
    if (typeof x === 'boolean') {
        return new ObservableValue_1.ObservableValue(x);
    }
    if (Array.isArray(x)) {
        return new ObservableArray_1.ObservableArray(x);
    }
    if (x instanceof Map) {
        return new ObservableMap_1.ObservableMap(x);
    }
    console.error('argument=', x, typeof x);
    throw new Error('unable to create Observable from this argument type');
}
exports.createObservable = createObservable;
function checkIfObservable(o) {
    return o instanceof ObservableValue_1.ObservableValue || o instanceof ObservableArray_1.ObservableArray || o instanceof ObservableMap_1.ObservableMap;
}
exports.checkIfObservable = checkIfObservable;
