import React, { useRef } from 'react';
import './search.scss';

const blockName = 'search';

interface ISearchProps {
    onSearchClick(text: string): void;
};

type TSearch = (props: ISearchProps) => JSX.Element;

export const Search: TSearch = ({ onSearchClick }: ISearchProps) => {
    const inputEl = useRef(null);
    const searchText = () => {
        const trimmedText = inputEl.current.value.trim();
        if (!trimmedText) {
            return;
        }
        onSearchClick(trimmedText);
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
    </section>
};