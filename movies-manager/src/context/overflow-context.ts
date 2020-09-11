import { createContext } from "react";

export const OverflowContext = createContext({
    setOverflow: (className: string): void => {},
});