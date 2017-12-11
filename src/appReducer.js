import { combineReducers } from 'redux';
import { AuthReducer } from './authentication';
import { AppointmentReducer  } from './appointment';

const rootReducer = combineReducers({
  profile: AuthReducer,
  appointment: AppointmentReducer
});

export default rootReducer;
