import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import promise from 'redux-promise';
import logger from 'redux-logger'
import appReducer from './appReducer';
import { Grid } from 'material-ui';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { HeaderComponent } from './headerbar';
import appRoutes from './appRoutes';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(appReducer, /* preloadedState, */ composeEnhancers(
  applyMiddleware(thunkMiddleware, promise, logger)
));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Grid container className="root">
        <Grid item="true" xs={12} >
          <HeaderComponent />
        </Grid>
        <Switch children={appRoutes}>

        </Switch>
      </Grid>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.application'));
