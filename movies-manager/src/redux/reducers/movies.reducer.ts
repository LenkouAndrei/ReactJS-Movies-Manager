import { MoviesAction } from '../actions/movies.action';
import { IAction, IMovie } from '../../types/types';
const dataMovies = require('../../data.json');

export function moviesReducer(state: IMovie[] = dataMovies, action: IAction<MoviesAction>) {
    switch (action.type) {
        case MoviesAction.TOGGLE_MOVIE_MENU_VISIBILITY: 
            return state.map((movie, index) => {
                return (index === action.payload) ? {
                    ...movie,
                    isMenuVisible: (!movie as any).isMenuVisible,
                } : movie;
            });
        case MoviesAction.ADD_MOVIE:
            return [ 
                ...state,
                action.payload,
            ];
        case MoviesAction.GET_MOVIES_SUCCESS:
            return action.payload;
        case MoviesAction.DELETE_MOVIE_SUCCESS:
            return state.filter((movie) => movie.id !== action.payload);
        case MoviesAction.GET_MOVIES:
        case MoviesAction.GET_MOVIES_FAIL:
        case MoviesAction.DELETE_MOVIE:
        case MoviesAction.DELETE_MOVIE_FAIL:
        default:
            return state    
    }
};