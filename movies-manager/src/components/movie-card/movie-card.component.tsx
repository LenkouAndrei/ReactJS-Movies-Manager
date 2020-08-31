import React, { Component } from 'react';
import { faAlignJustify, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IMovie } from '../../types/types';
import './movie-card.component.scss';

const blockName = 'movie';

interface IMovieCardState {
    isEditMenuVisible: boolean;
}

interface IMovieCardProps {
    movie: IMovie;
    onClickMovie: (modalDialogType: string, id: number, isOpen: boolean) => void;
}

const menuItemTitles: string[] = ['Edit', 'Delete'];

export class MovieCard extends Component<IMovieCardProps, IMovieCardState> {
    private wrapperRef: React.RefObject<HTMLInputElement>;

    constructor(props: IMovieCardProps) {
        super(props);
        this.wrapperRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.state = {
            isEditMenuVisible: false,
        };
    }

    public hideEditMenu: () => void = () => {
        this.setState({ isEditMenuVisible: false });
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    public showEditMenu: () => void = () => {
        this.setState({ isEditMenuVisible: true });
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    public handleClickOutside(event: Event): void {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target as Node)) {
            this.hideEditMenu();
        }
    }

    public passInfo(itemTitle: string): void {
        this.props.onClickMovie(itemTitle, this.props.movie.id, true);
        this.hideEditMenu();
    }

    public render(): JSX.Element {
        const listItems: JSX.Element[] = menuItemTitles.map((itemTitle: string) => {
            return <li
                key={itemTitle}
                className={'menu__list-item'}
                // tslint:disable-next-line jsx-no-lambda
                onClick={() => this.passInfo(itemTitle)}>{ itemTitle }</li>;
        });

        const menu: JSX.Element = <div
            className={`${blockName}__menu menu`}
            ref={this.wrapperRef}>
            <button
                className={'menu__btn--close'}
                onClick={this.hideEditMenu}>
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
            onClick={this.showEditMenu}>
            <FontAwesomeIcon
                className={`${blockName}__icon`}
                icon={faAlignJustify} />
        </div>;

        return <figure className={blockName}>
            <img
                className={`${blockName}__image`}
                src={this.props.movie.poster_path}
                alt={this.props.movie.title}/>
            <figcaption className={`${blockName}__info`}>
                <span className={`${blockName}__title`}>{this.props.movie.title}</span>
                <span className={`${blockName}__release-date`}>{this.props.movie.release_date}</span>
                <span className={`${blockName}__genres`}>{this.props.movie.genres.join(', ')}</span>
                <div
                    className={`${blockName}__settings`}>
                        { this.state.isEditMenuVisible ? menu : icon }
                </div>
            </figcaption>
        </figure>;
    }
}