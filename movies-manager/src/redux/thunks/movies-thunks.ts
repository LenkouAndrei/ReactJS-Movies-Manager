import {
    getMoviesSuccess,
    getMoviesFail,
    getMovies,
    deleteMovieFail,
    deleteMovieSuccess,
    deleteMovie,
    updateMovie,
    updateMovieSuccess,
    updateMovieFail,
    createMovie,
    createMovieSuccess,
    createMovieFail,
    IMovieAction,
} from '../actions/movies.action';
import { IDetailsAction, setDetails } from '../actions/details.actions';
import { store } from '../store/store';
import { IMovie, IQueryParams, TNullable } from '../../types/types';
import { Dispatch } from 'react';

const url = 'http://localhost:4000';
const defaultQueryParams: IQueryParams = {
    filter: '',
    sortBy: '',
    sortOrder: 'desc',
    offset: '0',
    limit: '20',
    searchBy: 'title',
};

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
};

function handleResponse(res: Response): Promise<any> | never {
    if (res.ok) {
        return res.json();
    }
    throw res;
}

export const getMoviesFromServer =
    (queryParams: IQueryParams = {}) =>
    (dispatch: Dispatch<IMovieAction<Error | undefined | IMovie[]>>) => {
    dispatch(getMovies());

    const requestQuery = new URLSearchParams({ ...defaultQueryParams, ...queryParams });

    fetch(`${url}/movies?${requestQuery.toString()}`)
        .then(handleResponse)
        .then((parsedRes: any) => dispatch(getMoviesSuccess(parsedRes.data as IMovie[])))
        .catch((err: Error) => dispatch(getMoviesFail(err)));
};

export const deleteMoviesFromServer = (id: number) =>
    (dispatch: Dispatch<IMovieAction<Error | undefined | number> | IDetailsAction<TNullable<IMovie>>>) => {
    dispatch(deleteMovie());

    fetch(`${url}/movies/${id}`)
        .then(handleResponse)
        .then((res: IMovie) => {
            dispatch(deleteMovieSuccess(res.id));
            const { details } = store.getState();
            if (details && details.id === res.id) {
                dispatch(setDetails(null));
            }
        })
        .catch((err: Error) => dispatch(deleteMovieFail(err)));
};

export const createMovieFromServer =
    (movie: IMovie) =>
    (dispatch: Dispatch<IMovieAction<Error | undefined | IMovie>>) => {
    dispatch(createMovie());

    const initRequest: RequestInit = {
        method: 'POST',
        headers,
        body: JSON.stringify(movie),
    };

    fetch(`${url}/movies`, initRequest)
        .then(handleResponse)
        .then((res: IMovie) => dispatch(createMovieSuccess(res)))
        .catch((err: Error) => dispatch(createMovieFail(err)));
};

export const editMovieFromServer = (movie: IMovie) =>
(dispatch: Dispatch<IMovieAction<Error | undefined | IMovie> | IDetailsAction<TNullable<IMovie>>>) => {
    dispatch(updateMovie());
    const initRequest: RequestInit = {
        method: 'PUT',
        headers,
        body: JSON.stringify({
            ...movie,
            runtime: +movie.runtime,
        }),
    };

    fetch(`${url}/movies`, initRequest)
        .then(handleResponse)
        .then((res: IMovie) => {
            dispatch(updateMovieSuccess(res));
            const { details } = store.getState();
            if (details && details.id === res.id) {
                dispatch(setDetails(res));
            }
        })
        .catch((err: Error) => dispatch(updateMovieFail(err)));
};