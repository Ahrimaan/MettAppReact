import React from 'react';
import { Route } from 'react-router-dom';
import component from './component';

const loginRoutes = (
    <Route exact path="/login" component={component} />
)

export default loginRoutes;