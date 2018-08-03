import {combineReducers} from 'redux';
import { AdminReducer } from './admin';
import {AppointmentReducer} from './appointment';
import {TenantReducer} from './tenant';
import { AppReducer } from './shared';

const rootReducer = combineReducers({
  appointment: AppointmentReducer,
  tenant:TenantReducer,
  app: AppReducer,
  admin: AdminReducer
});

export default rootReducer;
