import { CURRENT_USER, LOGIN_FAILURE, LOGIN_SUCCESS, LOGIN_WITH_GOOGLE, LOGOUT, LOGIN_PROCCESING } from './actionTypes';
import { getCurrentProfile, login, logout } from './authenticationService';

export function showLogin() {
    return (dispatch) => {
        dispatch({ type: LOGIN_PROCCESING });
        login().then(result => {
            dispatch({type:LOGIN_SUCCESS, payload:result});
        }).catch(err => {
            dispatch({type:LOGIN_FAILURE, payload:err});
        })
    }
}

export function fetchProfile() {
    return (dispatch) => {
        let profile = getCurrentProfile();
        dispatch({type:CURRENT_USER, payload: profile});
    }
}