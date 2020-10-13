import { IMovie } from '../../types/types';

export enum MoviesAction {
    CREATE_MOVIE = 'CREATE_MOVIE',
    CREATE_MOVIE_SUCCESS = 'CREATE_MOVIE_SUCCESS',
    CREATE_MOVIE_FAIL = 'CREATE_MOVIE_FAIL',
    DELETE_MOVIE = 'DELETE_MOVIE',
    DELETE_MOVIE_SUCCESS = 'DELETE_MOVIE_SUCCESS',
    DELETE_MOVIE_FAIL = 'DELETE_MOVIE_FAIL',
    UPDATE_MOVIE = 'UPDATE_MOVIE',
    UPDATE_MOVIE_FAIL = 'UPDATE_MOVIE_FAIL',
    UPDATE_MOVIE_SUCCESS = 'UPDATE_MOVIE_SUCCESS',
    TOGGLE_MOVIE_MENU_VISIBILITY = 'TOGGLE_MOVIE_MENU_VISIBILITY',
    GET_MOVIES = 'GET_MOVIES',
    GET_MOVIES_SUCCESS = 'GET_MOVIES_SUCCESS',
    GET_MOVIES_FAIL = 'GET_MOVIES_FAIL',
}

export type TMovieActionCreator<T> = (arg?: T) => {
    type: MoviesAction,
    payload?: T;
};

export interface IMovieAction<T> {
    type: MoviesAction;
    payload?: T;
}

export const getMovies: TMovieActionCreator<undefined> = () => ({
    type: MoviesAction.GET_MOVIES,
});

export const getMoviesSuccess: TMovieActionCreator<IMovie[]> = (movies: IMovie[]) => ({
    type: MoviesAction.GET_MOVIES_SUCCESS,
    payload: movies,
});

export const getMoviesFail: TMovieActionCreator<Error> = (error: Error) => ({
    type: MoviesAction.GET_MOVIES_FAIL,
    payload: error
});

export const deleteMovie: TMovieActionCreator<undefined> = () => ({
    type: MoviesAction.DELETE_MOVIE,
});

export const deleteMovieFail: TMovieActionCreator<Error> = (error: Error) => ({
    type: MoviesAction.DELETE_MOVIE_FAIL,
    payload: error
});

export const deleteMovieSuccess: TMovieActionCreator<number> = (id: number) => ({
    type: MoviesAction.DELETE_MOVIE_SUCCESS,
    payload: id
});

export const createMovie: TMovieActionCreator<undefined> = () => ({
    type: MoviesAction.CREATE_MOVIE
});

export const createMovieFail: TMovieActionCreator<Error> = (error: Error) => ({
    type: MoviesAction.CREATE_MOVIE_FAIL,
    payload: error
});

export const createMovieSuccess: TMovieActionCreator<IMovie> = (movie: IMovie) => ({
    type: MoviesAction.CREATE_MOVIE_SUCCESS,
    payload: movie
});

export const updateMovie: TMovieActionCreator<undefined> = () => ({
    type: MoviesAction.UPDATE_MOVIE,
});

export const updateMovieSuccess: TMovieActionCreator<IMovie> = (movie: IMovie) => ({
    type: MoviesAction.UPDATE_MOVIE_SUCCESS,
    payload: movie
});

export const updateMovieFail: TMovieActionCreator<Error> = (error: Error) => ({
    type: MoviesAction.UPDATE_MOVIE_FAIL,
    payload: error
});