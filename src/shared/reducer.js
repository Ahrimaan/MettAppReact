import {
    LOGOUT,
    LOADING,
    LOGIN,
    USERINFORMATION_FETCHED
} from './actionTypes';

import _ from 'lodash';

const initialState = { loading: false };

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN:{
            if (action.payload) {
                let user = {};
                user.displayName = action.payload.displayName;
                user.email = action.payload.email;
                user.picture = action.payload.photoURL ? action.payload.photoURL : null;
                return Object.assign({},state,{ user: user , loading:false } );
            }
            return state;
        }
        case USERINFORMATION_FETCHED: {
            let newState = _.cloneDeep(state);
            newState.loading = false;
            Object.assign(newState.user,action.payload);
            return newState;
        }
        case LOADING: {
            return Object.assign({}, { loading: true });
        }
        case LOGOUT: {
            return initialState;
        }
        default:
            return state ? state : null;
    }
}