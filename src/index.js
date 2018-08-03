import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Container } from 'semantic-ui-react';
import { Switch } from 'react-router';
import { history, store } from './store';
import { ConnectedRouter } from 'connected-react-router';
import { initializeApp } from 'firebase/app';
// Import Components
import { HeaderComponent } from './headerbar';
import { LoaderComponent } from './shared';
import { TenantDialogComponent } from './tenant';

import config from './config';
import appRoutes from './appRoutes';

initializeApp(config.firebaseData);


ReactDOM.render(
  <Provider store={store}>

    <Container >

      <ConnectedRouter history={history}>
        <React.Fragment>
          <LoaderComponent />
          <HeaderComponent />
          <Switch children={appRoutes}>
          </Switch>
        </React.Fragment>
      </ConnectedRouter>
    </Container>
  </Provider>
  , document.querySelector('.application'));
