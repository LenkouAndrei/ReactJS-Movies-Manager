import React, { Dispatch, MouseEvent } from 'react';
import { connect } from 'react-redux';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import './movie-form.scss';
import { ICheckboxGenre, IMovie, IStoreState, IMovieInfo } from '../../types/types';
import { InputControl } from '../../components/input-control/input-control';
import { SelectControl } from '../../components/select-control/select-control';
import { createMoviesFromServer, editMoviesFromServer } from '../../service/movies.service';
import { defaultMovie } from './mockDefaultMovie';
import { allGenres } from '../../utils/variables';

interface ISaveChanges {
    movie?: IMovie;
    onSaveChanges: () => void;
    createMovie(movie: IMovie): void;
    editMovie(movie: IMovie): void;
}

type THandleSubmit = (movieInfo: IMovie) => void;
type TResetForm = () => void;
type TResetHandlerWrapper = (resetForm: TResetForm) => (e: MouseEvent) => void;

const blockName = 'form-test';

enum FORM_HEADLINES {
    EDIT_MOVIE = 'Edit Movie',
    ADD_MOVIE = 'Add Movie',
}

function MovieForm({
    movie = defaultMovie,
    onSaveChanges,
    createMovie,
    editMovie
}: ISaveChanges): JSX.Element {
    const handleSubmit: THandleSubmit = (movieInfo: IMovie) => {
        const method = movieInfo.id ? editMovie : createMovie;
        method(movieInfo);
        onSaveChanges();
    };

    const resetMovieForm: TResetHandlerWrapper = (resetForm: TResetForm) => (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        resetForm();
    };

    const availableGenres = Array.from(new Set([...allGenres, ...movie.genres]));
    const genres = availableGenres.map((genre: string) => ({
        label: genre,
        isChecked: movie.genres.includes(genre),
    }));

    const movieIdField: JSX.Element | undefined = movie.id && <div className={`${blockName}__field-wrapper`}>
        <div className={`${blockName}__title`}>movie id</div>
        <div className={`${blockName}__text`}>{movie.id}</div>
    </div>;

    const icoCalendar: JSX.Element = <FontAwesomeIcon
        className='input-control__icon--bright'
        icon={faCalendar}/>;

    return <Formik
        initialValues={{ ...movie, genres }}
        validationSchema={Yup.object({
            title: Yup.string()
                .min(3, 'Must be 3 characters or more')
                .required('Required'),
            release_date: Yup.string()
                .matches(
                    /(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])/,
                    // tslint:disable-next-line
                    'Must be in a "YYYY-MM-DD" format'
                )
                .required('Required'),
            poster_path: Yup.string()
                .matches(
                    /^(?:(?<scheme>[^:\/?#]+):)?(?:\/\/(?<authority>[^\/?#]*))?(?<path>[^?#]*\/)?(?<file>[^?#]*\.(?<extension>[Jj][Pp][Ee]?[Gg]|[Pp][Nn][Gg]|[Gg][Ii][Ff]))(?:\?(?<query>[^#]*))?(?:#(?<fragment>.*))?$/,
                    'Must be in a predefine format'
                )
                .required('Required'),
            overview: Yup.string()
                .min(5, 'Tesxt should be in a range from 5 to 250 symbols')
                .max(500, 'Tesxt should be in a range from 10 to 500 symbols')
                .required('Required'),
            genres: Yup.array()
                .of(
                    Yup.object().shape({
                        label: Yup.string(),
                        isChecked: Yup.boolean(),
                    })
                )
                .compact((v: ICheckboxGenre) => !v.isChecked)
                .min(1, 'Must be chosen 1 genre or more')
                .required('Required'),
            runtime: Yup.number()
                .integer('Must be integer')
                .required('Required'),
        })}
        onSubmit={(values: IMovieInfo<ICheckboxGenre[]>) => {
            setTimeout(
                () => {
                    const chosenGenres = values.genres
                        .filter((genre: ICheckboxGenre) => genre.isChecked)
                        .map(({ label }: ICheckboxGenre) => label);
                    handleSubmit({...values, genres: chosenGenres});
                },
                400
            );
        }}
    >
    {formik => (
        <Form
            className={blockName}
            onSubmit={formik.handleSubmit}>
            <h2 className={`${blockName}__headline`}>
                {movie.id && FORM_HEADLINES.EDIT_MOVIE || FORM_HEADLINES.ADD_MOVIE}
            </h2>
            { movieIdField }
            <InputControl
                label='Title'
                name='title'
            />
            <InputControl
                label='release date'
                name='release_date'
                icon={icoCalendar}
            />
            <InputControl
                label='movie url'
                name='poster_path'
            />
            <SelectControl
                headline='genres'
                name='genres'/>
            <InputControl
                label='overview'
                name='overview'
            />
            <InputControl
                label='runtime'
                name='runtime'
                type='number'
            />
            <div className={`${blockName}__btn-wrapper`}>
                <button
                    className={`${blockName}__btn--reset`}
                    type='reset'
                    onClick={resetMovieForm(formik.resetForm)}> Reset </button>
                <input
                    className={`${blockName}__btn--save`}
                    type='submit'
                    value='Save'
                    disabled={!formik.dirty || !formik.isValid}/>
            </div>
        </Form>)}
    </Formik>;
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

const MovieFormWithState = connect(mapStateToProps, dispatchToProps)(MovieForm);

export { MovieFormWithState };