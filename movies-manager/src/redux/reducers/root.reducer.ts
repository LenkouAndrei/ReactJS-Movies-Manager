import { combineReducers } from 'redux';
import { moviesReducer } from './movies.reducer';
import { sortByFilterReducer } from './sortByFilter.reducer';
import { visibilityFilterReducer } from './visibilityFilter.reducer';


export const rootReducerApp = combineReducers({
    visibilityFilter: visibilityFilterReducer,
    sortByFilter: sortByFilterReducer,
    movies: moviesReducer,
});