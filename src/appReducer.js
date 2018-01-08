import {combineReducers} from 'redux';
import {AppStateReducer} from './shared';
import {AppointmentReducer} from './appointment';
import {TenantReducer} from './tenant';
import { appReducer } from './shared';

const rootReducer = combineReducers({
  appointment: AppointmentReducer,
  tenant:TenantReducer,
  app: appReducer
});

export default rootReducer;
