import { createStore, applyMiddleware, compose } from 'redux';
import { createBrowserHistory } from 'history';
import {connectRouter, routerMiddleware } from 'connected-react-router';
import appReducer from './appReducer';
import logger from 'redux-logger'
import thunk from 'redux-thunk';

const history = createBrowserHistory();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    connectRouter(history)(appReducer),
     /* preloadedState, */ composeEnhancers(
    applyMiddleware(thunk, logger, routerMiddleware(history))
  ));

export {
    store as store,
    history as history
};