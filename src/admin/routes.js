import React from 'react';
import { Route } from 'react-router';
import component from './component';

const adminRoutes = (
    <Route path="/admin" component={component} />
)

export default adminRoutes;