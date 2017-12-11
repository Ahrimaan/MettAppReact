import { LOGIN_SUCCESS, CURRENT_USER, LOGOUT } from './actionTypes';

export default function (state, action) {
    switch (action.type) {
        case CURRENT_USER:
        case LOGIN_SUCCESS: {
            return {
                mail:action.payload.email,
                picture:action.payload.picture,
                name:action.payload.name,
                id:action.payload.user_id
            } ;
        }
        case LOGOUT: {
            return null;
        }
        default:
            return state ? state : null;
    }
}