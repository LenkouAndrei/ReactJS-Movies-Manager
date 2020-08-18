import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import "./form-select.component.scss";

interface IGenreWithState {
    isChecked: boolean;
    label: string;
};

interface ISelectFormState {
    genres: IGenreWithState[],
    selectedGenreLabel: string,
    isOpen: boolean;
}

const allGenres = [
    'Adventure',
    'Horror',
    'Comedy',
    'Family',
    'Drama',
    'Romance'
];

const blockName = 'form-select';

export class FormSelect extends Component<{genres: string[]}, ISelectFormState> {
    constructor(props: {genres: string[]}) {
        super(props);
        const modifiedGenres = allGenres.map((label: string) => {
            return {
                label,
                isChecked: props.genres.includes(label),
            }
        });
        this.state = {
            genres: modifiedGenres,
            selectedGenreLabel: modifiedGenres
                .filter(({ isChecked }: IGenreWithState) => isChecked)
                .map(({ label }: IGenreWithState) => label).join(', ') || 'Select Genre',
            isOpen: false,
        }
    }

    openSelectDropdown = (): void => {
        this.setState({ ...this.state, isOpen: true });
    }

    componentWillUnmount() {
        console.log("Smth ent wrong");
      }

    render(): JSX.Element {
        const genresList = this.state.genres.map((genre: IGenreWithState) => {
            return <li
                className={`${blockName}__item`}
                key={genre.label}>
                <label className={`${blockName}__label`}>
                    <input
                        className={`${blockName}__checkbox`}
                        type="checkbox"
                        checked={genre.isChecked}/>
                    {genre.label}
                </label>
            </li>;
        })
        return <>
            <button
                className={`${blockName}__btn`}
                onClick={this.openSelectDropdown}>
                <span className={`${blockName}__label`}>
                    { this.state.selectedGenreLabel }
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