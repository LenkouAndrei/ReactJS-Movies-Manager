export enum SortByFilterAction {
    SET_SORT_BY_FILTER = 'SET_SORT_BY_FILTER',
}

export const setSortByFilter = (filter: string) => ({
    type: SortByFilterAction.SET_SORT_BY_FILTER,
    payload: filter
});