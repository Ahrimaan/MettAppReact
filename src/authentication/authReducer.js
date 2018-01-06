import {
    LOGIN_SUCCESS, CURRENT_USER, LOGOUT,
    USERINFORMATION_UPDATED, LOGIN_PROCCESING, USERINFORMATION_UPDATING, USERINFORMATION_UPDATED_FAILED
} from './actionTypes';

const initialState = {loading: false};

export default function (state = initialState, action) {
    switch (action.type) {
        case CURRENT_USER:
        case LOGIN_SUCCESS: {
            if (action.payload) {
                return {
                    mail: action.payload.email,
                    picture: action.payload.picture,
                    name: action.payload.name,
                    id: action.payload.user_id
                };
            }
            return state;
        }
        case USERINFORMATION_UPDATED: {
            return Object.assign({}, state, action.payload);
        }
        case USERINFORMATION_UPDATING:{
            return Object.assign({}, state, {loading: true});
        }
        case USERINFORMATION_UPDATED_FAILED: {
            return Object.assign({}, state, {loading: false});
        }
        case LOGOUT: {
            return null;
        }
        default:
            return state ? state : null;
    }
}