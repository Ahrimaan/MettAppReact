import {
    CURRENT_USER,
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
    LOGIN_WITH_GOOGLE,
    LOGOUT,
    LOGIN_PROCCESING,
    USERINFORMATION_UPDATED,
    USERINFORMATION_UPDATED_FAILED,
    USERINFORMATION_UPDATING
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
        dispatch({type:USERINFORMATION_UPDATING})
        let action = updateUser(tenantId).then(result => {
            /* dispatch({
                type:USERINFORMATION_UPDATED,
                payload:result
            }); */
            // Find a better way, the component itself should track if a tenant switch is needed
            dispatch({type:HIDE_TENANT_DIALOG})
            let profile = getCurrentProfile();
            dispatch({type:CURRENT_USER, payload: profile});
        }).catch(err => {
            // globalerror
            dispatch({type:USERINFORMATION_UPDATED_FAILED});
        })
        dispatch(action);
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