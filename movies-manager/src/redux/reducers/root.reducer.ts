import { combineReducers } from 'redux';
import { moviesReducer } from './movies.reducer';
import { filterReducer } from './filter.reducer';
import { detailsReducer } from './details.reducer';
import { visibilityFilterReducer } from './visibilityFilter.reducer';


export const rootReducerApp = combineReducers({
    visibilityFilter: visibilityFilterReducer,
    filters: filterReducer,
    moviesConfig: moviesReducer,
    details: detailsReducer,
});