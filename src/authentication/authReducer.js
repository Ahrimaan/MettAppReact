import {
    LOGIN_SUCCESS, CURRENT_USER, LOGOUT,
    USERINFORMATION_UPDATED, LOGIN_PROCCESING, USERINFORMATION_UPDATING, USERINFORMATION_UPDATED_FAILED
} from './actionTypes';

const initialState = null;

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
            //BUG
            //not reasigning until it is not possible to get the last state :(
            //return Object.assign({}, state, action.payload);
        }
        case USERINFORMATION_UPDATING:{
            
        }
        case USERINFORMATION_UPDATED_FAILED: {
            
        }
        case LOGOUT: {
            return null;
        }
        default:
            return state ? state : null;
    }
}