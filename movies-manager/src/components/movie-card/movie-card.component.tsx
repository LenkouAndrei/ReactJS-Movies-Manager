import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignJustify } from "@fortawesome/free-solid-svg-icons";
import { IMovieInfo } from "../../types/types";
import "./movie-card.component.scss";

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