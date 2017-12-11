import { combineReducers } from 'redux';
import { AuthReducer } from './shared';
import { AppointmentReducer  } from './appointment';

const rootReducer = combineReducers({
  profile: AuthReducer,
  appointment: AppointmentReducer
});

export default rootReducer;
