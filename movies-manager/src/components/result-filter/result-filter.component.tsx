import React from "react";
import "./result-filter.component.scss";

interface IResultFilterProps {
    genres: string[];
}

const blockName = 'result-filter';

export const ResultFilter = ({ genres }: IResultFilterProps) => {
    const listItems = genres.map((title: string) => {
        return <li
            className={`${blockName}__item`}
            key={title}>
                <button className={`${blockName}__btn`}>{title}</button>
            </li>
    });
    return <ul className={`${blockName}__list`}>{listItems}</ul>
};