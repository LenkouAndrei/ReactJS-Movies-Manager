import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAlignJustify } from '@fortawesome/free-solid-svg-icons'
import "./movie-card.component.scss";

export interface IMovieInfo {
    title: string;
    tagline: string;
    vote_average: number;
    vote_count: number;
    release_date: string;
    poster_path: string;
    overview: string;
    budget: number;
    revenue: number;
    genres: string[];
    runtime: number;
};

const blockName = 'movie';

export const MovieCard = ({poster_path, title, release_date, genres}: IMovieInfo) => {
    return <figure className={blockName}>
        <img
            className={`${blockName}__image`}
            src={poster_path}
            alt={title}/>
        <figcaption className={`${blockName}__info`}>
            <span className={`${blockName}__title`}>{title}</span>
            <span className={`${blockName}__release-date`}>{release_date}</span>
            <span className={`${blockName}__genres`}>{genres.join(', ')}</span>
            <div className={`${blockName}__settings`}>
                <FontAwesomeIcon
                    className={`${blockName}__icon`}
                    icon={faAlignJustify} />
            </div>
        </figcaption>
    </figure>
};