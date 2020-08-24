import React from "react";
import "./result-filter.component.scss";

interface IResultFilterProps {
    genres: string[];
}

const blockName = 'result-filter';
let chosenTab: string;

export const ResultFilter = ({ genres }: IResultFilterProps) => {
    chosenTab = genres[0];
    const listItems = genres.map((title: string, idx: number) => {
        return <li
            className={`${blockName}__item`}
            key={title}>
                <button
                    className={`${blockName}__btn  ${chosenTab === title ? 'highlight' : ''}`}
                    onClick={() => chosenTab = title}>{title}</button>
            </li>
    });
    return <ul className={`${blockName}__list`}>{listItems}</ul>
};