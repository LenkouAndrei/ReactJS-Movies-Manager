import { getMoviesSuccess, getMoviesFail, getMovies, deleteMovieFail, deleteMovieSuccess } from '../redux/actions/movies.action';
import { IMovie, IQueryParams } from '../types/types';

const url = 'http://localhost:4000';
const defaultQueryParams: IQueryParams = {
    filter: '',
    sortBy: '',
    sortOrder: 'desc',
    offset: '0',
    limit: '20',
}

export const getMoviesFromServer = (queryParams: IQueryParams = {}) => (dispatch: any) => {
    dispatch(getMovies())

    const requestQuery = new URLSearchParams({ ...defaultQueryParams, ...queryParams });

    fetch(`${url}/movies?${requestQuery.toString()}`)
        .then((res: Response) => {
            if (res.ok) {
                return res.json();
            }
            throw res;
        })
        .then((parsedRes: any) => dispatch(getMoviesSuccess(parsedRes.data as IMovie[])))
        .catch((err: Error) => dispatch(getMoviesFail(err)))
};

export const deleteMoviesFromServer = (id: number) => (dispatch: any) => {
    dispatch(getMovies())

    fetch(`${url}/movies/${id}`)
        .then((res: Response) => {
            if (res.ok) {
                return res.json();
            }
            throw res;
        })
        .then(() => dispatch(deleteMovieSuccess(id)))
        .catch((err: Error) => dispatch(deleteMovieFail(err)))
};