import {
    CURRENT_USER,
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
    LOGIN_WITH_GOOGLE,
    LOGOUT,
    LOGIN_PROCCESING,
    USERINFORMATION_UPDATED,
    USERINFORMATION_UPDATED_FAILED,
    LOADING,
    LOADING_FINISHED
} from './actionTypes';
import { showTenantDialog, hideTenantDialog } from '../tenant';
import { getCurrentProfile, login, logout, updateUser } from './authenticationService';
import { HIDE_TENANT_DIALOG } from '../tenant/actionTypes';

export function showLogin() {
    return (dispatch) => {
        dispatch({ type: LOGIN_PROCCESING });
        login().then(result => {
            if (!result.user.tenant) {
                dispatch(showTenantDialog());
            }
            dispatch({ type: LOGIN_SUCCESS, payload: result.user });
        }).catch(err => {
            dispatch({ type: LOGIN_FAILURE, payload: err });
        })
    }
}

export function updateUserInformation(tenantId) {
    return (dispatch) => {
        updateUser(tenantId).then(result => {
            let profile = getCurrentProfile();
            dispatch({
                type:USERINFORMATION_UPDATED,
                payload:profile
            });
        }).catch(err => {
            // globalerror
            dispatch({type:USERINFORMATION_UPDATED_FAILED});
        });
    }
}

export function fetchProfile() {
    return (dispatch) => {
        let profile = getCurrentProfile();
        if (profile) {
            if (!profile.tenant) {
                dispatch(showTenantDialog());
            }
            dispatch({ type: CURRENT_USER, payload: profile });
        }

    }
}

export function logoutCurrentUser() {
    return (dispatch) => {
        logout();
        dispatch({ type: LOGOUT })
    }
}

export function showLoading(){
    return (dispatch) => {
        dispatch({type:LOADING});
    }
}

export function hideLoading() {
    return (dispatch) => {
        dispatch({type:LOADING_FINISHED});
    }
}