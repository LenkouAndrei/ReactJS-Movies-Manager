import React from 'react';
import { IMovie } from '../../types/types';
import './details.scss';

const blockName = 'details';

const movie: IMovie = {
    'id': 337167,
    'title': 'Fifty Shades Freed',
    'tagline': 'Don\'t miss the climax',
    'vote_average': 6.1,
    'vote_count': 1195,
    'release_date': '2018-02-07',
    'poster_path': 'https://image.tmdb.org/t/p/w500/3kcEGnYBHDeqmdYf8ZRbKdfmlUy.jpg',
    'overview': 'Believing they have left behind shadowy figures from their past, newlyweds Christian and Ana fully embrace an inextricable connection and shared life of luxury. But just as she steps into her role as Mrs. Grey and he relaxes into an unfamiliar stability, new threats could jeopardize their happy ending before it even begins.',
    'budget': 55000000,
    'revenue': 136906000,
    'genres': [
        'Drama',
        'Romance'
    ],
    'runtime': 106
};

type TDetails = (props: IMovie) => JSX.Element;

export const Details: TDetails = ({
    title,
    poster_path,
    vote_average,
    tagline,
    release_date,
    runtime,
    overview}: IMovie) => {
    return <article className={blockName}>
        <img
            className={`${blockName}__image`}
            src={poster_path}
            alt={title}/>
        <div className={`${blockName}__info`}>
            <h2 className={`${blockName}__headline`}>
                <span className={`${blockName}__title`}>{ title }</span>
                <span className={`${blockName}__rate`}>{ vote_average }</span>
            </h2>
            <div className={`${blockName}__tag`}>{ tagline }</div>
            <div className={`${blockName}__terms-container`}>
                <span className={`${blockName}__release`}>{ new Date(release_date).getFullYear() }</span>
                <span className={`${blockName}__duration`}>{ `${runtime} min` }</span>
            </div>
            <p className={`${blockName}__description`}>{ overview }</p>
        </div>
    </article>;
};