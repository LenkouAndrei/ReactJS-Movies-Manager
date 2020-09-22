import React from "react";
import "./logo.component.scss";

const blockName = 'logo';

export const Logo = () => (<div className={blockName}>
    <span className={`${blockName}__text--bold`}>netflix</span>
    <span className={`${blockName}__text`}>roulette</span>
</div>);