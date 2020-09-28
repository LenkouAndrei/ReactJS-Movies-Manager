import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { devToolsEnhancer } from 'redux-devtools-extension';
import { rootReducerApp } from '../reducers/root.reducer';

export const store = compose(
    applyMiddleware(thunk),
    devToolsEnhancer({})
)(createStore)(rootReducerApp);