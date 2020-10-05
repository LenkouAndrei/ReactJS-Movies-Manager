import React, { MouseEvent, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { FormPageWithState, Modal, Wrapper } from '../';
import {
    DeleteModal,
    DetailsWithState,
    MovieCard,
    ResultFilter,
    ResultSort,
    Search,
    LoadingIndicator,
    ErrorHandler,
} from '../../components';
import {
    IMovie,
    IMoviesGenresConfig,
    IMoviesSortByConfig,
    IQueryParams,
    IStoreState,
    TGenresListItem,
    TNullable,
    TSortListItem
} from '../../types/types';
import './main.scss';
import { getMoviesFromServer, deleteMoviesFromServer } from '../../service/movies.service';
import { setGenreFilter, setSortByFilter } from '../../redux/actions/filter.action';
import { setDetails } from '../../redux/actions/details.actions';

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
    loadConfig: {
        isLoaded: boolean;
        isLoading: boolean;
    };
    errorInfo: TNullable<Error>;
    loadData(params: TNullable<IQueryParams>): void;
    deleteMovie(id: number): void;
    setCurrentGenre(genre: TGenresListItem): void;
    setCurrentSortBy(sortByOption: TSortListItem): void;
    setDetailsToStore(movie: IMovie): void;
}

type TVoidWithNoArgs = () => void;
type TShowModal = (modalType: string) => void;
type THandleMovie = (modalDialogType: string, id: number) => void;
type TUpdateMovieSet = () => void;
type TUpdateMoviesSortConfig = (isOpen: boolean, sortOption?: TSortListItem) => void;
type TShowDetails = (event: MouseEvent, movieWithDetails: IMovie) => void;
type TSetCurrentGenre = (genre: TGenresListItem) => void;
type TSearchMovies = (text: string) => void;

function Main({
    moviesStore,
    loadConfig,
    errorInfo,
    storeGenresConfig,
    moviesSortConfig,
    deleteMovie,
    loadData,
    setCurrentGenre,
    setCurrentSortBy,
    setDetailsToStore,
    ...props
}: IStoredMainProps): JSX.Element {
    const [ isFormDialogOpen, setIsFormDialogOpen ] = useState(false);
    const [ isDeleteDialogOpen, setIsDeleteDialogOpen ] = useState(false);
    const [ movieToEdit, setMovieToEdit ] = useState(moviesStore[0]);
    const [ isInit, setIsInit ] = useState(false);
    const [ isSortByOpen, setIsSortByOpen ] = useState(false);

    useEffect(
        () => {
            if (!isInit) {
                loadData(null);
                setIsInit(true);
                return;
            }
        },
        [isInit]
    );

    const showModal: TShowModal = (modalType: string) => {
        const openMethod = (modalType === 'Edit') ? setIsFormDialogOpen : setIsDeleteDialogOpen;
        openMethod(true);
    };

    const hideModal: TVoidWithNoArgs = () => {
        setIsFormDialogOpen(false);
        setIsDeleteDialogOpen(false);
    };

    const handleMovieToEditChange: THandleMovie = (modalDialogType: string, id: number) => {
        setMovieToEdit(moviesStore.find((movie: IMovie) => movie.id === id));
        showModal(modalDialogType);
    };

    const sortMoviesByField: TUpdateMoviesSortConfig = (isOpen: boolean, sortOption?: TSortListItem) => {
        setIsSortByOpen(isOpen);
        if (!isOpen) {
            setCurrentSortBy(sortOption);
            loadData({ sortBy: sortOption, filter: storeGenresConfig.currentGenre });
        }
    };

    const sortMoviesByGenre: TSetCurrentGenre = (genre: TGenresListItem) => {
        setCurrentGenre(genre);
        loadData({ filter: genre, sortBy: moviesSortConfig.chosenOption });
    };

    const updateMoviesSet: TUpdateMovieSet = () => {
        hideModal();
    };

    const onDeleteMovie: TVoidWithNoArgs = () => {
        deleteMovie(movieToEdit.id);
        hideModal();
    };

    const showDetails: TShowDetails = (event: MouseEvent, movie: IMovie) => {
        setDetailsToStore( movie );
        props.onChangePage();
    };

    const searchMovies: TSearchMovies = (text: string) => {
        loadData({
            sortBy: moviesSortConfig.chosenOption,
            filter: storeGenresConfig.currentGenre,
            search: text,
        });
    };

    const moviesCards: JSX.Element[] = moviesStore.map((movie: IMovie) => {
            return <li
                className={`${blockName}__movies-card`}
                key={movie.id}
                onClick={(event) => showDetails(event, movie)}>
                <MovieCard onClickMovie={handleMovieToEditChange} movie={movie}/>
            </li>;
        });

    return loadConfig.isLoading ? <LoadingIndicator /> :
        !loadConfig.isLoaded && <ErrorHandler errorMessage={errorInfo.message}/>
        || <main className={blockName}>
        <Modal isOpen={isFormDialogOpen} handleClose={hideModal}>
            <FormPageWithState onSaveChanges={updateMoviesSet} movie={ movieToEdit }/>
        </Modal>
        <Modal isOpen={isDeleteDialogOpen} handleClose={hideModal}>
            <DeleteModal onDeleteConfirm={onDeleteMovie} title={movieToEdit.title}/>
        </Modal>
        <Wrapper>
            { props.areDetailsVisible ? <DetailsWithState /> : <Search onSearchClick={searchMovies} /> }
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

const mapStateToProps = (state: IStoreState, ownProps: IMainProps) => {
    return {
      ...ownProps,
      moviesStore: state.moviesConfig.movies,
      loadConfig: {
          isLoaded: state.moviesConfig.isLoaded,
          isLoading: state.moviesConfig.isLoading,
      },
      errorInfo: state.moviesConfig.error,
      storeGenresConfig: state.filters.genresConfig,
      moviesSortConfig: state.filters.sortByConfig,
    };
};

const dispatchToProps = ((dispatch: any) => {
    return {
        loadData: (params: TNullable<IQueryParams>) => { dispatch(getMoviesFromServer(params)); },
        deleteMovie: (id: number) => { dispatch(deleteMoviesFromServer(id)); },
        setCurrentGenre: (genre: TGenresListItem) => { dispatch(setGenreFilter(genre)); },
        setCurrentSortBy: (sortByOption: TGenresListItem) => { dispatch(setSortByFilter(sortByOption)); },
        setDetailsToStore: (movie: IMovie) => { dispatch(setDetails(movie)); },
    };
});

const MainWithState = connect(mapStateToProps, dispatchToProps)(Main);

export { MainWithState };