"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
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
Object.defineProperty(exports, "__esModule", { value: true });
var ObservableMap_1 = require("./ObservableMap");
test('map', function () {
    var myMapO = new ObservableMap_1.ObservableMap();
    var counter = 0;
    myMapO.eventOnChange.subscribe(function (k, v) {
        console.log('k=', k, 'v=', v);
        counter++;
    });
    myMapO.set('one', 1);
    expect(myMapO.get('one')).toEqual(1);
    expect(counter).toEqual(1);
});
test('ctor', function () {
    var myMapO = new ObservableMap_1.ObservableMap([['first', 1], ['second', 2]]);
    expect(myMapO.get('second')).toEqual(2);
});
test('entries', function () {
    var e_1, _a;
    var myMapO = new ObservableMap_1.ObservableMap([['first', 1], ['second', 2]]);
    var counter = 0;
    try {
        for (var _b = __values(myMapO.entries()), _c = _b.next(); !_c.done; _c = _b.next()) {
            var _d = __read(_c.value, 2), k = _d[0], v = _d[1];
            counter += v;
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    expect(counter).toEqual(3);
});
test('forEach', function () {
    var myMapO = new ObservableMap_1.ObservableMap([['first', 1], ['second', 2]]);
    var counter = 0;
    myMapO.forEach(function (value, key) {
        counter += value;
    });
    expect(counter).toEqual(3);
});
