import { TypeEvent } from "@lexriver/type-event";
export interface Observable {
    eventOnChange: TypeEvent<(...args: any) => void>;
}
