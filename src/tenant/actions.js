import {HIDE_TENANT_DIALOG, SHOW_TENANT_DIALOG, LOAD_TENANTS, TENANTS_LOADED} from './actionTypes';
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