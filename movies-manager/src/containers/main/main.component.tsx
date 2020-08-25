import React, { Component } from "react";
import "./main.component.scss";
import { Wrapper } from "../wrapper/wrapper.component";
import { Modal } from "../modal/modal.component";
import { FormPage } from "../form-page/form-page.component";
import { ResultFilter, ResultSort, Search, MovieCard, DeleteModal } from "../../components";
import {
	IMovie,
	TSortListItem,
	ISelectConfig,
	IMoviesGenresConfig,
	TGenresListItem,
	TNullable
} from "../../types/types";

const movies = require('../../data.json');
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
}

interface IMainProps {
    movieToAdd: TNullable<IMovie>;
}

export class Main extends Component<IMainProps, IMainState> {
    constructor(props: IMainProps) {
        super(props);

        const allMoviesGenres: TGenresListItem[] = movies.reduce((allGenres: string[], { genres }: IMovie) => {
            allGenres.push(...genres);
            return allGenres;
        }, ['All']);
        const moviesGenres = Array.from(new Set(allMoviesGenres));
        const greatestId = movies.reduce((accum: number, curr: IMovie) => curr.id > accum ? curr.id : accum, 0);
        
        if (this.props.movieToAdd) {
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
        }
    }

    componentWillReceiveProps({ movieToAdd }: IMainProps) {
        if (!movieToAdd) {
            return;
        }
        const currentId = this.state.greatestId + 1;
        movieToAdd.id = currentId;
        const movies = [ ...this.state.movies, movieToAdd];
        this.setState({
            greatestId: currentId,
            movies,
        });
    }

    showModal = (modalType: string) => {
        this.setState({
            isFormDialogOpen: modalType === 'Edit',
            isDeleteDialogOpen: modalType === 'Delete',
        });
        document.body.classList.add('overflow-hidden');
    };

    hideModal = () => {
        this.setState({
            isFormDialogOpen: false,
            isDeleteDialogOpen: false,
        });
        document.body.classList.remove('overflow-hidden');
    };

    handleMovieToEditChange(modalDialogType: string, id: number) {
        this.setState({ movieToEdit: this.state.movies.find((movie: IMovie) => movie.id === id)});
        this.showModal(modalDialogType);
    }

    updateMoviesSortConfig(isOpen: boolean, title?: TSortListItem) {
        const newSortConfig = {
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

    updateMoviesSet(editableMovie: IMovie) {
        const movieIdx = this.state.movies.findIndex(({ id }: IMovie) => id === this.state.movieToEdit.id);
        const newMovies = [ ...this.state.movies ];
        newMovies.splice(movieIdx, 1, editableMovie);
        this.setState({ movies: newMovies });
        this.hideModal();
    }

    setCurrentGenre(genre: TGenresListItem) {
        this.setState({
            moviesGenresConfig: {
                ...this.state.moviesGenresConfig,
                currentGenre: genre,
            }
        });
    }

    deleteMovie() {
        const movieIdx = this.state.movies.findIndex(({ id }: IMovie) => id === this.state.movieToEdit.id);
        const newMovies = [ ...this.state.movies ];
        newMovies.splice(movieIdx, 1);
        this.setState({ movies: newMovies });
        this.hideModal();
    }

    sortMoviesByField(field: keyof IMovie) {
        const moviesCopy: IMovie[] = [ ...this.state.movies ];
        if (field === 'release_date') {
            moviesCopy.sort((movieA, movieB) => +new Date(movieA[field]) - +new Date(movieB[field]));
        } else {
            moviesCopy.sort((movieA, movieB) => (movieA[field] as number) - (movieB[field] as number));
        }
        this.setState({ movies: moviesCopy });
    }

    render() {
        const { currentGenre } = this.state.moviesGenresConfig;
        const moviesCards = this.state.movies.filter((movie: IMovie) =>  (
                currentGenre === 'All' || movie.genres.includes(currentGenre))
            ).map((movie: IMovie) => {
                return <li
                    className={`${blockName}__movies-card`}
                    key={movie.id}>
                    <MovieCard onClickMovie={this.handleMovieToEditChange.bind(this)} movie={movie}/>
                </li>
            });
            return <main className={blockName}>
                <Modal isOpen={this.state.isFormDialogOpen} handleClose={() => this.hideModal()}>
                    <FormPage onSaveChanges={this.updateMoviesSet.bind(this)} movie={ this.state.movieToEdit }/>
                </Modal>   
                <Modal isOpen={this.state.isDeleteDialogOpen} handleClose={() => this.hideModal()}>
                    <DeleteModal  onDeleteConfirm={this.deleteMovie.bind(this)} title={this.state.movieToEdit.title}/>
                </Modal>  
                <Wrapper>
                    <Search/>
                </Wrapper>
                <div className={`${blockName}__separator`}></div>
                <Wrapper>
                    <>
                        <section className={`${blockName}__filter`}>
                            <ResultFilter onGenreClick={this.setCurrentGenre.bind(this)} { ...this.state.moviesGenresConfig }/>
                            <ResultSort onSortClick={this.updateMoviesSortConfig.bind(this)} {...this.state.moviesSortConfig}/>
                        </section>
                        <div className={`${blockName}__amount`}>
                            <strong className="strong">{movies.length}</strong> movies found
                        </div>
                        <ul className={`${blockName}__cards-list`}>
                            {moviesCards}
                        </ul>
                    </>
                </Wrapper>
            </main>
    }
};

const container = document.createElement("div");
document.body.appendChild(container);