import React from 'react';
import { connect } from 'react-redux';
import { IMovie, IStoreState, TNullable } from '../../types/types';
import './details.scss';

const blockName = 'details';

type TDetails = ({ movie }: { movie: TNullable<IMovie> }) => JSX.Element;

const Details: TDetails = ({ movie }: { movie: TNullable<IMovie> }) => {
    return movie && <article className={blockName}>
        <img
            className={`${blockName}__image`}
            src={movie.poster_path}
            alt={movie.title}/>
        <div className={`${blockName}__info`}>
            <h2 className={`${blockName}__headline`}>
                <span className={`${blockName}__title`}>{ movie.title }</span>
                <span className={`${blockName}__rate`}>{ movie.vote_average }</span>
            </h2>
            <div className={`${blockName}__tag`}>{ movie.tagline }</div>
            <div className={`${blockName}__terms-container`}>
                <span className={`${blockName}__release`}>
                    { new Date(movie.release_date).getFullYear() }
                </span>
                <span className={`${blockName}__duration`}>{ `${movie.runtime} min` }</span>
            </div>
            <p className={`${blockName}__description`}>{ movie.overview }</p>
        </div>
    </article>;
};

const mapStateToProps = (state: IStoreState) => {
    return {
      movie: state.details,
    };
};

const DetailsWithState = connect(mapStateToProps)(Details);

export { DetailsWithState };