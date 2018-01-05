import { HIDE_TENANT_DIALOG, SHOW_TENANT_DIALOG } from './actionTypes';

export function showTenantDialog(){
    return (dispatch) => {
        dispatch({type: SHOW_TENANT_DIALOG });
    }
}

export function hideTenantDialog(){
    return (dispatch) => {
        dispatch({type: HIDE_TENANT_DIALOG });
    }
}