import { VisibilityFilterAction } from '../actions/visibilityFilter.action';
import { IAction } from '../../types/types';

const visibilityFilterInitState = 'VOTE_RANGE';

export function visibilityFilterReducer(state = visibilityFilterInitState, action: IAction<VisibilityFilterAction>) {
    switch (action.type) {
        case VisibilityFilterAction.SET_VISIBILITY_FILTER:
            return action.payload
        default:
            return state
    }
}