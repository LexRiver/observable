"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObservableValue = void 0;
var type_event_1 = require("@lexriver/type-event");
var ObservableValue = /** @class */ (function () {
    function ObservableValue(value) {
        this.value = value;
        this.eventOnChange = new type_event_1.TypeEvent();
    }
    ObservableValue.prototype.set = function (value) {
        // if(this.validateFunction){
        //     if(this.validateFunction(value) == false){
        //         const errorMessage = 'Observable: set failed: validateFunction() returns false'
        //         this.eventOnError.triggerAsync(errorMessage, 'value=', value)
        //         throw new Error(errorMessage)
        //     }
        // }
        var prevValue = this.value;
        this.value = value;
        this.eventOnChange.triggerAsync(this.value, prevValue);
    };
    ObservableValue.prototype.setByPrevious = function (setter) {
        var prevValue = this.value;
        var newValue = setter(this.value);
        // if(this.validateFunction && this.validateFunction(newValue) == false){
        //     const errorMessage = 'Observable: setByPrevious failed: validateFunction() returns false'
        //     this.eventOnError.triggerAsync(errorMessage, 'newValue=', newValue)
        //     throw new Error(errorMessage)
        // }
        this.value = newValue;
        // if(this.keepHistory){
        //     this.history.push({datetime:new Date(), value:newValue, comment})
        // }
        this.eventOnChange.triggerAsync(this.value, prevValue);
    };
    ObservableValue.prototype.get = function () {
        return this.value;
    };
    return ObservableValue;
}());
exports.ObservableValue = ObservableValue;
