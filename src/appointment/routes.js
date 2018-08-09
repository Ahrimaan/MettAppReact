import React from 'react';
import { Route } from 'react-router-dom';
import listComponent from './appointment-list/container';
import detailComponent from './appointment-detail/component';

const appointmentRoutes = [
    <Route path="/home/id" component={detailComponent} />,
    <Route exact path="/home" component={listComponent} />
]

export default appointmentRoutes;