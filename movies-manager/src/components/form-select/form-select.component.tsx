import React, { Component, ChangeEvent } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import "./form-select.component.scss";

interface ISelectFormState {
    genres: string[],
    selectedGenres: string[],
    isOpen: boolean;
}

interface ISelectFormProps {
    onApplyGenres: (newGenres: string[]) => void;
    genres: string[];
}

const allGenres = [
    'Adventure',
    'Horror',
    'Comedy',
    'Family',
    'Drama',
    'Romance',
];

const blockName = 'form-select';

export class FormSelect extends Component<ISelectFormProps, ISelectFormState> {
    constructor(props: ISelectFormProps) {
        super(props);
        this.state = {
            genres: Array.from(new Set([ ...allGenres, ...this.props.genres ])),
            selectedGenres: this.props.genres,
            isOpen: false,
        }
    }

    toggleSelectDropdown = (event: any): void => {
	    event.preventDefault();
	    event.stopPropagation();
        if (!this.state.isOpen) {
            this.setState({ isOpen: true });
        } else {
            this.setState({ isOpen: false });
            this.props.onApplyGenres(this.state.selectedGenres);
        }
    }

    handleCheckboxChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        const { checked, name } = target;
        const selectedGenres = checked ? [ ...this.state.selectedGenres, name ] :
            this.state.selectedGenres.filter(genre => genre !== name);
        this.setState({ selectedGenres });
    }

    render(): JSX.Element {
        const genresList = this.state.genres.map(genre => {
            return <li
                className={`${blockName}__item`}
                key={genre}>
                <label className={`${blockName}__label`}>
                    <input
                        className={`${blockName}__checkbox`}
                        type="checkbox"
                        name={genre}
                        checked={this.state.selectedGenres.includes(genre)}
                        onChange={ this.handleCheckboxChange}/>
                    {genre}
                </label>
            </li>;
        })
        return <>
            <button
                className={`${blockName}__btn`}
                onClick={this.toggleSelectDropdown}>
                <span className={`${blockName}__chosen-items`}>
                    { this.state.selectedGenres.join(', ') || 'Select Genre' }
                </span>
                <FontAwesomeIcon
                    className={`${blockName}__icon`}
                    icon={faAngleDown}
                    size='lg'/>
            </button>
            { this.state.isOpen && <ul className={`${blockName}__list`}>
                { genresList }
            </ul>}
        </>
    }
}