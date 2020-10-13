export enum SortByFilterAction {
    SET_SORT_BY_FILTER = 'SET_SORT_BY_FILTER',
    SET_GENRE_FILTER = 'SET_GENRE_FILTER',
}

export const setSortByFilter = (filter: string) => ({
    type: SortByFilterAction.SET_SORT_BY_FILTER,
    payload: filter
});

export const setGenreFilter = (filter: string) => ({
    type: SortByFilterAction.SET_GENRE_FILTER,
    payload: filter
});