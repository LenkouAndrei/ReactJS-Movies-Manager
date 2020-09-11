import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignJustify, faTimes } from "@fortawesome/free-solid-svg-icons";
import { IMovie } from "../../types/types";
import { menuItemTitles } from "./mockMenuTitles";
import {OutsideClickContext, OverflowContext} from "../../context";
import "./movie-card.component.scss";

const blockName = 'movie';

interface IMovieCardState {
	isEditMenuVisible: boolean;
}

interface IMovieCardProps {
	movie: IMovie;
    onClickMovie: (modalDialogType: any, id: number, isOpen: boolean) => void
}

export class MovieCard extends Component<IMovieCardProps, IMovieCardState> {
    static contextType = OutsideClickContext;
    private wrapperRef: React.RefObject<HTMLInputElement>;

    constructor(props: IMovieCardProps) {
        super(props);
        this.wrapperRef = React.createRef();
        this.state = {
            isEditMenuVisible: false,
        };
    }

    handleClickOutside = (event: Event) => {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target as Node)) {
            this.hideEditMenu();
        }
    }

    showEditMenu = () => {
        this.setState({ isEditMenuVisible: true });
        this.context.setOutsideClickHandler(this.handleClickOutside);
    }

    hideEditMenu = () => {
        this.setState({ isEditMenuVisible: false });
        this.context.setOutsideClickHandler(null);
    }

    passInfo = (itemTitle: string) => () => {
        this.props.onClickMovie(itemTitle, this.props.movie.id, true);
        this.hideEditMenu();
    }

    render() {
        const listItems = menuItemTitles.map((itemTitle: string) => {
            return <li
                key={itemTitle}
                className={'menu__list-item'}
                onClick={this.passInfo(itemTitle)}>{ itemTitle }</li>
        });
    
        const menu = <div
            className={`${blockName}__menu menu`}
            ref={this.wrapperRef}>
            <button
                className={'menu__btn--close'}
                onClick={this.hideEditMenu}>
                <FontAwesomeIcon
                    className={'menu__icon'}
                    icon={faTimes}/>
            </button>
            <OverflowContext.Consumer>
                {() =>
                    <ul className={'menu__list'}>
                        { listItems }
                    </ul>
                }
            </OverflowContext.Consumer>
        </div>;

        const icon = <div
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
        </figure>
    }
}
