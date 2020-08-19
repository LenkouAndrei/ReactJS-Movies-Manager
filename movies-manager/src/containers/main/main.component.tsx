import React, { Component } from "react";
import "./main.component.scss";
import { Wrapper } from "../wrapper/wrapper.component";
import { Modal } from "../modal/modal.component";
import { FormPage } from "../form-page/form-page.component";
import { ResultFilter, ResultSort, Search, MovieCard, DeleteModal } from "../../components";
import { IMovie } from "../../types/types";

interface IMovieSort {
    title: string;
    isActive: boolean;
}

const movies = require('../../data.json');
const blockName = 'result';
const moviesSortSet = [
    { 
        title: 'voteAverage',
        isActive: true,
    },
    { 
        title: 'voteCount',
        isActive: false,
    },
    { 
        title: 'releaseDate',
        isActive: false,
    },
    { 
        title: 'revenue',
        isActive: false,
    },
];

interface IMainState {
    isFormDialogOpen: boolean;
    isDeleteDialogOpen: boolean;
    movieToEdit: IMovie;
    movies: IMovie[];
    moviesSortSet: IMovieSort[];
    moviesGenres: string[];
}

export class Main extends Component<any, IMainState> {
    constructor(props: any) {
        super(props);

        const allMoviesGenres: string[] = movies.reduce((allGenres: string[], { genres }: IMovie) => {
            allGenres.push(...genres);
            return allGenres;
        }, ['All']);
        const moviesGenres = Array.from(new Set(allMoviesGenres));
        this.state = {
            isFormDialogOpen: false,
            isDeleteDialogOpen: false,
            movieToEdit: movies[0],
            movies,
            moviesSortSet,
            moviesGenres,
        }
    }

    showModal = (modalType: string) => {
        this.setState({
            isFormDialogOpen: modalType === 'Edit',
            isDeleteDialogOpen: modalType === 'Delete',
        });
    };

    hideModal = () => {
        this.setState({
            isFormDialogOpen: false,
            isDeleteDialogOpen: false,
        });
    };

    test(modalDialogType: string, id: number) {
        this.setState({ movieToEdit: this.state.movies.find((movie: IMovie) => movie.id === id)});
        this.showModal(modalDialogType);
    }

    render() {
        const moviesCards = this.state.movies.map((movie: IMovie) => {
            return <li
                className={`${blockName}__movies-card`}
                key={movie.id}>
                <MovieCard onClickMovie={this.test.bind(this)} {...movie}/>
            </li>
        });
        return <main className={blockName}>
            <Modal isOpen={this.state.isFormDialogOpen} handleClose={() => this.hideModal()}>
                <FormPage { ...this.state.movieToEdit }/>
            </Modal>   
            <Modal isOpen={this.state.isDeleteDialogOpen} handleClose={() => this.hideModal()}>
                <DeleteModal { ...this.state.movieToEdit.title }/>
            </Modal>  
            <Wrapper>
                <Search/>
            </Wrapper>
            <div className={`${blockName}__separator`}></div>
            <Wrapper>
                <>
                    <section className={`${blockName}__filter`}>
                        <ResultFilter genres={this.state.moviesGenres}/>
                        <ResultSort sortSet={this.state.moviesSortSet}/>
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