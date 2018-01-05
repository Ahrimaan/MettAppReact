import { CURRENT_USER, LOGIN_FAILURE, LOGIN_SUCCESS, LOGIN_WITH_GOOGLE, LOGOUT, LOGIN_PROCCESING } from './actionTypes';
import { HIDE_TENANT_DIALOG, SHOW_TENANT_DIALOG } from '../shared';
import { getCurrentProfile, login, logout } from './authenticationService';

export function showLogin() {
    return (dispatch) => {
        dispatch({ type: LOGIN_PROCCESING });
        login().then(result => {
            if(!result.user.tenant){
                dispatch({type:SHOW_TENANT_DIALOG});
            }
            dispatch({type:LOGIN_SUCCESS, payload:result.user});
        }).catch(err => {
            dispatch({type:LOGIN_FAILURE, payload:err});
        })
    }
}

export function fetchProfile() {
    return (dispatch) => {
        let profile = getCurrentProfile();
        if(!profile.tenant){
            dispatch({type:SHOW_TENANT_DIALOG});
        }
        dispatch({type:CURRENT_USER, payload: profile});
    }
}

export function logoutCurrentUser(){
    return (dispatch) => {
        logout();
        dispatch({ type: LOGOUT })
    }
}