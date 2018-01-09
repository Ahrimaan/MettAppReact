import {
    LOGIN_SUCCESS, CURRENT_USER, LOGOUT,
    USERINFORMATION_UPDATED,
    LOGIN_PROCCESING,
    USERINFORMATION_UPDATING,
    USERINFORMATION_UPDATED_FAILED,
    LOADING,
    LOADING_FINISHED
} from './actionTypes';

import _ from 'lodash';

const initialState = { loading: false };

export default function (state = initialState, action) {
    switch (action.type) {
        case CURRENT_USER:
        case LOGIN_SUCCESS: {
            if (action.payload) {
                let newState = {
                    mail: action.payload.email,
                    picture: action.payload.picture,
                    name: action.payload.name,
                    id: action.payload.user_id
                };
                if (action.payload.tenant) {
                    newState.tenant = action.payload.tenant
                }
                return Object.assign({},state,{ user: newState } );
            }
            return state;
        }
        case USERINFORMATION_UPDATED: {
            let newState = {
                mail: state.user.mail,
                picture: state.user.picture,
                name: state.user.name,
                id: state.user.id,
                tenant: action.payload
            };
            return Object.assign({},state,{ user: newState } );
        }
        case USERINFORMATION_UPDATED_FAILED: {
            // SHow Error
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