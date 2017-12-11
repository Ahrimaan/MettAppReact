import { LOGIN_SUCCESS, CURRENT_USER, LOGOUT } from './actionTypes';

export default function (state, action) {
    switch (action.type) {
        case CURRENT_USER:
        case LOGIN_SUCCESS: {
            return {
                mail:action.payload.email,
                picture:action.payload.photoURL,
                name:action.payload.displayName,
                id:action.payload.uid
            } ;
        }
        case LOGOUT: {
            return null;
        }
        default:
            return state ? state : null;
    }
}