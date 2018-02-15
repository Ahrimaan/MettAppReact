import React from 'react';
import { Route } from 'react-router-dom';
import component from './tenantComponent';

const appointmentRoutes = (
    <Route path="/tenant" component={component} />
)

export default appointmentRoutes;