"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Functions_1 = require("./Functions");
test('Functions', function () {
    var obsString = (0, Functions_1.createObservable)('string');
    obsString.eventOnChange.subscribe(function (x) { return console.log('obsString change', x); });
    obsString.set('another string');
    obsString.set('11');
    expect(obsString.get()).toEqual('11');
    expect((0, Functions_1.checkIfObservable)(obsString)).toBeTruthy();
    var array = [];
    var obsArray = (0, Functions_1.createObservable)(array);
    obsArray.eventOnChange.subscribe(function (x) { return console.log('obsArray change', x); });
    obsArray.push(0);
    obsArray.push(2);
    obsArray[1] = 3;
    expect(obsArray[1]).toEqual(3);
    expect((0, Functions_1.checkIfObservable)(obsArray)).toBeTruthy();
    var map = new Map();
    var obsMap = (0, Functions_1.createObservable)(map);
    obsMap.eventOnChange.subscribe(function (k, v) { return console.log('obsMap change', k, v); });
    obsMap.set('one', 100);
    obsMap.set('two', 200);
    expect(obsMap.get('one')).toEqual(100);
    expect(obsMap.get('three')).toEqual(undefined);
    expect((0, Functions_1.checkIfObservable)(obsMap)).toBeTruthy();
});
