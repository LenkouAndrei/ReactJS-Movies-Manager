import { MoviesAction } from '../actions/movies.action';
import { IAction, IMovie, TNullable } from '../../types/types';
const dataMovies = require('../../data.json');

interface IMoviesState {
    movies: IMovie[];
    isLoading: boolean;
    isLoaded: boolean;
    error: TNullable<Error>;
}

const initMoviesState: IMoviesState = {
    movies: dataMovies,
    isLoading: true,
    isLoaded: false,
    error: null,
}

export function moviesReducer(state = initMoviesState, action: IAction<MoviesAction>) {
    switch (action.type) {
        case MoviesAction.ADD_MOVIE_SUCCESS:
            return {
                ...state,
                movies: [ ...state.movies, action.payload ],
                isLoading: false,
                isLoaded: true,
                error: null,
            } as IMoviesState;
        case MoviesAction.GET_MOVIES_SUCCESS:
            return {
                ...state,
                movies: action.payload,
                isLoading: false,
                isLoaded: true,
                error: null,
            } as IMoviesState;
        case MoviesAction.DELETE_MOVIE_SUCCESS:
            return {
                ...state,
                movies: state.movies.filter((movie) => movie.id !== action.payload),
                isLoading: false,
                isLoaded: true,
                error: null,
            };
        case MoviesAction.UPDATE_MOVIE_SUCCESS:
            const moviesCopy = [ ...state.movies ];
            const editElIdx = moviesCopy.findIndex(({ id }: IMovie) => id === action.payload.id);
            moviesCopy[editElIdx] = action.payload;
            return {
                ...state,
                movies: moviesCopy,
                isLoading: false,
                isLoaded: true,
                error: null,
            };
        case MoviesAction.GET_MOVIES:
        case MoviesAction.UPDATE_MOVIE:
        case MoviesAction.DELETE_MOVIE:
        case MoviesAction.ADD_MOVIE:
            return {
                ...state,
                isLoading: true,
                isLoaded: false,
                error: null,
            };
        case MoviesAction.UPDATE_MOVIE_FAIL:
        case MoviesAction.GET_MOVIES_FAIL:
        case MoviesAction.DELETE_MOVIE_FAIL:
        case MoviesAction.ADD_MOVIE_FAIL:
            return {
                ...state,
                isLoading: false,
                isLoaded: true,
                error: action.payload,
            };
        default:
            return state;
    }
};