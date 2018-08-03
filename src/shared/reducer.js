import {
    LOGOUT,
    LOADING,
    LOADING_FINISHED,
    LOGIN,
    USERINFORMATION_FETCHED
} from './actionTypes';

import _ from 'lodash';

const initialState = { loading: false };

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN:{
            if (action.payload) {
                let newState = _.cloneDeep(state);
                let user = {};
                user.displayName = action.payload.displayName;
                user.email = action.payload.email;
                user.picture = action.payload.photoURL ? action.payload.photoURL : null;
                return Object.assign({},state,{ user: user } );
            }
            return state;
        }
        case USERINFORMATION_FETCHED: {
            let newState = _.cloneDeep(state);
            Object.assign(newState.user,action.payload);
            return newState;
        }
        case LOADING: {
            return Object.assign({}, state, { loading: true });
        }
        case LOADING_FINISHED: {
            return Object.assign({}, state, { loading: false });
        }
        case LOGOUT: {
            return {};
        }
        default:
            return state ? state : null;
    }
}