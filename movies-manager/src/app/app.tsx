import React, { useEffect, useState } from 'react';
import {
  ErrorBoundary,
  Footer,
  Header,
  MainWithState,
  PageName,
} from '../containers';
import './app.scss';

const md = require('../../server/src/data/movies.json');
function App(): JSX.Element {
  const [newMovie, setNewMovie] = useState(null);
  const [pageName, setPageName] = useState(PageName.Main);
  const [areDetailsVisible, setAreDetailsVisible] = useState(false);
  const [isInit, setIsInit] = useState(false);

  useEffect(
    () => {
      
    }, [isInit]
  );
  console.log(md.length);

  const changePage = () => {
    setPageName(PageName.Details);
    setAreDetailsVisible(true);
  };

  const clickSearchBtn = () => {
    setPageName(PageName.Main);
    setAreDetailsVisible(false);
  };

  return (
    <React.StrictMode>
      <ErrorBoundary>
        <Header
          onAddBtnClick={setNewMovie}
          onSearchBtnClick={clickSearchBtn}
          pageName={pageName}/>
        <MainWithState
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