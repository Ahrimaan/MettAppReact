import {
    LOGIN_SUCCESS, CURRENT_USER, LOGOUT,
    USERINFORMATION_UPDATED,
    LOGIN_PROCCESING,
    USERINFORMATION_UPDATING,
    USERINFORMATION_UPDATED_FAILED,
    LOADING,
    LOADING_FINISHED
} from './actionTypes';

const initialState = {};

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
                if(action.payload.tenant) {
                    newState.tenant = action.payload.tenant
                }
                return Object.assign({},state,{ user: newState} );
            }
            return state;
        }
        case USERINFORMATION_UPDATED: {
            return Object.assign({}, state, action.payload);
        }
        case USERINFORMATION_UPDATED_FAILED: {
            // SHow Error
        }
        case LOGOUT: {
            return null;
        }
        default:
            return state ? state : null;
    }
}