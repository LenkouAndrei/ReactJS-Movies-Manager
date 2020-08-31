import React, { ChangeEvent, Component, useState } from 'react';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './form-select.component.scss';

interface ISelectFormProps {
    onApplyGenres: (newGenres: string[]) => void;
    genres: string[];
}

const allGenres: string[] = [
    'Adventure',
    'Horror',
    'Comedy',
    'Family',
    'Drama',
    'Romance',
];

const blockName = 'form-select';

export function FormSelect(props: ISelectFormProps): JSX.Element {
    const [ genres , _setGenres ] = useState(Array.from(new Set([ ...allGenres, ...props.genres ])));
    const [ selectedGenres , setSelectedGenres ] = useState(props.genres);
    const [ isOpen , setIsOpen ] = useState(false);

    const toggleSelectDropdown = (event: React.MouseEvent): void => {
        event.preventDefault();
        event.stopPropagation();

        if ( !isOpen ) {
            setIsOpen(true);
        } else {
            setIsOpen(false);
            props.onApplyGenres(selectedGenres);
        }
    }

    const handleCheckboxChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        const { checked, name } = target;
        const chosenGenres: string[] = checked ? [ ...selectedGenres, name ] :
            selectedGenres.filter(genre => genre !== name);
        setSelectedGenres(chosenGenres);
    }

    const genresList: JSX.Element[] = genres.map(genre => {
        return <li
            className={`${blockName}__item`}
            key={genre}>
            <label className={`${blockName}__label`}>
                <input
                    className={`${blockName}__checkbox`}
                    type='checkbox'
                    name={genre}
                    checked={selectedGenres.includes(genre)}
                    onChange={handleCheckboxChange}/>
                {genre}
            </label>
        </li>;
    });

    return <>
        <button
            className={`${blockName}__btn`}
            onClick={toggleSelectDropdown}>
            <span className={`${blockName}__chosen-items`}>
                { selectedGenres.join(', ') || 'Select Genre' }
            </span>
            <FontAwesomeIcon
                className={`${blockName}__icon`}
                icon={faAngleDown}
                size='lg'/>
        </button>
        { isOpen && <ul className={`${blockName}__list`}>
            { genresList }
        </ul>}
    </>;
}