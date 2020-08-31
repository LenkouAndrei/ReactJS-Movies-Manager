import React, { ChangeEvent, Component, useState } from 'react';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormSelect } from '../../components';
import { IMovie } from '../../types/types';
import './form-page.component.scss';

interface ISaveChanges {
    movie: IMovie;
    onSaveChanges: (editableMovie: IMovie) => void;
}

interface IFormPageState extends IMovie {
    [key: string]: string | number | string[];
}

type THandleSubmit = (event: React.FormEvent) => void;
type THandleChange = (event: ChangeEvent<HTMLInputElement>) => void;
type TUpdateGenres = (newGenres: string[]) => void;
type TResetState = () => void;

const blockName = 'form';

const defaultMovie: IMovie = {
    title: 'Title here',
    tagline: '',
    vote_average: 0,
    vote_count: 0,
    release_date: 'Select date',
    poster_path: '',
    overview: 'Overview here',
    budget: 0,
    revenue: 0,
    genres: [],
    runtime: 0,
};

const url = '';

export function FormPage(props: ISaveChanges): JSX.Element {
    const startState: IMovie = { ...defaultMovie, ...props.movie};
    const [ movieInfo, setMovieInfo ] = useState({ ...defaultMovie, ...props.movie});

    const handleChange: THandleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = target;
        if (name === 'url') {
            return;
        }

        setMovieInfo({ ...movieInfo, [name]: value });
    };

    const updateGenres: TUpdateGenres = (newGenres: string[]) => {
        setMovieInfo({ ...movieInfo, genres: newGenres });
    };

    const handleSubmit: THandleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        props.onSaveChanges(movieInfo);
    };

    const resetState: TResetState = () => {
        setMovieInfo({ ...startState });
    };

    const genres: JSX.Element[] = movieInfo.genres.map((genre: string) => {
        return <option
            key={genre}
            value={genre}>{ genre }</option>;
    });

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
                name='url'
                type='text'
                value={url || 'Url here'}
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
                onChange={handleChange}/>
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