"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObservableLocalStorageVariable = void 0;
var type_event_1 = require("@lexriver/type-event");
var filename = '[ObservableLocalStorageVariable]:';
/**
 * 1) set -> saves to localStorage if new
 * 2) localStorage-change events popups -> onChangeEvents triggers
 * 3) onChangeEvents sets current local variable
 */
var ObservableLocalStorageVariable = /** @class */ (function () {
    function ObservableLocalStorageVariable(p) {
        this.p = p;
        //protected observableVariable:Observable<T|undefined>
        //protected localStorageKey:string
        this.currentValue = undefined;
        this.eventOnChange = new type_event_1.TypeEvent();
        this.assignCurrentValue();
        this.subscribeToWindowEvent();
    }
    ObservableLocalStorageVariable.prototype.subscribeToWindowEvent = function () {
        var _this = this;
        // warning: 'storage' event is not firing if changes were made on this page !!!!!!!!
        window.addEventListener('storage', function (e) {
            //console.log('localStorage change event from another window, e=', e)
            // e.key: "productDisplayType"
            // e.newValue: ""tiles""
            // e.oldValue: ""list""
            if (e.key != _this.p.localStorageKey)
                return;
            var oldValue = _this.currentValue;
            _this.assignCurrentValue();
            _this.eventOnChange.triggerAsync(_this.currentValue, oldValue);
        });
    };
    ObservableLocalStorageVariable.prototype.get = function () {
        return this.currentValue;
    };
    ObservableLocalStorageVariable.prototype.set = function (value) {
        var valueToPut = JSON.stringify(value);
        var valueInLocalStorageAsString = window.localStorage.getItem(this.p.localStorageKey);
        if (valueToPut !== valueInLocalStorageAsString) {
            var prevValue = this.currentValue;
            window.localStorage.setItem(this.p.localStorageKey, valueToPut); // event is not triggered for current window
            this.assignCurrentValue();
            this.eventOnChange.triggerAsync(value, prevValue);
        }
    };
    ObservableLocalStorageVariable.prototype.getValueFromLocalStorage = function () {
        var valueInLocalStorageAsString = window.localStorage.getItem(this.p.localStorageKey);
        if (valueInLocalStorageAsString == null || valueInLocalStorageAsString === "undefined") {
            // we have no value, let's remove this item
            window.localStorage.removeItem(this.p.localStorageKey);
            return undefined;
        }
        return valueInLocalStorageAsString;
    };
    ObservableLocalStorageVariable.prototype.assignCurrentValue = function () {
        this.currentValue = this.p.defaultValueIfNotInLocalStorage || undefined;
        var stringValue = this.getValueFromLocalStorage();
        if (stringValue) {
            try {
                this.currentValue = JSON.parse(stringValue);
            }
            catch (x) {
                console.warn('unable to parse', stringValue);
            }
        }
    };
    return ObservableLocalStorageVariable;
}());
exports.ObservableLocalStorageVariable = ObservableLocalStorageVariable;
