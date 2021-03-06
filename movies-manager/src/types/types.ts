export type TNullable<T> = T | null;

export interface IMovieInfo {
    title: string;
    tagline: string;
    vote_average: number;
    vote_count: number;
    release_date: string;
    poster_path: string;
    overview: string;
    budget: number;
    revenue: number;
    genres: (ICheckboxGenre | string)[];
    runtime: number;
}

export interface IMovie extends IMovieInfo {
    id?: number;
}

export interface ISelectConfig {
    showOptionList: boolean;
    options: TSortListItem[];
    chosenOption: TSortListItem;
}

export type TSortListItem = 'vote_average' | 'vote_count' | 'release_date' | 'revenue' | 'runtime' | 'budget';

export type TGenresListItem = '' | 'Drama' | 'Fantasy' | 'Adventure' | 'Comedy' | 'Animation';

export interface IMoviesGenresConfig {
    genres: TGenresListItem[];
    currentGenre: TNullable<TGenresListItem>;
}

export interface IMoviesSortByConfig {
    options: TSortListItem[];
    chosenOption: TSortListItem;
}

export interface IStoreFilters {
    sortByConfig: IMoviesSortByConfig;
    genresConfig: IMoviesGenresConfig;
}

export interface IMoviesStoreConfig {
    movies: IMovie[];
    isLoading: boolean;
    error: TNullable<Error>;
}

export interface IAction<T> {
   type: T;
   payload?: any;
}

export interface IQueryParams {
    filter?: string;
    search?: string;
    sortBy?: string;
    sortOrder?: 'desc' | 'asc';
    offset?: string;
    limit?: string;
    searchBy?: 'title' | 'genres';
}

export interface IStoreState {
    filters: IStoreFilters;
    moviesConfig: IMoviesStoreConfig;
    details: IMovieInfo;
}

export interface ICheckboxGenre {
    label: string;
    isChecked: boolean;
}