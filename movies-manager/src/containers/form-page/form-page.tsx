import React, { ChangeEvent, Dispatch, FormEvent, useState } from 'react';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormSelect } from '../../components';
import { IMovie, IMovieInfo, IStoreState } from '../../types/types';
import { createMoviesFromServer, editMoviesFromServer } from '../../service/movies.service';
import './form-page.scss';
import { defaultMovie } from './mockDefaultMovie';

interface ISaveChanges {
    movie: IMovie;
    onSaveChanges: () => void;
    createMovie(movie: IMovie): void;
    editMovie(movie: IMovie): void;
}

interface IValidationErrors {
    title?: string;
    overview?: string;
    runtime?: string;
    genres?: string;
    release_date?: string;
    poster_path?: string;
}

type THandleSubmit = (movieInfo: IMovie) => void;
type THandleChange = (event: ChangeEvent<HTMLInputElement>) => void;
type TUpdateGenres = (newGenres: string[]) => void;
type TResetState = () => void;

const blockName = 'form';

function FormPage({ movie, onSaveChanges, createMovie, editMovie }: ISaveChanges): JSX.Element {
    const handleSubmit: THandleSubmit = (movieInfo: IMovie) => {
        const method = movieInfo.id ? editMovie : createMovie;
        method(movieInfo);
        onSaveChanges();
    };

    const isURL = (str: string) => {
        var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return pattern.test(str);
      }
    // const validate = Yup.object({
    //     title: Yup.string()
    //         .required('"title" is not allowed to be empty'),
    //     overview: Yup.string()
    //         .required('"title" is not allowed to be empty'),
    //     runtime: Yup.number().integer('"runtime" must be an integer'),
    //     genres: Yup.array().min(1, '"genres" does not contain 1 required value(s)'),
        // release_date: Yup.mixed.isValid(isParsedToDate),
        // release_date: Yup.string()
        //     .matches(/(\d{4})-(\d{2})-(\d{2})/, '"release_date" must be in iso format'),
        // poster_path: Yup.string().url('"poster_path" must be a valid uri')
    //   });

    const validate = (values: IMovie) => {
        const errors: IValidationErrors = {};
        if (!values.title) {
            errors.title = '"title" is not allowed to be empty';
        }
      
        if (!values.overview) {
            errors.overview = '"title" is not allowed to be empty';
        }
      
        if (!Number.isInteger(values.runtime)) {
            errors.runtime = '"runtime" must be an integer';
        }

        if (!values.genres.length) {
            errors.genres = '"genres" does not contain 1 required value(s)';
        }

        if (!values.release_date) {
            errors.release_date = '"release_date" must be in iso format';
        }

        if (!isURL(values.poster_path)) {
            errors.poster_path = '"poster_path" must be a valid uri';
        }
      
        return errors;
      };

    const formik = useFormik({
        initialValues: { ...defaultMovie, ...movie},
        validate,
        onSubmit: handleSubmit,
    });
    const startState: IMovie = { ...defaultMovie, ...movie};
    const [ movieInfo, setMovieInfo ] = useState({ ...defaultMovie, ...movie});

    // const handleChange: THandleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    //     const { name, value } = target;
    //     setMovieInfo({ ...movieInfo, [name]: value });
    // };

    // const handleNumberChange: THandleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    //     const { name, value } = target;
    //     setMovieInfo({ ...movieInfo, [name]: +value });
    // };

    const updateGenres: TUpdateGenres = (newGenres: string[]) => {
        setMovieInfo({ ...movieInfo, genres: newGenres });
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
        onSubmit={formik.handleSubmit}>
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
                value={formik.values.title}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}/>
                {formik.touched.title && formik.errors.title ? <div className={`${blockName}__error`}>{formik.errors.title}</div> : null}
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
                value={formik.values.release_date}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}/>
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
                value={formik.values.poster_path}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}/>
                {formik.touched.poster_path && formik.errors.poster_path ? <div className={`${blockName}__error`}>{formik.errors.poster_path}</div> : null}
        </div>
        <div className={`${blockName}__field-wrapper`}>
            <div className={`${blockName}__title`}>genre</div>
            <FormSelect
                onApplyGenres={updateGenres}
                genres={movieInfo.genres}/>
                {formik.touched.genres && formik.errors.genres ? <div className={`${blockName}__error`}>{formik.errors.genres}</div> : null}
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
                value={formik.values.overview}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}/>
                {formik.touched.overview && formik.errors.overview ? <div className={`${blockName}__error`}>{formik.errors.overview}</div> : null}
        </div>
        <div className={`${blockName}__field-wrapper`}>
            <label
                htmlFor='runtime'
                className={`${blockName}__label`}>runtime</label>
            <input
                id='runtime'
                className={`${blockName}__input`}
                name='runtime'
                type='number'
                value={formik.values.runtime}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}/>
                {formik.touched.runtime && formik.errors.runtime ? <div className={`${blockName}__error`}>{formik.errors.runtime}</div> : null}
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
        createMovie: (movie: IMovie) => { dispatch(createMoviesFromServer(movie)); },
        editMovie: (movie: IMovie) => { dispatch(editMoviesFromServer(movie)); },
    };
});

const FormPageWithState = connect(mapStateToProps, dispatchToProps)(FormPage);

export { FormPageWithState };