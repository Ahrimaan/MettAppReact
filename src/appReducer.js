import {combineReducers} from 'redux';
import {AppStateReducer} from './shared';
import {AuthReducer} from './authentication';
import {AppointmentReducer} from './appointment';
import {TenantReducer} from './tenant';

const rootReducer = combineReducers({
  auth: AuthReducer,
  appointment: AppointmentReducer,
  tenant:TenantReducer
});

export default rootReducer;
