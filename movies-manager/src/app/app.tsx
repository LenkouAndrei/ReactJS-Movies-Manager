import React, { useState } from 'react';
import {
  ErrorBoundary,
  Footer,
  Header,
  MainWithState,
  PageName,
} from '../containers';
import { IMovie } from '../types/types';
import './app.scss';
import { getMoviesFromServer } from '../service/movies.servce';

getMoviesFromServer();

function App(): JSX.Element {
  const [newMovie, setNewMovie] = useState(null);
  const [pageName, setPageName] = useState(PageName.Main);
  const [areDetailsVisible, setAreDetailsVisible] = useState(false);

  const changePage = () => {
    setPageName(PageName.Details);
    setAreDetailsVisible(true);
  };

  const clickSearchBtn = () => {
    setPageName(PageName.Main);
    setAreDetailsVisible(false);
  };

  const defaultMovies: IMovie[] = require('../data.json');

  return (
    <React.StrictMode>
      <ErrorBoundary>
        <Header
          onAddBtnClick={setNewMovie}
          onSearchBtnClick={clickSearchBtn}
          pageName={pageName}/>
        <MainWithState
          moviesStore={defaultMovies}
          movieToAdd={newMovie}
          areDetailsVisible={areDetailsVisible}
          onChangePage={changePage}
        />
        <Footer />
      </ErrorBoundary>
    </React.StrictMode>
  );
}

export default App;