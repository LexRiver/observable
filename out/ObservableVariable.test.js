"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import {equal} from 'assert'
var ObservableVariable_1 = require("./ObservableVariable");
test('ObservableVariable', function () {
    var counter = 0;
    var x = new ObservableVariable_1.ObservableVariable(100);
    x.eventOnChange.subscribe(function (newValue, prevValue) {
        if (prevValue) {
            counter = prevValue + newValue;
        }
    });
    x.set(1);
    expect(x.get()).toBe(1);
    expect(counter).toEqual(100 + 1);
});
