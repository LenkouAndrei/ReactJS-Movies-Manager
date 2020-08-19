import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignJustify, faTimes } from "@fortawesome/free-solid-svg-icons";
import { IMovie } from "../../types/types";
import "./movie-card.component.scss";

const blockName = 'movie';

interface IMovieCardState extends IMovie {
    isEditMenuVisible: boolean;
}

interface IMovieCardProps extends IMovie {
    onClickMovie: (modalDialogType: any, id: number, isOpen: boolean) => void
}

const menuItemTitles = ['Edit', 'Delete'];

export class MovieCard extends Component<IMovieCardProps, IMovieCardState> {
    private wrapperRef: React.RefObject<HTMLInputElement>;

    constructor(props: IMovieCardProps) {
        super(props);
        this.wrapperRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.state = {
            ...this.props,
            isEditMenuVisible: false,
        }
    }

    handleClickOutside(event: Event) {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target as Node)) {
            this.hideEditMenu();
        }
    }

    showEditMenu() {
        this.setState({ isEditMenuVisible: true });
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    hideEditMenu() {
        this.setState({ isEditMenuVisible: false });
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    passInfo(itemTitle: string) {
        console.log('Props ', this.props);
        this.props.onClickMovie(itemTitle, this.props.id, true);
        this.hideEditMenu();
    }

    render() {
        const listItems = menuItemTitles.map((itemTitle: string) => {
            return <li
                key={itemTitle}
                className={'menu__list-item'}
                onClick={this.passInfo.bind(this, itemTitle)}>{ itemTitle }</li>
        });
    
        const menu = <div
            className={`${blockName}__menu menu`}
            ref={this.wrapperRef}>
            <button
                className={'menu__btn--close'}
                onClick={this.hideEditMenu.bind(this)}>
                <FontAwesomeIcon
                    className={'menu__icon'}
                    icon={faTimes}/>
            </button>
            <ul className={'menu__list'}>
                { listItems }
            </ul>
        </div>;

        const icon = <div
            className={`${blockName}__icon-container`}
            onClick={this.showEditMenu.bind(this)}>
            <FontAwesomeIcon
                className={`${blockName}__icon`}
                icon={faAlignJustify} />
        </div>;
        
        return <figure className={blockName}>
            <img
                className={`${blockName}__image`}
                src={this.state.poster_path}
                alt={this.state.title}/>
            <figcaption className={`${blockName}__info`}>
                <span className={`${blockName}__title`}>{this.state.title}</span>
                <span className={`${blockName}__release-date`}>{this.state.release_date}</span>
                <span className={`${blockName}__genres`}>{this.state.genres.join(', ')}</span>
                <div
                    className={`${blockName}__settings`}>
                        { this.state.isEditMenuVisible ? menu : icon }
                </div>
            </figcaption>
        </figure>
    }
};