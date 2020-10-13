import React, { MouseEvent } from 'react';
import { connect } from 'react-redux';
import { IStoreState, IMoviesGenresConfig, TGenresListItem } from '../../types/types';
import { getMoviesFromServer } from '../../redux/thunks/movies-thunks';
import { setGenreFilter } from '../../redux/actions/filter.action';
import './result-filter.scss';

interface IResultFilterProps extends IMoviesGenresConfig {
    loadData(): void;
    setCurrentGenre(genre: TGenresListItem): void;
}

const blockName = 'result-filter';

type TResultFilter = (props: IResultFilterProps) => JSX.Element;

const ResultFilter: TResultFilter = ({
    genres,
    currentGenre,
    loadData,
    setCurrentGenre,
}: IResultFilterProps) => {
    const genreChoseHandlerWrapper = (genre: TGenresListItem) => (_event: MouseEvent) => {
        setCurrentGenre(genre);
        loadData();
    };

    const listItems: JSX.Element[] = genres.map(title => {
        return <li
            className={`${blockName}__item`}
            key={title}>
                <button
                    className={`${blockName}__btn  ${currentGenre === title ? 'highlight' : ''}`}
                    onClick={genreChoseHandlerWrapper(title)}>{title || 'All'}</button>
            </li>;
    });
    return <ul className={`${blockName}__list`}>{listItems}</ul>;
};

const mapStateToProps = (state: IStoreState) => {
    const { currentGenre, genres } = state.filters.genresConfig;
    return { currentGenre, genres };
};

const dispatchToProps = ((dispatch: any) => {
    return {
        loadData: () => { dispatch(getMoviesFromServer({})); },
        setCurrentGenre: (genre: TGenresListItem) => { dispatch(setGenreFilter(genre)); },
    };
});

const ResultFilterWithState = connect(mapStateToProps, dispatchToProps)(ResultFilter);

export { ResultFilterWithState };