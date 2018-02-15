import {TENANTS_LOADED, SHOW_TENANT_DIALOG, HIDE_TENANT_DIALOG} from './actionTypes';
import config from '../config.js';
import { httpClient} from '../shared';

export function loadTenants() {
    return (dispatch) => {
        let client = httpClient.get(config.TenantURL);
        client.then(result => {
            dispatch({type:TENANTS_LOADED , payload:result.data});
        }).catch(err => {
            console.log('err happened', err);
        })
    };
}