import { Route } from 'react-router-dom';
import { AuthRoutes } from './authentication';
import { AppointmentRoutes } from './appointment';

const routes = [
    AuthRoutes,
    AppointmentRoutes
];

export default routes;