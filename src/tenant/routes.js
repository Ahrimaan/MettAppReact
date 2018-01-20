import React from 'react';
import { Route } from 'react-router-dom';
import component from './tenantComponent';

const tenantRoutes = (
    <Route path="/tenant" component={component} />
)

export default tenantRoutes;