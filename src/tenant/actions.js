import {HIDE_TENANT_DIALOG, SHOW_TENANT_DIALOG, LOAD_TENANTS, TENANTS_LOADED} from './actionTypes';
import {getTentants} from './tenantService';

export function showTenantDialog() {
    return (dispatch) => {
        dispatch({type: SHOW_TENANT_DIALOG});
        dispatch(loadTenants());
    }
}

export function loadTenants() {
    return (dispatch) => {
        dispatch({type: LOAD_TENANTS});
        getTentants()
            .then(result => {                
                dispatch({type:TENANTS_LOADED , payload:result.data});
            })
            .catch(err => {
                //TODO: Error message global
            })
    };
}

export function hideTenantDialog() {
    return (dispatch) => {
        dispatch({type: HIDE_TENANT_DIALOG});
    }
}