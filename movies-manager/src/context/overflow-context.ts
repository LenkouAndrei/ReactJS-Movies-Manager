import { createContext } from "react";

export const overflows = {
    hidden: {
        overflow: 'hidden',
    },
    inherit: {
        overflow: 'inherit',
    }
};

export const OverflowContext = createContext({
    overflow: overflows.inherit,
    setOverflow: (className: string): void => {},
});