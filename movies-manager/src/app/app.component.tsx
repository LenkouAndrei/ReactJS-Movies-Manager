import React, { Component } from 'react';
import {
  ErrorBoundary,
  Footer,
  FormPage,
  Header,
  Main,
  PageName,
} from '../containers';
import { IMovie, TNullable } from '../types/types';
import './app.component.scss';

type TUpdateNewMovie = (newMovie: IMovie) => void;

const movieToEdit: IMovie = {
  'id': 337167,
  'title': 'Fifty Shades Freed',
  'tagline': 'Don\'t miss the climax',
  'vote_average': 6.1,
  'vote_count': 1195,
  'release_date': '2018-02-07',
  'poster_path': 'https://image.tmdb.org/t/p/w500/3kcEGnYBHDeqmdYf8ZRbKdfmlUy.jpg',
  'overview': 'Believing they have left behind shadowy figures from their past, newlyweds Christian and Ana fully embrace an inextricable connection and shared life of luxury. But just as she steps into her role as Mrs. Grey and he relaxes into an unfamiliar stability, new threats could jeopardize their happy ending before it even begins.',
  'budget': 55000000,
  'revenue': 136906000,
  'genres': [
      'Drama',
      'Romance'
  ],
  'runtime': 106,
};

interface IAppState {
  pageName: PageName;
  newMovie: TNullable<IMovie>;
}

class AppComponent extends Component<{}, IAppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      pageName: PageName.Main,
      newMovie: null,
    };
  }

  public updateNewMovie: TUpdateNewMovie = (newMovie: IMovie) => {
    this.setState({ newMovie });
  }

  public render(): JSX.Element {
    let mainContent: TNullable<JSX.Element> = null;
    switch ( this.state.pageName ) {
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
          <Header onAddBtnClick={this.updateNewMovie} pageName={this.state.pageName}/>
          { mainContent }
          {/* <DeleteModal /> */}
          <Footer />
        </ErrorBoundary>
      </React.StrictMode>
    );
  }
}
export default AppComponent;