import React from 'react';
import { Route } from 'react-router-dom';
import login from './loginComponent';
import create from './createComponent';

const loginRoutes = [
    <Route exact path="/login" component={login} />,
    <Route exact path="/login/new" component={create} />,
]

export default loginRoutes;