import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from './redux/store/store';
import App from './app/app';

ReactDom.render(
    <Router>
        <Provider store={store}>
            <App />
        </Provider>
    </Router>,
    document.querySelector('#root')
);