import React from "react";
import "./result-filter.component.scss";
import { IMoviesGenresConfig, TGenresListItem } from '../../types/types';

interface IResultFilterProps extends IMoviesGenresConfig{
	onGenreClick: (genre: TGenresListItem) => void,
}

const blockName = 'result-filter';

export const ResultFilter = ({ genres, currentGenre, onGenreClick }: IResultFilterProps) => {
    const listItems = genres.map(title => {
        return <li
            className={`${blockName}__item`}
            key={title}>
                <button
                    className={`${blockName}__btn  ${currentGenre === title ? 'highlight' : ''}`}
                    onClick={() => onGenreClick(title)}>{title}</button>
            </li>
    });
    return <ul className={`${blockName}__list`}>{listItems}</ul>
};