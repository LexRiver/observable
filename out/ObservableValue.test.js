"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import {equal} from 'assert'
var ObservableValue_1 = require("./ObservableValue");
test('ObservableValue', function () {
    var x = new ObservableValue_1.ObservableValue(100);
    x.set(1);
    expect(x.get()).toBe(1);
});
