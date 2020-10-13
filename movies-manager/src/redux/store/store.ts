import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducerApp } from '../reducers/root.reducer';

export const store = compose(
    composeWithDevTools(applyMiddleware(thunk)),
)(createStore)(rootReducerApp);