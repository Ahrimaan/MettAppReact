import React from 'react';
import { Route } from 'react-router-dom';
import component from './appointment-list/list';

const appointmentRoutes = [
    <Route path="/home" component={component} />,
    <Route path="/home/id" component={component} />
]

export default appointmentRoutes;