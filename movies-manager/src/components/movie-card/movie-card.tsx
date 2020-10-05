import React, { useState, useCallback } from 'react';
import { faAlignJustify, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IMovie } from '../../types/types';
import useOutsideClick from '../../hooks/useOutsideClick';
import { menuItemTitles } from './mockMenuTitles';
import './movie-card.scss';

const blockName = 'movie';

interface IMovieCardProps {
    movie: IMovie;
    onClickMovie: (modalDialogType: string, id: number, isOpen: boolean) => void;
}

export function MovieCard({ movie, onClickMovie }: IMovieCardProps): JSX.Element {
    const [ isEditMenuVisible, setIsEditMenuVisible ] = useState(false);
    const wrapperRef: React.RefObject<HTMLInputElement> = React.createRef();

    const hideEditMenu: () => void = useCallback(
      () => {
        setIsEditMenuVisible(false);
      },
      []
    );

    const hideMenuWithPropagation: (event: React.MouseEvent) => void = (event: React.MouseEvent) => {
      event.stopPropagation();
      hideEditMenu();
    };

    useOutsideClick(wrapperRef, hideEditMenu);

    const showEditMenu: (event: React.MouseEvent) => void = useCallback(
      (event: React.MouseEvent) => {
        event.stopPropagation();
        setIsEditMenuVisible(true);
      },
      []
    );

    const passInfo: (event: React.MouseEvent, itemTitle: string) => void = useCallback(
      (event: React.MouseEvent, itemTitle: string) => {
        event.stopPropagation();
        onClickMovie(itemTitle, movie.id, true);
        hideEditMenu();
      },
      []
    );

    const listItems: JSX.Element[] = menuItemTitles.map((itemTitle: string) => {
        return <li
            key={itemTitle}
            className={'menu__list-item'}
            onClick={(event: React.MouseEvent) => passInfo(event, itemTitle)}>{ itemTitle }</li>;
    });

    const menu: JSX.Element = <div
        className={`${blockName}__menu menu`}
        ref={wrapperRef}>
        <button
            className={'menu__btn--close'}
            onClick={hideMenuWithPropagation}>
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
            src={movie.poster_path}
            alt={movie.title}/>
        <figcaption className={`${blockName}__info`}>
            <span className={`${blockName}__title`}>{movie.title}</span>
            <span className={`${blockName}__release-date`}>{movie.release_date}</span>
            <span className={`${blockName}__genres`}>{movie.genres.join(', ')}</span>
            <div
                className={`${blockName}__settings`}>
                    { isEditMenuVisible ? menu : icon }
            </div>
        </figcaption>
    </figure>;
}