import { getMoviesSuccess, getMoviesFail, getMovies } from '../redux/actions/movies.action';
import { store } from '../redux/store/store';
import { IMovie } from '../types/types';

const url = 'http://localhost:4000';

export function getMoviesFromServer() {
    store.dispatch(getMovies())

    fetch(`${url}/movies`)
        .then((res: Response) => res.json())
        .then((parsedRes: any) => store.dispatch(getMoviesSuccess(parsedRes.data as IMovie[])))
        .catch((err: Error) => store.dispatch(getMoviesFail(err)))
};