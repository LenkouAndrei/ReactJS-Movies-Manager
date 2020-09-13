import React, { Component, ChangeEvent, FormEvent, MouseEvent } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { IMovie } from "../../types/types";
import { FormSelect } from "../../components";
import { defaultMovie } from "./mockDefaultMovie";
import "./form-page.component.scss";

interface ISaveChanges {
    movie: IMovie;
	onSaveChanges: (editableMovie: IMovie) => void;
}

const blockName = 'form';

const url: string = '';

export class FormPage extends Component<ISaveChanges, any> {
    private readonly startState: IMovie;
    constructor(props: ISaveChanges) {
        super(props);
        this.startState = { ...defaultMovie, ...this.props.movie};
        this.state = { ...defaultMovie, ...this.props.movie};
    }

    handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const name = event.target.name as keyof IMovie | 'url';
        if (name === 'url') {
            console.log('url value ', value);
            return;
        }

        this.setState({ [name]: value });
    }

    updateGenres = (newGenres: string[]) => {
        this.setState({ genres: newGenres });
    }

    handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        this.props.onSaveChanges(this.state as IMovie);
    }

    resetState = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        this.setState({ ...this.startState });
    }

    render() {
        const movieIdField = this.state.id && <div className={`${blockName}__field-wrapper`}>
            <div className={`${blockName}__title`}>movie id</div>
            <div className={`${blockName}__text`}>{this.state.id}</div>
        </div>;

        return <form
            className={blockName}
            onSubmit={this.handleSubmit}>
            <h2 className={`${blockName}__headline`}>Edit Movie</h2>
            { movieIdField }
            <div className={`${blockName}__field-wrapper`}>
                <label
                    htmlFor="title"
                    className={`${blockName}__label`}>title</label>
                <input
                    id="title"
                    className={`${blockName}__input`}
                    name="title"
                    type="text"
                    value={this.state.title}
                    onChange={this.handleChange}/>
            </div>
            <div className={`${blockName}__field-wrapper`}>
                <label
                    htmlFor="releaseDate"
                    className={`${blockName}__label`}>release date</label>
                <input
                    id="releaseDate"
                    className={`${blockName}__input`}
                    name="release_date"
                    type="text"
                    value={this.state.release_date}
                    onChange={this.handleChange}/>
                <FontAwesomeIcon
                    className={`${blockName}__icon--bright`}
                    icon={faCalendar}/>
            </div>
            <div className={`${blockName}__field-wrapper`}>
                <label
                    htmlFor="movieUrl"
                    className={`${blockName}__label`}>movie url</label>
                <input
                    id="movieUrl"
                    className={`${blockName}__input`}
                    name="url"
                    type="text"
                    value={url || 'Url here'}
                    onChange={this.handleChange}/>
            </div>
            <div className={`${blockName}__field-wrapper`}>
                <div className={`${blockName}__title`}>genre</div>
                <FormSelect
                    onApplyGenres={this.updateGenres}
                    genres={this.state.genres}/>
            </div>
            <div className={`${blockName}__field-wrapper`}>
                <label
                    htmlFor="overview"
                    className={`${blockName}__label`}>overview</label>
                <input
                    id="overview"
                    className={`${blockName}__input`}
                    name="overview"
                    type="text"
                    value={this.state.overview}
                    onChange={this.handleChange}/>
            </div>
            <div className={`${blockName}__field-wrapper`}>
                <label
                    htmlFor="runtime"
                    className={`${blockName}__label`}>runtime</label>
                <input
                    id="runtime"
                    className={`${blockName}__input`}
                    name="runtime"
                    type="text"
                    value={this.state.runtime}
                    onChange={this.handleChange}/>
            </div>
            <div className={`${blockName}__btn-wrapper`}>
                <button
                    onClick={this.resetState}
                    className={`${blockName}__btn--reset`}>
                        Reset
                </button>
                <input
                    className={`${blockName}__btn--save`}
                    type="submit"
                    value="Save" />
            </div>
        </form>;
    }
}
