import { FETCHED_DATA, FETCHING_DATA, APPOINTMENT_ADDED, De, APPOINTMENT_DELETED, JOIN_APPOINTMENT } from './action-types';

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
        case JOIN_APPOINTMENT: {
            let newState = _.cloneDeep(state);
            let event = newState.events[action.payload.id];

            let collection = [];
            if(event.joiner) {
                collection = event.joiner;
            }
            collection.add(action.payload.data);
            newState.events = collection;
            return newState;
        }
        case APPOINTMENT_DELETED: {
            let newState = _.cloneDeep(state);
            newState.events = newState.events.filter(item => item.id != action.payload );
            return newState;
        }
        default:
            return state;
    }
}