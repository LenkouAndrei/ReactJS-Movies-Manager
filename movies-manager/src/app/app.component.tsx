import React, { useState } from 'react';
import {
  ErrorBoundary,
  Footer,
  Header,
  Main,
  PageName,
} from '../containers';
import './app.component.scss';

function AppComponent(): JSX.Element {
  const [newMovie, setNewMovie] = useState(null);
  const [page, _setPage] = useState(PageName.Main);

  return (
    <React.StrictMode>
      <ErrorBoundary>
        <Header onAddBtnClick={setNewMovie} pageName={page}/>
        <Main movieToAdd={newMovie}/>
        <Footer />
      </ErrorBoundary>
    </React.StrictMode>
  );
}

export default AppComponent;