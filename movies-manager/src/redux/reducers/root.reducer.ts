import { combineReducers } from 'redux';
import { moviesReducer } from './movies.reducer';
import { filterReducer } from './filter.reducer';
import { detailsReducer } from './details.reducer';

export const rootReducerApp = combineReducers({
    filters: filterReducer,
    moviesConfig: moviesReducer,
    details: detailsReducer,
});