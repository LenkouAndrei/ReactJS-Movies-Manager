import { IMovie } from "../../types/types";

export enum MoviesAction {
    ADD_MOVIE = 'ADD_MOVIE',
    DELETE_MOVIE = 'DELETE_MOVIE',
    DELETE_MOVIE_SUCCESS = 'DELETE_MOVIE_SUCCESS',
    DELETE_MOVIE_FAIL = 'DELETE_MOVIE_FAIL',
    UPDATE_MOVIE = 'UPDATE_MOVIE',
    TOGGLE_MOVIE_MENU_VISIBILITY = 'TOGGLE_MOVIE_MENU_VISIBILITY',
    GET_MOVIES = 'GET_MOVIES',
    GET_MOVIES_SUCCESS = 'GET_MOVIES_SUCCESS',
    GET_MOVIES_FAIL = 'GET_MOVIES_FAIL',
}

export const getMovies = () => ({
    type: MoviesAction.GET_MOVIES,
});

export const getMoviesSuccess = (movies: IMovie[]) => ({
    type: MoviesAction.GET_MOVIES_SUCCESS,
    payload: movies,
});

export const getMoviesFail = (error: Error) => ({
    type: MoviesAction.GET_MOVIES_FAIL,
    payload: error
});

export const addMovie = (movie: any) => ({
    type: MoviesAction.ADD_MOVIE,
    payload: movie
});

export const deleteMovie = (id: string) => ({
    type: MoviesAction.DELETE_MOVIE,
    payload: id
});

export const deleteMovieFail = (error: Error) => ({
    type: MoviesAction.DELETE_MOVIE_FAIL,
    payload: error
});

export const deleteMovieSuccess = (id: number) => ({
    type: MoviesAction.DELETE_MOVIE_SUCCESS,
    payload: id
});

export const updateMovie = (movie: any) => ({
    type: MoviesAction.UPDATE_MOVIE,
    payload: movie
});

export const toggleMovieMenuVisibilty = (id: string) => ({
    type: MoviesAction.TOGGLE_MOVIE_MENU_VISIBILITY,
    payload: id
});