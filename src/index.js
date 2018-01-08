import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import promise from 'redux-promise';
import logger from 'redux-logger'
import { Container } from 'semantic-ui-react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Import Components
import { HeaderComponent } from './headerbar';
import { TenantDialogComponent } from './tenant';

import appRoutes from './appRoutes';
import appReducer from './appReducer';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(appReducer, /* preloadedState, */ composeEnhancers(
  applyMiddleware(thunkMiddleware, promise, logger)
));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Container >
         <HeaderComponent />
         <TenantDialogComponent/>
        <Switch children={appRoutes}>

        </Switch>
      </Container>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.application'));
