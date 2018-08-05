import { FETCHED_DATA, FETCHING_DATA } from './action-types';

const initialState = { loading: false };

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCHING_DATA: {
            return Object.assign({}, state, { loading: true });
        }
        case FETCHED_DATA: {
            return Object.assign({}, state, { loading: false, events: action.payload });
        }
        default:
            return state;
    }
}