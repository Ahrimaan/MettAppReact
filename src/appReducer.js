import {combineReducers} from 'redux';
import {AppStateReducer} from './shared';
import {AppointmentReducer} from './appointment';
import {TenantReducer} from './tenant';
import { appReducer } from './shared';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  appointment: AppointmentReducer,
  tenant:TenantReducer,
  app: appReducer,
  routerReducer
});

export default rootReducer;
