import React from 'react';
import { Route } from 'react-router-dom';
import component from './appointment-list/component';

const appointmentRoutes = (
    <Route>
        <Route path="/home" component={component} />
    </Route>
)

export default appointmentRoutes;