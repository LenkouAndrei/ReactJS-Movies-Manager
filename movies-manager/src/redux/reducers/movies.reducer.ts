import { MoviesAction } from '../actions/movies.action';
import { IAction, IMovie, IMoviesStoreConfig } from '../../types/types';
const dataMovies = require('../../data.json');

const initMoviesState: IMoviesStoreConfig = {
    movies: dataMovies,
    isLoading: true,
    error: null,
};

export function moviesReducer(
    state: IMoviesStoreConfig = initMoviesState,
    action: IAction<MoviesAction>
): IMoviesStoreConfig {
    switch (action.type) {
        case MoviesAction.CREATE_MOVIE_SUCCESS:
            return {
                ...state,
                movies: [ ...state.movies, action.payload ],
                isLoading: false,
                error: null,
            };
        case MoviesAction.GET_MOVIES_SUCCESS:
            return {
                ...state,
                movies: action.payload,
                isLoading: false,
                error: null,
            };
        case MoviesAction.DELETE_MOVIE_SUCCESS:
            return {
                ...state,
                movies: state.movies.filter((movie) => movie.id !== action.payload),
                isLoading: false,
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
                error: null,
            };
        case MoviesAction.GET_MOVIES:
        case MoviesAction.UPDATE_MOVIE:
        case MoviesAction.DELETE_MOVIE:
        case MoviesAction.CREATE_MOVIE:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case MoviesAction.UPDATE_MOVIE_FAIL:
        case MoviesAction.GET_MOVIES_FAIL:
        case MoviesAction.DELETE_MOVIE_FAIL:
        case MoviesAction.CREATE_MOVIE_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}