import createHistory from 'history/createBrowserHistory'
import { createStore, applyMiddleware, compose } from 'redux';
import appReducer from './appReducer';
import thunkMiddleware from 'redux-thunk';
import promise from 'redux-promise';
import logger from 'redux-logger'
import { routerMiddleware } from 'react-router-redux'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const history = createHistory({forceRefresh:false});
const store = createStore(appReducer, /* preloadedState, */ composeEnhancers(
    applyMiddleware(thunkMiddleware, promise, logger,routerMiddleware(history))
  ));

export {
    store as store,
    history as history
};