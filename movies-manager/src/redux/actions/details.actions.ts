import { IMovie, TNullable } from '../../types/types';

export enum DetailsAction {
    SET_DETAILS = 'SET_DETAILS',
}

export interface IDetailsAction<T> {
    type: DetailsAction.SET_DETAILS;
    payload?: T;
}

export type TDetailsCreator<T> = (arg?: T) => {
    type: DetailsAction;
    payload?: T;
};

export const setDetails: TDetailsCreator<TNullable<IMovie>> = (movie: TNullable<IMovie>) => ({
    type: DetailsAction.SET_DETAILS,
    payload: movie
});