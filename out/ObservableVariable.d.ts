import { Observable } from './Observable';
export declare class ObservableVariable<T> implements Observable {
    protected value: T;
    eventOnChange: any;
    constructor(value: T);
    set(value: T): void;
    setByPrevious(setter: (oldValue: T) => T): void;
    get(): T;
}
