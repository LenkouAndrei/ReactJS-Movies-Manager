import { SortByFilterAction } from '../actions/sortByFilter.action';
import { IAction } from '../../types/types';

const sortByInitState = 'VOTE_RANGE';

export function sortByFilterReducer(state = sortByInitState, action: IAction<SortByFilterAction>) {
    switch (action.type) {
        case SortByFilterAction.SET_SORT_BY_FILTER:
            return action.payload
        default:
            return state
    }
}