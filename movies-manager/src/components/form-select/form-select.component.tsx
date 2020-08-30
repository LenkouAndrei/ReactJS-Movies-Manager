import React, { ChangeEvent, Component } from 'react';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './form-select.component.scss';

interface ISelectFormState {
    genres: string[];
    selectedGenres: string[];
    isOpen: boolean;
}

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

export class FormSelect extends Component<ISelectFormProps, ISelectFormState> {
    constructor(props: ISelectFormProps) {
        super(props);
        this.state = {
            genres: Array.from(new Set([ ...allGenres, ...this.props.genres ])),
            selectedGenres: this.props.genres,
            isOpen: false,
        };
    }

    public toggleSelectDropdown = (event: React.MouseEvent): void => {

	    event.preventDefault();
        event.stopPropagation();

        if ( !this.state.isOpen ) {
            this.setState({ isOpen: true });
        } else {
            this.setState({ isOpen: false });
            this.props.onApplyGenres(this.state.selectedGenres);
        }
    }

    public handleCheckboxChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        const { checked, name } = target;
        const selectedGenres: string[] = checked ? [ ...this.state.selectedGenres, name ] :
            this.state.selectedGenres.filter(genre => genre !== name);
        this.setState({ selectedGenres });
    }

    public render(): JSX.Element {
        const genresList: JSX.Element[] = this.state.genres.map(genre => {
            return <li
                className={`${blockName}__item`}
                key={genre}>
                <label className={`${blockName}__label`}>
                    <input
                        className={`${blockName}__checkbox`}
                        type='checkbox'
                        name={genre}
                        checked={this.state.selectedGenres.includes(genre)}
                        onChange={ this.handleCheckboxChange}/>
                    {genre}
                </label>
            </li>;
        });
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
        </>;
    }
}