import React, { Component } from "react";
import {
  Footer,
  Header,
  PageName,
  Main,
  ErrorBoundary,
  FormPage
} from "../containers";
import { TNullable, IMovie } from '../types/types';
import "./app.component.scss";

const movieToEdit: IMovie = {
  "id": 337167,
  "title": "Fifty Shades Freed",
  "tagline": "Don't miss the climax",
  "vote_average": 6.1,
  "vote_count": 1195,
  "release_date": "2018-02-07",
  "poster_path": "https://image.tmdb.org/t/p/w500/3kcEGnYBHDeqmdYf8ZRbKdfmlUy.jpg",
  "overview": "Believing they have left behind shadowy figures from their past, newlyweds Christian and Ana fully embrace an inextricable connection and shared life of luxury. But just as she steps into her role as Mrs. Grey and he relaxes into an unfamiliar stability, new threats could jeopardize their happy ending before it even begins.",
  "budget": 55000000,
  "revenue": 136906000,
  "genres": [
      "Drama",
      "Romance"
  ],
  "runtime": 106,
};

interface IAppState {
	pageName: PageName;
	newMovie: TNullable<IMovie>;
}

class AppComponent extends Component<{}, IAppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      pageName: PageName.Main,
      newMovie: null,
    };
  }

  updateNewMovie(newMovie: IMovie) {
    this.setState({ newMovie });
  }

  render() {
    let mainContent: TNullable<JSX.Element> = null;
    switch(this.state.pageName) {
      case PageName.Main:
        mainContent = <Main movieToAdd={this.state.newMovie}/>;
        break;
      case PageName.AddForm:
        mainContent = <FormPage {...null}/>;
      default:
          break;
    }
    return (
      <React.StrictMode>
        <ErrorBoundary>
          <Header onAddBtnClick={this.updateNewMovie.bind(this)} pageName={this.state.pageName}/>
          { mainContent }
          <Footer />
        </ErrorBoundary>
      </React.StrictMode>
    );
  }
}
export default AppComponent;