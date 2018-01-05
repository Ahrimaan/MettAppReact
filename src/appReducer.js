import { combineReducers } from 'redux';
import { AppStateReducer } from './shared';
import { AuthReducer } from './authentication';
import { AppointmentReducer  } from './appointment';

const rootReducer = combineReducers({
  auth: AuthReducer,
  appointment: AppointmentReducer,
  appState:AppStateReducer
});

export default rootReducer;
