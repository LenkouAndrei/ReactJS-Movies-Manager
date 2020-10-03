import React, { MouseEvent, useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { FormPage, Modal, Wrapper } from '../';
import { DeleteModal, Details, MovieCard, ResultFilter, ResultSort, Search } from '../../components';
import {
    IMovie,
    IMoviesGenresConfig,
    IMoviesSortByConfig,
    ISelectConfig,
    IQueryParams,
    TGenresListItem,
    TNullable,
    TSortListItem
} from '../../types/types';
import './main.scss';
import { store } from '../../redux/store/store';
import { getMovies } from '../../redux/actions/movies.action';
import { moviesSortList } from './mockMoviesSortList';
import { getMoviesFromServer, deleteMoviesFromServer } from '../../service/movies.service';
import { setGenreFilter, setSortByFilter } from '../../redux/actions/filter.action';

const blockName = 'result';

interface IMainProps {
    movieToAdd: TNullable<IMovie>;
    areDetailsVisible: boolean;
    onChangePage: () => void;
}

interface IStoredMainProps extends IMainProps {
    moviesStore: IMovie[];
    storeGenresConfig: IMoviesGenresConfig;
    moviesSortConfig: IMoviesSortByConfig;
    loadData(params: TNullable<IQueryParams>): void;
    deleteMovie(id: number): void;
    setCurrentGenre(genre: TGenresListItem): void;
    setCurrentSortBy(sortByOption: TSortListItem): void;
}

type TVoidWithNoArgs = () => void;
type TShowModal = (modalType: string) => void;
type THandleMovie = (modalDialogType: string, id: number) => void;
type TUpdateMovieSet = (editableMovie: IMovie) => void;
type TUpdateMoviesSortConfig = (isOpen: boolean, sortOption?: TSortListItem) => void;
type TShowDetails = (event: MouseEvent, movieWithDetails: IMovie) => void;
type TSetCurrentGenre = (genre: TGenresListItem) => void;

function Main({
    moviesStore,
    storeGenresConfig,
    moviesSortConfig,
    deleteMovie,
    loadData,
    setCurrentGenre,
    setCurrentSortBy,
    ...props
}: IStoredMainProps): JSX.Element {
    const initGreatestId: number = moviesStore.reduce(
        (accum: number, curr: IMovie) => {
            return curr.id > accum ? curr.id : accum;
        },
        0
    );

    if ( props.movieToAdd ) {
        moviesStore.push(props.movieToAdd);
    }

    const [ isFormDialogOpen, setIsFormDialogOpen ] = useState(false);
    const [ isDeleteDialogOpen, setIsDeleteDialogOpen ] = useState(false);
    const [ movieToEdit, setMovieToEdit ] = useState(moviesStore[0]);
    const [ greatestId, setGreatestId ] = useState(initGreatestId);
    const [ movieWithDetails, setMovieWithDetails ] = useState(null);
    const [ isInit, setIsInit ] = useState(false);
    const [ isSortByOpen, setIsSortByOpen ] = useState(false);

    useEffect(
        () => {
            if (!isInit) {
                loadData(null);
                setIsInit(true);
                return;
            }
            if (!props.movieToAdd) {
                return;
            }
            const currentId: number = greatestId + 1;
            props.movieToAdd.id = currentId;
            // setMovies([ ...movies, props.movieToAdd]);
            setGreatestId(currentId);
        }, [props.movieToAdd, isInit]
    );

    const showModal: TShowModal = (modalType: string) => {
        store.dispatch(getMovies());
        setIsFormDialogOpen(modalType === 'Edit');
        setIsDeleteDialogOpen(modalType === 'Delete');
    };

    const hideModal: TVoidWithNoArgs = () => {
        setIsFormDialogOpen(false);
        setIsDeleteDialogOpen(false);
    };

    const handleMovieToEditChange: THandleMovie = (modalDialogType: string, id: number) => {
        setMovieToEdit(moviesStore.find((movie: IMovie) => movie.id === id));
        showModal(modalDialogType);
    };

    // const sortMoviesByField: TSortMoviesByField = (field: keyof IMovie) => {
    //     const moviesCopy: IMovie[] = [ ...movies ];
    //     if (field === 'release_date') {
    //         moviesCopy.sort((movieA, movieB) => +new Date(movieA[field]) - +new Date(movieB[field]));
    //     } else {
    //         moviesCopy.sort((movieA, movieB) => (movieA[field] as number) - (movieB[field] as number));
    //     }
    //     setMovies( moviesCopy );
    // };

    const sortMoviesByField: TUpdateMoviesSortConfig = (isOpen: boolean, sortOption?: TSortListItem) => {
        setIsSortByOpen(isOpen);
        if (!isOpen) {
            setCurrentSortBy(sortOption);
            loadData({ sortBy: sortOption });
        }
    };

    const sortMoviesByGenre: TSetCurrentGenre = (genre: TGenresListItem) => {
        setCurrentGenre(genre);
        loadData({ filter: genre });
    }

    const updateMoviesSet: TUpdateMovieSet = (editableMovie: IMovie) => {
        const movieIdx: number = moviesStore
            .findIndex(({ id }: IMovie) => id === movieToEdit.id);
        const newMovies: IMovie[] = [ ...moviesStore ];
        newMovies.splice(movieIdx, 1, editableMovie);
        // setMovies( newMovies );
        hideModal();
    };

    const onDeleteMovie: TVoidWithNoArgs = () => {
        deleteMovie(movieToEdit.id);
        hideModal();
    };

    const showDetails: TShowDetails = (event: MouseEvent, movie: IMovie) => {
        setMovieWithDetails( movie );
        props.onChangePage();
    };

    const moviesCards: JSX.Element[] = moviesStore.map((movie: IMovie) => {
            return <li
                className={`${blockName}__movies-card`}
                key={movie.id}
                onClick={(event) => showDetails(event, movie)}>
                <MovieCard onClickMovie={handleMovieToEditChange} movie={movie}/>
            </li>;
        });

    return <main className={blockName}>
        <Modal isOpen={isFormDialogOpen} handleClose={hideModal}>
            <FormPage onSaveChanges={updateMoviesSet} movie={ movieToEdit }/>
        </Modal>
        <Modal isOpen={isDeleteDialogOpen} handleClose={hideModal}>
            <DeleteModal onDeleteConfirm={onDeleteMovie} title={movieToEdit.title}/>
        </Modal>
        <Wrapper>
            { props.areDetailsVisible && movieWithDetails ?
                <Details { ...movieWithDetails }/> : <Search/> }
        </Wrapper>
        <div className={`${blockName}__separator`} />
        <Wrapper>
            <>
                <section className={`${blockName}__filter`}>
                    <ResultFilter
                        onGenreClick={sortMoviesByGenre}
                        { ...storeGenresConfig }/>
                    <ResultSort
                        onSortClick={sortMoviesByField}
                        showOptionList={isSortByOpen}
                        {...moviesSortConfig}/>
                </section>
                <div className={`${blockName}__amount`}>
                    <strong className='strong'>{moviesStore.length}</strong> movies found
                </div>
                <ul className={`${blockName}__cards-list`}>
                    {moviesCards}
                </ul>
            </>
        </Wrapper>
    </main>;
}

const mapStateToProps = (state: any, ownProps: IMainProps) => {
    return {
      ...ownProps,
      moviesStore: state.movies,
      storeGenresConfig: state.filters.genresConfig,
      moviesSortConfig: state.filters.sortByConfig,
    }
}

const dispatchToProps = ((dispatch: any) => {
    return {
        loadData: (params: TNullable<IQueryParams>) => { dispatch(getMoviesFromServer(params)) },
        deleteMovie: (id: number) => { dispatch(deleteMoviesFromServer(id)) },
        setCurrentGenre: (genre: TGenresListItem) => { dispatch(setGenreFilter(genre)) },
        setCurrentSortBy: (sortByOption: TGenresListItem) => { dispatch(setSortByFilter(sortByOption)) },
    }
});
  
const MainWithState = connect(mapStateToProps, dispatchToProps)(Main);

export { MainWithState };