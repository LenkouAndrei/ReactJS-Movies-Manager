import React, { Component } from "react";
import "./main.component.scss";
import { Wrapper } from "../wrapper/wrapper.component";
import { Modal } from "../modal/modal.component";
import { FormPage } from "../form-page/form-page.component";
import { ResultFilter, ResultSort, Search, MovieCard } from "../../components";
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
    isDialogOpen: boolean;
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
            isDialogOpen: false,
            movies,
            moviesSortSet,
            moviesGenres,
        }
    }

    showModal = () => {
        this.setState({ isDialogOpen: true });
    };

    hideModal = () => {
        this.setState({ isDialogOpen: false });
    };

    render() {
        const moviesCards = this.state.movies.map(({id, ...rest}: IMovie) => {
            return <li
                className={`${blockName}__movies-card`}
                key={id}
                onClick={this.showModal.bind(this)}>
                <MovieCard {...rest}/>
            </li>
        });
        return <main className={blockName}>
            <Modal isOpen={this.state.isDialogOpen} handleClose={this.hideModal}>
                <FormPage { ...this.state.movies[0] }/>
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