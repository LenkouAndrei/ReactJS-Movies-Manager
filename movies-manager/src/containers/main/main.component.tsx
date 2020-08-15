import React from "react";
import "./main.component.scss";
import { Wrapper } from "../wrapper/wrapper.component";
import { ResultFilter, ResultSort, Search, MovieCard, IMovieInfo } from "../../components";

interface IMovie extends IMovieInfo {
    id: number;
};

const movies = require('../../data.json');
const blockName = 'result';

export const Main = () => {
    const allMoviesGenres: string[] = movies.reduce((allGenres: string[], { genres }: IMovie) => {
        allGenres.push(...genres);
        return allGenres;
    }, ['All']);
    const moviesGenres = Array.from(new Set(allMoviesGenres));
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
const moviesCards = movies.map(({id, ...rest}: IMovie) => {
    return <li
        className={`${blockName}__movies-card`}
        key={id}>
        <MovieCard {...rest}/>
    </li>
});
return <main className={blockName}>
    <Wrapper>
        <Search/>
    </Wrapper>
    <div className={`${blockName}__separator`}></div>
    <Wrapper>
        <>
            <section className={`${blockName}__filter`}>
                <ResultFilter genres={moviesGenres}/>
                <ResultSort sortSet={moviesSortSet}/>
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
};