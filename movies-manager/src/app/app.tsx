import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ErrorBoundary, SearchPage, DetailsPage, NotFoundPage } from '../containers';
import './app.scss';

function App(): JSX.Element {
  return (
    <Switch>
      <Route exact path="/" component={SearchPage} />
      <Route path="/film" component={DetailsPage} />
      <Route path="*" component={NotFoundPage} />
    </Switch>
  );
}

export default App;