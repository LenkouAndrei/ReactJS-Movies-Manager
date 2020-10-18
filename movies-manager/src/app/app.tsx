import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ErrorBoundary, SearchPage, DetailsPage, NotFoundPage } from '../containers';
import { Footer } from '../containers';
import './app.scss';

function App(): JSX.Element {
  return (
    <React.StrictMode>
      <ErrorBoundary>
        <Router>
          <Switch>
            <Route exact={true} path='/' component={SearchPage} />
            <Route path='/search' component={SearchPage} />
            <Route path='/search/:query' component={SearchPage} />
            <Route path='/film/:id' component={DetailsPage} />
            <Route path='*' component={NotFoundPage} />
          </Switch>
        </Router>
        <Footer />
      </ErrorBoundary>
    </React.StrictMode>
  );
}

export default App;