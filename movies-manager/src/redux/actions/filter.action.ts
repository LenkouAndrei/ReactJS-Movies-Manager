export enum SortByFilterAction {
    SET_SORT_BY_FILTER = 'SET_SORT_BY_FILTER',
    SET_GENRE_FILTER = 'SET_GENRE_FILTER',
}

export type TSortByFilterActionCreator = (filter: string) => {
    type: SortByFilterAction,
    payload: string;
};

export interface ISortByFilterAction {
    type: SortByFilterAction;
    payload: string;
}

export const setSortByFilter: TSortByFilterActionCreator = (filter: string) => ({
    type: SortByFilterAction.SET_SORT_BY_FILTER,
    payload: filter
});

export const setGenreFilter: TSortByFilterActionCreator = (filter: string) => ({
    type: SortByFilterAction.SET_GENRE_FILTER,
    payload: filter
});