import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Container } from 'semantic-ui-react';
import { BrowserRouter } from 'react-router-dom'
import { Switch } from 'react-router';
import { history, store } from './store';
import { initializeApp } from 'firebase/app';
// Import Components
import { HeaderComponent } from './headerbar';
import { LoaderComponent } from './shared';
import config from './config';
import appRoutes from './appRoutes';

initializeApp(config.firebaseData);


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Container >
        <LoaderComponent />
        <HeaderComponent />
        <Switch children={appRoutes}>
        </Switch>
      </Container>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.application'));
