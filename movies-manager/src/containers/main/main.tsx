import React, { MouseEvent, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { MovieFormWithState, Modal, Wrapper } from '../';
import {
    DeleteModal,
    DetailsWithState,
    MovieCard,
    ResultFilterWithState,
    ResultSortWithState,
    SearchWithState,
    LoadingIndicator,
    ErrorHandler,
} from '../../components';
import {
    IMovie,
    IStoreState,
    TNullable,
} from '../../types/types';
import './main.scss';
import { deleteMoviesFromServer } from '../../redux/thunks/movies-thunks';
import { setDetails } from '../../redux/actions/details.actions';

const blockName = 'result';

interface IMainProps {
    movieToAdd: TNullable<IMovie>;
    areDetailsVisible: boolean;
    onChangePage: () => void;
}

interface IStoredMainProps extends IMainProps {
    moviesStore: IMovie[];
    isLoading: boolean;
    errorInfo: TNullable<Error>;
    deleteMovie(id: number): void;
    setMovieDetails(movie: IMovie): void;
}

type TVoidWithNoArgs = () => void;
type TShowModal = (modalType: string) => void;
type THandleMovie = (modalDialogType: string, id: number) => void;
type TUpdateMovieSet = () => void;
type THandleCardClickWrapper = (movie: IMovie) => (_event: MouseEvent) => void; 

function Main({
    moviesStore,
    isLoading,
    errorInfo,
    deleteMovie,
    setMovieDetails,
    ...props
}: IStoredMainProps): JSX.Element {
    const history = useHistory();
    const [ isFormDialogOpen, setIsFormDialogOpen ] = useState(false);
    const [ isDeleteDialogOpen, setIsDeleteDialogOpen ] = useState(false);
    const [ movieToEdit, setMovieToEdit ] = useState(null);

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

    const updateMoviesSet: TUpdateMovieSet = () => {
        hideModal();
    };

    const onDeleteMovie: TVoidWithNoArgs = () => {
        deleteMovie(movieToEdit.id);
        hideModal();
    };

    const handleCardClick: THandleCardClickWrapper  = (movie) => (_event)=> {
        setMovieDetails(movie);
        history.push(`/film/${movie.id}`);
    }

    const moviesCards: JSX.Element[] = moviesStore.map((movie: IMovie) => {
            return <li
                className={`${blockName}__movies-card`}
                key={movie.id}
                onClick={handleCardClick(movie)}>
                    <MovieCard onClickMovie={handleMovieToEditChange} movie={movie}/>
            </li>;
        });

    const wrappedSpinner: JSX.Element = <Wrapper postfix={'vertically-filled'}>
        <LoadingIndicator />
    </Wrapper>;

    const wrappedNotFoundResult: JSX.Element = <Wrapper postfix={'vertically-filled'}>
        <span className={`${blockName}__not-found`}>No movies found</span>
    </Wrapper>;

    const wrappedErrorHandler: JSX.Element = <Wrapper>
        <ErrorHandler errorMessage={errorInfo && errorInfo.message || ''}/>
    </Wrapper>;

    const wrappedList: JSX.Element = <Wrapper>
        <ul className={`${blockName}__cards-list`}>
            {moviesCards}
        </ul>
    </Wrapper>;

    return <main className={blockName}>
        <Modal isOpen={isFormDialogOpen} handleClose={hideModal}>
            <MovieFormWithState onSaveChanges={updateMoviesSet} movie={ movieToEdit }/>
        </Modal>
        <Modal isOpen={isDeleteDialogOpen} handleClose={hideModal}>
            {movieToEdit && <DeleteModal onDeleteConfirm={onDeleteMovie} title={movieToEdit.title}/>}
        </Modal>
        <div className={`${blockName}__separator`} />
        <Wrapper>
            <>
                { props.areDetailsVisible ? <DetailsWithState /> : <SearchWithState /> }
                <section className={`${blockName}__filter`}>
                    <ResultFilterWithState />
                    <ResultSortWithState />
                </section>
                <div className={`${blockName}__amount`}>
                    <strong className='strong'>{moviesStore.length}</strong> movies found
                </div>
            </>
        </Wrapper>
        { isLoading ? wrappedSpinner :
            errorInfo && errorInfo.message && wrappedErrorHandler
            || moviesStore.length !== 0 && wrappedList
            || wrappedNotFoundResult }
    </main>;
}

const mapStateToProps = (state: IStoreState, ownProps: IMainProps) => {
    const { movies: moviesStore, isLoading, error: errorInfo } = state.moviesConfig;
    return { ...ownProps, moviesStore, isLoading, errorInfo };
};

const dispatchToProps = ((dispatch: any) => {
    return {
        deleteMovie: (id: number) => { dispatch(deleteMoviesFromServer(id)); },
        setMovieDetails: (movie: IMovie) => { dispatch(setDetails(movie)); },
    };
});

const MainWithState = connect(mapStateToProps, dispatchToProps)(Main);

export { MainWithState };