import React from "react";
import "./result-sort.component.scss";

interface ISortCategory {
    isActive: boolean;
    title: string;
}

interface IResultSortProps {
    sortSet: ISortCategory[];
}

let isOpen = false;
const blockName = 'result-sort';

const toggleOnCondition = () => {
 if (!isOpen) {
    isOpen = true;
 }
}

export const ResultSort = ({ sortSet }: IResultSortProps) => {
    const currentSortBy = sortSet.find(item => item.isActive).title;
    const listItems = sortSet.map(({ title }: ISortCategory) => {
        return <li
            className={`${blockName}__item`}
            key={title}>
                <button className={`${blockName}__btn`}>{title}</button>
            </li>
    });
    return <>
        <button
            className={`${blockName}__btn untracked`}
            onClick={() => toggleOnCondition()}>{currentSortBy}</button>
        {isOpen && <ul className={`${blockName}__list`}>{listItems}</ul>}
    </>
};