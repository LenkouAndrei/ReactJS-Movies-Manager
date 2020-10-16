import React from 'react';
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';
import { ErrorBoundary, SearchPage, DetailsPage, NotFoundPage } from '../containers';
import { Footer } from '../containers';
import './app.scss';

function App(): JSX.Element {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={SearchPage} />
          <Route path="/search/:query" component={SearchPage} />
          <Route path="/film/:id" component={DetailsPage} />
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </Router>
      <Footer />
    </>
  );
}

export default App;