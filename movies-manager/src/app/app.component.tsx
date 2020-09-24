import React, { useState } from 'react';
import { Details } from "../components";
import { movie } from "../components/details/mockMovie";
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
        <Header onAddBtnClick={setNewMovie} pageName={PageName.Main}/>
        <Main movieToAdd={newMovie}/>
        <Details {...movie}/>
        <Footer />
      </ErrorBoundary>
    </React.StrictMode>
  );
}

export default AppComponent;