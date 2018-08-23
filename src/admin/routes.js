import React from 'react';
import { Route } from 'react-router';
import paypal from './paypalComponent';
import admineventComponent from './eventComponent';

const adminRoutes = [
    <Route exact path="/admin/paypal" component={paypal} />,
    <Route exact path="/admin/event/:id" component={admineventComponent} />
]

export default adminRoutes;