import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import promise from 'redux-promise';
import logger from 'redux-logger'
import { Container } from 'semantic-ui-react';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'
import { Switch } from 'react-router';
import createHistory from 'history/createBrowserHistory'

// Import Components
import { HeaderComponent } from './headerbar';
import { TenantDialogComponent } from './tenant';
import { LoaderComponent } from './shared';

import appRoutes from './appRoutes';
import appReducer from './appReducer';

const history = createHistory({forceRefresh:false});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(appReducer, /* preloadedState, */ composeEnhancers(
  applyMiddleware(thunkMiddleware, promise, logger,routerMiddleware(history))
));

const ConnectedSwitch = connect(state => ({
  location: state.location
}))(Switch)



ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={ history }>
      <Container >
        <TenantDialogComponent />
         <LoaderComponent />
         <HeaderComponent />
        <ConnectedSwitch children={appRoutes}>

        </ConnectedSwitch>
      </Container>
    </ConnectedRouter>
  </Provider>
  , document.querySelector('.application'));
