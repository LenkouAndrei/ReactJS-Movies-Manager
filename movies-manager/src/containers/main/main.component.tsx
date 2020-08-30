import React, { Component } from 'react';
import { FormPage } from '../form-page/form-page.component';
import { Modal } from '../modal/modal.component';
import { Wrapper } from '../wrapper/wrapper.component';
import { DeleteModal, Details, MovieCard, ResultFilter, ResultSort, Search } from '../../components';
import {
    IMovie,
    IMoviesGenresConfig,
    ISelectConfig,
    TGenresListItem,
    TNullable,
    TSortListItem
} from '../../types/types';
import './main.component.scss';

const movies: IMovie[] = require('../../data.json');
const blockName = 'result';
const moviesSortList: TSortListItem[] = [ 'vote average', 'vote count', 'release date', 'revenue' ];

interface IMainState {
    isFormDialogOpen: boolean;
    isDeleteDialogOpen: boolean;
    movieToEdit: IMovie;
    movies: IMovie[];
    moviesSortConfig: ISelectConfig;
    moviesGenresConfig: IMoviesGenresConfig;
    greatestId: number;
    movieWithDetails: TNullable<IMovie>;
}

interface IMainProps {
    movieToAdd: TNullable<IMovie>;
}

type TVoidWithNoArgs = () => void;
type TShowModal = (modalType: string) => void;
type THandleMovie = (modalDialogType: string, id: number) => void;
type TSetGenre = (genre: TGenresListItem) => void;
type TUpdateMovieSet = (editableMovie: IMovie) => void;
type TUpdateMoviesSortConfig = (isOpen: boolean, title?: TSortListItem) => void;
type TSortMoviesByField = (field: keyof IMovie) => void;
type TShowDetails = (event: React.MouseEvent, movieWithDetails: IMovie) => void;

export class Main extends Component<IMainProps, IMainState> {
    constructor(props: IMainProps) {
        super(props);

        const allMoviesGenres: TGenresListItem[] =
            movies.reduce((allGenres: TGenresListItem[], { genres }: IMovie) => {
                allGenres.push(...genres as TGenresListItem[]);
                return allGenres;
            }, ['All']);
        const moviesGenres: TGenresListItem[] = Array.from(new Set(allMoviesGenres));
        const greatestId: number = movies.reduce((accum: number, curr: IMovie) => {
            return curr.id > accum ? curr.id : accum;
        }, 0);

        if ( this.props.movieToAdd ) {
            movies.push(this.props.movieToAdd);
        }

        this.state = {
            isFormDialogOpen: false,
            isDeleteDialogOpen: false,
            movieToEdit: movies[0],
            movies,
            moviesSortConfig: {
                showOptionList: false,
                options: moviesSortList,
                chosenOption: moviesSortList[0],
            },
            moviesGenresConfig: {
                genres: moviesGenres,
                currentGenre: moviesGenres[0],
            },
            greatestId,
            movieWithDetails: null,
        };
    }

    public componentWillReceiveProps({ movieToAdd }: IMainProps): void {
        if (!movieToAdd) {
            return;
        }
        const currentId: number = this.state.greatestId + 1;
        movieToAdd.id = currentId;
        const newMovies: IMovie[] = [ ...this.state.movies, movieToAdd];
        this.setState({
            greatestId: currentId,
            movies: newMovies,
        });
    }

    public showModal: TShowModal = (modalType: string) => {
        this.setState({
            isFormDialogOpen: modalType === 'Edit',
            isDeleteDialogOpen: modalType === 'Delete',
        });
        document.body.classList.add('overflow-hidden');
    }

    public hideModal: TVoidWithNoArgs = () => {
        this.setState({
            isFormDialogOpen: false,
            isDeleteDialogOpen: false,
        });
        document.body.classList.remove('overflow-hidden');
    }

    public handleMovieToEditChange: THandleMovie = (modalDialogType: string, id: number) => {
        this.setState({ movieToEdit: this.state.movies.find((movie: IMovie) => movie.id === id)});
        this.showModal(modalDialogType);
    }

