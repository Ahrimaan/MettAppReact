import {
    CURRENT_USER,
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
    LOGOUT,
    LOGIN_PROCCESING,
    USERINFORMATION_UPDATED,
    USERINFORMATION_UPDATED_FAILED,
    LOADING,
    LOADING_FINISHED
} from './actionTypes';
import { getCurrentProfile, login, logout, updateTenenatId, updatePaypalLink as paypalUpdate } from './authenticationService';
import { push } from 'react-router-redux';

export function showLogin() {
    return (dispatch) => {
        dispatch({ type: LOGIN_PROCCESING });
        login().then(result => {
            dispatch({ type: LOGIN_SUCCESS, payload: result.user });
        }).catch(err => {
            dispatch({ type: LOGIN_FAILURE, payload: err });
        })
    }
}

export function updateTenantId(tenantId, cb) {
    return (dispatch) => {
        updateTenenatId(tenantId).then(result => {
            let profile = getCurrentProfile();
            dispatch({
                type:USERINFORMATION_UPDATED,
                payload:profile
            });
            if(cb){
                cb(true);
            }
            dispatch(push('/'));   
        }).catch(err => {
            // globalerror
            dispatch({type:USERINFORMATION_UPDATED_FAILED});
        });
    }
}

export function updatePaypalLink(paypalLink) {
    return (dispatch) => {
        paypalUpdate(paypalLink).then(result => {
            dispatch({ type:USERINFORMATION_UPDATED , payload: { paypalLink: paypalLink } });
        }).catch(err => {
            dispatch({type: USERINFORMATION_UPDATED_FAILED});
        })
    }
}

export function fetchProfile() {
    return (dispatch) => {
        let profile = getCurrentProfile();
        if (profile) {
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