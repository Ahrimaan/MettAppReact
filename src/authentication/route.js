import React from 'react';
import { Route } from 'react-router-dom';
import component from './component';

const authenticationRoutes = (
    <Route path="/login" component={component} />
)

export default authenticationRoutes;