import { IMovie, TNullable } from "../../types/types";

export enum DetailsAction {
    SET_DETAILS = 'SET_DETAILS',
}

export const setDetails = (movie: TNullable<IMovie>) => ({
    type: DetailsAction.SET_DETAILS,
    payload: movie
});