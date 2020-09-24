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

  return (
    <React.StrictMode>
      <ErrorBoundary>
        <Header onAddBtnClick={setNewMovie} pageName={PageName.Details}/>
        <Main movieToAdd={newMovie}/>
        <Footer />
      </ErrorBoundary>
    </React.StrictMode>
  );
}

export default AppComponent;