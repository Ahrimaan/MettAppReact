import {
    LOGOUT,
    LOADING,
    LOGGEDIN,
    LOGIN_COMPLETED,
    USERINFORMATION_FETCHED,
    HIDE_LOADER,
    SHOW_LOADER
} from './actionTypes';

import _ from 'lodash';

const initialState = { loading: false };

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGGEDIN:{
            if (action.payload) {
                let user = {};
                user.displayName = action.payload.displayName ? action.payload.displayName : action.payload.email;
                user.email = action.payload.email;
                user.picture = action.payload.photoURL ? action.payload.photoURL : null;
                user.id =  action.payload.uid;
                return Object.assign({},state,{ user: user} );
            }
            return state;
        }
        case USERINFORMATION_FETCHED: {
            let newState = _.cloneDeep(state);
            newState.loading = false;
            Object.assign(newState.user,action.payload);
            return newState;
        }
        case LOGIN_COMPLETED: {
            return Object.assign({},state, { loading: false });
        }
        case LOADING: {
            return Object.assign({}, { loading: true });
        }
        case LOGOUT: {
            return initialState;
        }
        case SHOW_LOADER: {
            let newstate = _.cloneDeep(state);
            newstate.loading = true;
            return newstate;
        }
        case HIDE_LOADER: {
            let newstate = _.cloneDeep(state);
            newstate.loading = false;
            return newstate;
        }
        default:
            return state ? state : null;
    }
}