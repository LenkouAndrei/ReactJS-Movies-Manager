import { SortByFilterAction } from '../actions/filter.action';
import { IAction, IStoreFilters } from '../../types/types';

const filtersInitState: IStoreFilters = {
    sortByConfig: {
        chosenOption: 'vote_average',
        options: ['vote_average', 'vote_count', 'release_date', 'revenue', 'runtime', 'budget'],
    },
    genresConfig: {
        currentGenre: '',
        genres: ['', 'Drama', 'Fantasy', 'Adventure', 'Comedy', 'Animation'],
    },
};

export function filterReducer(
    state: IStoreFilters = filtersInitState,
    action: IAction<SortByFilterAction>
): IStoreFilters {
    switch (action.type) {
        case SortByFilterAction.SET_SORT_BY_FILTER:
            return {
                ...state,
                sortByConfig: {
                    ...state.sortByConfig,
                    chosenOption: action.payload,
                }
            };
        case SortByFilterAction.SET_GENRE_FILTER:
            return {
                ...state,
                genresConfig: {
                    ...state.genresConfig,
                    currentGenre: action.payload,
                }
            };
        default:
            return state;
    }
}