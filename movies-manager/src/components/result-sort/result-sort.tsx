import React, { useState, MouseEvent } from 'react';
import { connect } from 'react-redux';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IStoreState, TSortListItem, IMoviesSortByConfig } from '../../types/types';
import { getMoviesFromServer } from '../../redux/thunks/movies-thunks';
import { setSortByFilter } from '../../redux/actions/filter.action';
import './result-sort.scss';

const blockName = 'result-sort';

interface ISelectProps extends IMoviesSortByConfig {
    loadData(): void;
    setCurrentSortBy(sortByOption: TSortListItem): void;
}

type TResultSort = (props: ISelectProps) => JSX.Element;

const ResultSort: TResultSort = ({
    options,
    chosenOption,
    loadData,
    setCurrentSortBy}: ISelectProps) => {

    const [showOptionList, setShowOptionList] = useState(false);

    const optionClickHandlerWrapper = (option: TSortListItem) => (_event: MouseEvent) => {
        setShowOptionList(false);
        setCurrentSortBy(option);
        loadData();
    };

    const openList = (_event: MouseEvent) => {
        setShowOptionList(true);
    };

    const listItems: JSX.Element[] = options.map(option => {
        return <li
            className={`${blockName}__item`}
            key={option}>
                <button
                    className={`${blockName}__btn`}
                    onClick={optionClickHandlerWrapper(option) }>{option.replace('_', ' ')}</button>
            </li>;
    });

    return <div className={`${blockName}__container`}>
            <span className={`${blockName}label`}>Sort By:</span>
            <div className={`${blockName}__container--btn`}>
                <button
                    className={`${blockName}__btn untracked`}
                    onClick={openList}>
                    <span>{ chosenOption.replace('_', ' ') }</span>
                    <FontAwesomeIcon
                        className={`${blockName}__icon--bright`}
                        icon={ showOptionList ? faAngleUp : faAngleDown }/>
                </button>
                {showOptionList && (
                    <ul className={`${blockName}__list`}>
                        {listItems}
                    </ul>
                )}
            </div>
        </div>;
};

const mapStateToProps = (state: IStoreState) => {
    const { chosenOption, options } = state.filters.sortByConfig;
    return { chosenOption, options };
};

const dispatchToProps = ((dispatch: any) => {
    return {
        loadData: () => { dispatch(getMoviesFromServer({})); },
        setCurrentSortBy: (sortByOption: TSortListItem) => { dispatch(setSortByFilter(sortByOption)); },
    };
});

const ResultSortWithState = connect(mapStateToProps, dispatchToProps)(ResultSort);

export { ResultSortWithState };