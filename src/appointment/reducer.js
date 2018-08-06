import { FETCHED_DATA, FETCHING_DATA, APPOINTMENT_ADDED } from './action-types';

const initialState = { loading: false };

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCHING_DATA: {
            return Object.assign({}, state, { loading: true });
        }
        case FETCHED_DATA: {
            return Object.assign({}, state, { loading: false, events: action.payload });
        }
        case APPOINTMENT_ADDED: {
            let newState = _.cloneDeep(state);
            if(newState.events) {
                newState.events.push(action.payload);
            } else {
                newState.events = new Array(action.payload);
            }
            return newState;
        }
        default:
            return state;
    }
}