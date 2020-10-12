import React, { ChangeEvent, Dispatch, FormEvent, useState } from 'react';
import { connect } from 'react-redux';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormSelect } from '../../components';
import { IMovie, IStoreState } from '../../types/types';
import { createMovieFromServer, editMovieFromServer } from '../../redux/thunks/movies-thunks';
import './form-page.scss';
import { defaultMovie } from './mockDefaultMovie';

interface ISaveChanges {
    movie: IMovie;
    onSaveChanges: () => void;
    createMovie(movie: IMovie): void;
    editMovie(movie: IMovie): void;
}

type THandleSubmit = (event: FormEvent) => void;
type THandleChange = (event: ChangeEvent<HTMLInputElement>) => void;
type TUpdateGenres = (newGenres: string[]) => void;
type TResetState = () => void;

const blockName = 'form';

const url = 'https://image.tmdb.org/t/p/w500/ylXCdC106IKiarftHkcacasaAcb.jpg';

function FormPage({ movie, onSaveChanges, createMovie, editMovie }: ISaveChanges): JSX.Element {
    const startState: IMovie = { ...defaultMovie, ...movie};
    const [ movieInfo, setMovieInfo ] = useState({ ...defaultMovie, ...movie});

    const handleChange: THandleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = target;
        setMovieInfo({ ...movieInfo, [name]: value });
    };

    const handleNumberChange: THandleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = target;
        setMovieInfo({ ...movieInfo, [name]: +value });
    };

    const updateGenres: TUpdateGenres = (newGenres: string[]) => {
        setMovieInfo({ ...movieInfo, genres: newGenres });
    };

    const handleSubmit: THandleSubmit = (event: FormEvent) => {
        event.preventDefault();
        movieInfo.tagline = movieInfo.tagline || movieInfo.title;
        movieInfo.poster_path = movieInfo.poster_path || url;
        const method = movieInfo.id ? editMovie : createMovie;
        method(movieInfo);
        onSaveChanges();
    };

    const resetState: TResetState = () => {
        setMovieInfo({ ...startState });
    };

    const movieIdField: JSX.Element | undefined = movieInfo.id && <div className={`${blockName}__field-wrapper`}>
        <div className={`${blockName}__title`}>movie id</div>
        <div className={`${blockName}__text`}>{movieInfo.id}</div>
    </div>;

    return <form
        className={blockName}
        onSubmit={handleSubmit}>
        <h2 className={`${blockName}__headline`}>Edit Movie</h2>
        { movieIdField }
        <div className={`${blockName}__field-wrapper`}>
            <label
                htmlFor='title'
                className={`${blockName}__label`}>title</label>
            <input
                id='title'
                className={`${blockName}__input`}
                name='title'
                type='text'
                value={movieInfo.title}
                onChange={handleChange}/>
        </div>
        <div className={`${blockName}__field-wrapper`}>
            <label
                htmlFor='releaseDate'
                className={`${blockName}__label`}>release date</label>
            <input
                id='releaseDate'
                className={`${blockName}__input`}
                name='release_date'
                type='text'
                value={movieInfo.release_date}
                onChange={handleChange}/>
            <FontAwesomeIcon
                className={`${blockName}__icon--bright`}
                icon={faCalendar}/>
        </div>
        <div className={`${blockName}__field-wrapper`}>
            <label
                htmlFor='movieUrl'
                className={`${blockName}__label`}>movie url</label>
            <input
                id='movieUrl'
                className={`${blockName}__input`}
                name='poster_path'
                type='text'
                value={movieInfo.poster_path || url}
                onChange={handleChange}/>
        </div>
        <div className={`${blockName}__field-wrapper`}>
            <div className={`${blockName}__title`}>genre</div>
            <FormSelect
                onApplyGenres={updateGenres}
                genres={movieInfo.genres}/>
        </div>
        <div className={`${blockName}__field-wrapper`}>
            <label
                htmlFor='overview'
                className={`${blockName}__label`}>overview</label>
            <input
                id='overview'
                className={`${blockName}__input`}
                name='overview'
                type='text'
                value={movieInfo.overview}
                onChange={handleChange}/>
        </div>
        <div className={`${blockName}__field-wrapper`}>
            <label
                htmlFor='runtime'
                className={`${blockName}__label`}>runtime</label>
            <input
                id='runtime'
                className={`${blockName}__input`}
                name='runtime'
                type='text'
                value={movieInfo.runtime}
                onChange={handleNumberChange}/>
        </div>
        <div className={`${blockName}__btn-wrapper`}>
            <button
                onClick={resetState}
                className={`${blockName}__btn--reset`}>
                    Reset
            </button>
            <input
                className={`${blockName}__btn--save`}
                type='submit'
                value='Save' />
        </div>
    </form>;
}

const mapStateToProps = (_state: IStoreState, ownProps: ISaveChanges) => {
    return {
      ...ownProps,
    };
};

const dispatchToProps = ((dispatch: Dispatch<any>) => {
    return {
        createMovie: (movie: IMovie) => { dispatch(createMovieFromServer(movie)); },
        editMovie: (movie: IMovie) => { dispatch(editMovieFromServer(movie)); },
    };
});

const FormPageWithState = connect(mapStateToProps, dispatchToProps)(FormPage);

export { FormPageWithState };