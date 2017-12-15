import { LOGIN_SUCCESS, CURRENT_USER, LOGOUT } from './actionTypes';

const initialState = null;

export default function (state = initialState, action) {
    switch (action.type) {
        case CURRENT_USER:
        case LOGIN_SUCCESS: {
            if(action.payload){
                return {
                    mail:action.payload.email,
                    picture:action.payload.picture,
                    name:action.payload.name,
                    id:action.payload.user_id
                };
            }    
            return state;      
        }
        case LOGOUT: {
            return null;
        }
        default:
            return state ? state : null;
    }
}