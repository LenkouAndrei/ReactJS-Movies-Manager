import { DetailsAction } from '../actions/details.actions';
import { IAction, IMovie, TNullable } from '../../types/types';

export function detailsReducer(state: TNullable<IMovie> = null, action: IAction<DetailsAction>) {
    switch (action.type) {
        case DetailsAction.SET_DETAILS:
            return action.payload;
        default:
            return state;
    }
}