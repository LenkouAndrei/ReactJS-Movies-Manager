import React, { ReactChild } from "react";
import "./wrapper.component.scss";

export const Wrapper = ({children}: { children: ReactChild }) => <div className="wrapper">
    {children}
</div>;