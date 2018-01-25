import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'
import { Switch } from 'react-router';
import {history, store } from './store';

// Import Components
import { HeaderComponent } from './headerbar';
import { TenantDialogComponent } from './tenant';
import { LoaderComponent } from './shared';

import appRoutes from './appRoutes';

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