    public updateMoviesSortConfig: TUpdateMoviesSortConfig = (isOpen: boolean, title?: TSortListItem) => {
        const newSortConfig: Partial<ISelectConfig> = {
            showOptionList: isOpen,
            chosenOption: title,
        };
        this.setState(({ moviesSortConfig }: IMainState) => ({
            moviesSortConfig: { ...moviesSortConfig, ...newSortConfig }
        }));
        if (title) {
            this.sortMoviesByField(title.replace(' ', '_') as keyof IMovie);
        }
    }

    public updateMoviesSet: TUpdateMovieSet = (editableMovie: IMovie) => {
        const movieIdx: number = this.state.movies
            .findIndex(({ id }: IMovie) => id === this.state.movieToEdit.id);
        const newMovies: IMovie[] = [ ...this.state.movies ];
        newMovies.splice(movieIdx, 1, editableMovie);
        this.setState({ movies: newMovies });
        this.hideModal();
    }

    public setCurrentGenre: TSetGenre = (genre: TGenresListItem) => {
        this.setState({
            moviesGenresConfig: {
                ...this.state.moviesGenresConfig,
                currentGenre: genre,
            }
        });
    }

    public deleteMovie: TVoidWithNoArgs = () => {
        const movieIdx: number = this.state.movies
            .findIndex(({ id }: IMovie) => id === this.state.movieToEdit.id);
        const newMovies: IMovie[] = [ ...this.state.movies ];
        newMovies.splice(movieIdx, 1);
        this.setState({ movies: newMovies });
        this.hideModal();
    }

    public sortMoviesByField: TSortMoviesByField = (field: keyof IMovie) => {
        const moviesCopy: IMovie[] = [ ...this.state.movies ];
        if (field === 'release_date') {
            moviesCopy.sort((movieA, movieB) => +new Date(movieA[field]) - +new Date(movieB[field]));
        } else {
            moviesCopy.sort((movieA, movieB) => (movieA[field] as number) - (movieB[field] as number));
        }
        this.setState({ movies: moviesCopy });
    }

    public showDetails: TShowDetails = (event: React.MouseEvent, movieWithDetails: IMovie) => {
        if (!event.ctrlKey) {
            return;
        }
        this.setState({ movieWithDetails });
    }

    public render(): JSX.Element {
        const { currentGenre } = this.state.moviesGenresConfig;
        const moviesCards: JSX.Element[] = this.state.movies.filter((movie: IMovie) =>  (
                currentGenre === 'All' || movie.genres.includes(currentGenre))
            ).map((movie: IMovie) => {
                return <li
                    className={`${blockName}__movies-card`}
                    key={movie.id}>
                    <MovieCard onClickMovie={this.handleMovieToEditChange} movie={movie}/>
                </li>;
            });
            return <main className={blockName}>
                <Modal isOpen={this.state.isFormDialogOpen} handleClose={() => this.hideModal()}>
                    <FormPage onSaveChanges={this.updateMoviesSet} movie={ this.state.movieToEdit }/>
                </Modal>
                <Modal isOpen={this.state.isDeleteDialogOpen} handleClose={() => this.hideModal()}>
                    <DeleteModal  onDeleteConfirm={this.deleteMovie} title={this.state.movieToEdit.title}/>
                </Modal>
                <Wrapper>
                    { this.state.movieWithDetails ?
                        <Details { ...this.state.movieWithDetails }/> : <Search/> }
                </Wrapper>
                <div className={`${blockName}__separator`}></div>
                <Wrapper>
                    <>
                        <section className={`${blockName}__filter`}>
                            <ResultFilter
                                onGenreClick={this.setCurrentGenre}
                                { ...this.state.moviesGenresConfig }/>
                            <ResultSort
                                onSortClick={this.updateMoviesSortConfig}
                                {...this.state.moviesSortConfig}/>
                        </section>
                        <div className={`${blockName}__amount`}>
                            <strong className='strong'>{movies.length}</strong> movies found
                        </div>
                        <ul className={`${blockName}__cards-list`}>
                            {moviesCards}
                        </ul>
                    </>
                </Wrapper>
            </main>;
    }
}

const container: HTMLDivElement = document.createElement('div');
document.body.appendChild(container);