import React, { useRef, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getMoviesFromServer } from '../../redux/thunks/movies-thunks';
import './search.scss';

const blockName = 'search';

interface ISearchProps {
    loadData(text: string): void;
}

type TSearch = (props: ISearchProps) => JSX.Element;

const Search: TSearch = ({ loadData }: ISearchProps) => {
    const [isInit, setIsInit] = useState(false);
    const { query } = useParams();
    const history = useHistory();
    const inputEl = useRef(null);
    useEffect(
        () => {
            if (isInit || !query) {
                return;
            }
            setIsInit(true);
            loadData(query);
        },
        [isInit]
    );
    const searchText = () => {
        const trimmedText = inputEl.current.value.trim();
        history.push(`/search/${inputEl.current.value}`);
        loadData(trimmedText);
    };

    return <section className={blockName}>
        <h1 className={`${blockName}__headline`}>Find your movie</h1>
        <div className={`${blockName}__container`}>
            <input
                className={`${blockName}__input`}
                ref={inputEl}
                type='text'
                placeholder='What do you want to watch ?'/>
            <button
                className={`${blockName}__btn`}
                onClick={searchText}>Search</button>
        </div>
    </section>;
};

const dispatchToProps = ((dispatch: any) => {
    return {
        loadData: (text: string) => { dispatch(getMoviesFromServer({ search: text })); },
    };
});

const SearchWithState = connect(null, dispatchToProps)(Search);

export { SearchWithState };