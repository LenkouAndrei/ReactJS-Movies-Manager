import React, { Component } from "react";
import "./main.component.scss";
import { Wrapper } from "../wrapper/wrapper.component";
import { Modal } from "../modal/modal.component";
import { FormPage } from "../form-page/form-page.component";
import { ResultFilter, ResultSort, Search, MovieCard, DeleteModal } from "../../components";
import { IMovie, TSortListItem, ISelectConfig } from "../../types/types";

const movies = require('../../data.json');
const blockName = 'result';
const moviesSortList: TSortListItem[] = [ 'vote average', 'vote count', 'release date', 'revenue' ];

interface IMainState {
    isFormDialogOpen: boolean;
    isDeleteDialogOpen: boolean;
    movieToEdit: IMovie;
    movies: IMovie[];
    moviesSortConfig: ISelectConfig;
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
            moviesSortConfig: {
                showOptionList: false,
                options: moviesSortList,
                chosenOption: moviesSortList[0],
            },
            moviesGenres,
        }
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
    }

    render() {
        const moviesCards = this.state.movies.map((movie: IMovie) => {
            return <li
                className={`${blockName}__movies-card`}
                key={movie.id}>
                <MovieCard onClickMovie={this.handleMovieToEditChange.bind(this)} {...movie}/>
            </li>
        });
        return <main className={blockName}>
            <Modal isOpen={this.state.isFormDialogOpen} handleClose={() => this.hideModal()}>
                <FormPage { ...this.state.movieToEdit }/>
            </Modal>   
            <Modal isOpen={this.state.isDeleteDialogOpen} handleClose={() => this.hideModal()}>
                <DeleteModal title={this.state.movieToEdit.title}/>
            </Modal>  
            <Wrapper>
                <Search/>
            </Wrapper>
            <div className={`${blockName}__separator`}></div>
            <Wrapper>
                <>
                    <section className={`${blockName}__filter`}>
                        <ResultFilter genres={this.state.moviesGenres}/>
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