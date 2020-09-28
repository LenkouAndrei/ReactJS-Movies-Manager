export enum VisibilityFilterAction {
    SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER',
}

export const setVisibilityFilter = (filter: string) => ({
    type: VisibilityFilterAction.SET_VISIBILITY_FILTER,
    payload: filter
});