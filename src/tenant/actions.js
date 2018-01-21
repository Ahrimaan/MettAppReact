import {LOAD_TENANTS, TENANTS_LOADED, SHOW_TENANT_DIALOG, HIDE_TENANT_DIALOG} from './actionTypes';
import config from '../config.js';
import { httpClient, getUserId } from '../shared';

export function loadTenants() {
    return (dispatch) => {
        dispatch({type: LOAD_TENANTS});
        let client = httpClient.get(config.TenantURL);
        client.then(result => {
            dispatch({type:TENANTS_LOADED , payload:result.data});
        }).catch(err => {
            console.log('err happened', err);
        })
    };
}

export function showTenantDialog() {
    return (dispatch) => {
        dispatch(loadTenants());
        dispatch({type: SHOW_TENANT_DIALOG});
    }
}

export function hideTenantDialog() {
    return (dispatch) => {
        dispatch({type: HIDE_TENANT_DIALOG})
    }
}