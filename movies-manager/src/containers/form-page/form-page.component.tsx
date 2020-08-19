import React, { Component } from "react";
import { Wrapper } from "../wrapper/wrapper.component";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { IMovie } from "../../types/types";
import { FormSelect } from "../../components";
import "./form-page.component.scss";

const blockName = 'form';

const defaultMovie: IMovie = {
    title: '',
    tagline: '',
    vote_average: 0,
    vote_count: 0,
    release_date: '',
    poster_path: '',
    overview: '',
    budget: 0,
    revenue: 0,
    genres: [],
    runtime: 0,
};

const url: string = '';

export class FormPage extends Component<{}, IMovie> {
    constructor(props: IMovie) {
        super(props);
        this.state = { ...defaultMovie, ...props};
    }

    render() {
        const genres: JSX.Element[] = this.state.genres.map((genre: string) => {
            return <option value={genre}>{ genre }</option>
        });

        const movieIdField = this.state.id && <div className={`${blockName}__field-wrapper`}>
            <div className={`${blockName}__title`}>movie id</div>
            <div className={`${blockName}__text`}>{this.state.id}</div>
        </div>

        return <form  className={blockName}>
            <h2 className={`${blockName}__headline`}>Edit Movie</h2>
            { movieIdField }
            <div className={`${blockName}__field-wrapper`}>
                <label
                    htmlFor="title"
                    className={`${blockName}__label`}>title</label>
                <input
                    id="title"
                    className={`${blockName}__input`}
                    type="text"
                    value={this.state.title || ''}
                    placeholder="Title here"/>
            </div>
            <div className={`${blockName}__field-wrapper`}>
                <label
                    htmlFor="releaseDate"
                    className={`${blockName}__label`}>release date</label>
                <input
                    id="releaseDate"
                    className={`${blockName}__input`}
                    type="text"
                    value={this.state.release_date || ''}
                    placeholder="Select date"/>
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
                    type="text"
                    value={url || ''}
                    placeholder="Url here"/>
            </div>
            <div className={`${blockName}__field-wrapper`}>
                <div className={`${blockName}__title`}>genre</div>
                <FormSelect genres={this.state.genres}/>
            </div>
            <div className={`${blockName}__field-wrapper`}>
                <label
                    htmlFor="overview"
                    className={`${blockName}__label`}>overview</label>
                <input
                    id="overview"
                    className={`${blockName}__input`}
                    type="text"
                    value={this.state.overview || ''}
                    placeholder="Overview here"/>
            </div>
            <div className={`${blockName}__field-wrapper`}>
                <label
                    htmlFor="runtime"
                    className={`${blockName}__label`}>runtime</label>
                <input
                    id="runtime"
                    className={`${blockName}__input`}
                    type="text"
                    value={this.state.runtime || ''}
                    placeholder="Runtime here"/>
            </div>
            <div className={`${blockName}__btn-wrapper`}>
                <button className={`${blockName}__btn--reset`}>
                    Reset
                </button>
                <button className={`${blockName}__btn--save`}>
                    Save
                </button>
            </div>
        </form>;
    }
}