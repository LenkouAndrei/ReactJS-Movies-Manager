import { createContext } from "react";
import { TOutsideClick } from "../types/types";

export const OutsideClickContext = createContext({
    setOutsideClickHandler: (callback: TOutsideClick) => {},
});
