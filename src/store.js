import { createStore, applyMiddleware, compose } from 'redux';
import appReducer from './appReducer';
import promise from 'redux-promise';
import logger from 'redux-logger'
import thunk from 'redux-thunk';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(appReducer, /* preloadedState, */ composeEnhancers(
    applyMiddleware(promise, logger, thunk)
  ));

export {
    store as store
};