import { TypeEvent } from '@lexriver/type-event';
import { Observable } from './Observable';
type ActionOnChange<T> = (newValue: T, prevValue?: T) => void;
export declare class ObservableVariable<T> implements Observable {
    protected value: T;
    eventOnChange: TypeEvent<ActionOnChange<T>>;
    constructor(value: T);
    set(value: T): void;
    setByPrevious(setter: (oldValue: T) => T): void;
    get(): T;
}
export {};
