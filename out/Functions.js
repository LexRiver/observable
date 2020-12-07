"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfObservable = exports.createObservable = void 0;
var ObservableArray_1 = require("./ObservableArray");
var ObservableMap_1 = require("./ObservableMap");
var ObservableVariable_1 = require("./ObservableVariable");
function createObservable(x) {
    if (typeof x === 'string') {
        return new ObservableVariable_1.ObservableVariable(x);
    }
    if (typeof x === 'number') {
        return new ObservableVariable_1.ObservableVariable(x);
    }
    if (typeof x === 'boolean') {
        return new ObservableVariable_1.ObservableVariable(x);
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
    return o instanceof ObservableVariable_1.ObservableVariable || o instanceof ObservableArray_1.ObservableArray || o instanceof ObservableMap_1.ObservableMap;
}
exports.checkIfObservable = checkIfObservable;
