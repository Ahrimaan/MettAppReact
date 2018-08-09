import React from 'react';
import { Route } from 'react-router';
import listComponent from './appointment-list/container';

const appointmentRoutes = [
    <Route exact path="/home" component={listComponent} />
]

export default appointmentRoutes;