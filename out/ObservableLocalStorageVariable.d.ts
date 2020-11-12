import { TypeEvent } from "@lexriver/type-event";
import { Observable } from "./Observable";
/**
 * 1) set -> saves to localStorage if new
 * 2) localStorage-change events popups -> onChangeEvents triggers
 * 3) onChangeEvents sets current local variable
 */
export declare class ObservableLocalStorageVariable<T> implements Observable {
    protected p: {
        localStorageKey: string;
        defaultValueIfNotInLocalStorage?: T;
    };
    protected currentValue: T | undefined;
    eventOnChange: TypeEvent<(newValue?: T, oldValue?: T) => void>;
    constructor(p: {
        localStorageKey: string;
        defaultValueIfNotInLocalStorage?: T;
    });
    protected subscribeToWindowEvent(): void;
    get(): T | undefined;
    set(value: T | undefined): void;
    protected getValueFromLocalStorage(): string | undefined;
    protected assignCurrentValue(): void;
}
