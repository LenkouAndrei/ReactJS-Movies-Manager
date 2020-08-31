import React, { useState } from 'react';
import { faAlignJustify, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IMovie } from '../../types/types';
import './movie-card.component.scss';

const blockName = 'movie';

interface IMovieCardProps {
    movie: IMovie;
    onClickMovie: (modalDialogType: string, id: number, isOpen: boolean) => void;
}

const menuItemTitles: string[] = ['Edit', 'Delete'];

export function MovieCard(props: IMovieCardProps): JSX.Element {
    const [ isEditMenuVisible, setIsEditMenuVisible ] = useState(false);
    const wrapperRef: React.RefObject<HTMLInputElement> = React.createRef();

    const handleClickOutside: (event: Event) => void = (event: Event) => {
        if (wrapperRef && !wrapperRef.current.contains(event.target as Node)) {
            hideEditMenu();
        }
    };

    const hideEditMenu: () => void = () => {
        setIsEditMenuVisible(false);
        document.removeEventListener('mousedown', handleClickOutside);
    };

    const showEditMenu: () => void = () => {
        setIsEditMenuVisible(true);
        document.addEventListener('mousedown', handleClickOutside);
    };

    const passInfo: (itemTitle: string) => void = (itemTitle: string) => {
        props.onClickMovie(itemTitle, props.movie.id, true);
        hideEditMenu();
    };

    const listItems: JSX.Element[] = menuItemTitles.map((itemTitle: string) => {
        return <li
            key={itemTitle}
            className={'menu__list-item'}
            // tslint:disable-next-line jsx-no-lambda
            onClick={() => passInfo(itemTitle)}>{ itemTitle }</li>;
    });

    const menu: JSX.Element = <div
        className={`${blockName}__menu menu`}
        ref={wrapperRef}>
        <button
            className={'menu__btn--close'}
            onClick={hideEditMenu}>
            <FontAwesomeIcon
                className={'menu__icon'}
                icon={faTimes}/>
        </button>
        <ul className={'menu__list'}>
            { listItems }
        </ul>
    </div>;

    const icon: JSX.Element = <div
        className={`${blockName}__icon-container`}
        onClick={showEditMenu}>
        <FontAwesomeIcon
            className={`${blockName}__icon`}
            icon={faAlignJustify} />
        </div>;

    return <figure className={blockName}>
        <img
            className={`${blockName}__image`}
            src={props.movie.poster_path}
            alt={props.movie.title}/>
        <figcaption className={`${blockName}__info`}>
            <span className={`${blockName}__title`}>{props.movie.title}</span>
            <span className={`${blockName}__release-date`}>{props.movie.release_date}</span>
            <span className={`${blockName}__genres`}>{props.movie.genres.join(', ')}</span>
            <div
                className={`${blockName}__settings`}>
                    { isEditMenuVisible ? menu : icon }
            </div>
        </figcaption>
    </figure>;
}