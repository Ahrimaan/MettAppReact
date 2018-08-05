import { TENANTS_LOADED, TENANT_SET, TENANT_USER_LOADED, LOADING } from './actionTypes';
import { auth } from 'firebase';
import { getAllTenants, setUserTenant, getUserTenant } from './tenantService';
import { push } from 'connected-react-router';
import { resolve } from 'url';

export function loadTenants() {
    return (dispatch) => {
        dispatch({ type: LOADING });
        getAllTenants().then(result => {
            dispatch({ type: TENANTS_LOADED, payload: result });
        }).catch(err => {
            console.log(err);
        })
    };
}

export function updateTenant(tenantid) {
    return (dispatch) => {
        dispatch({ type: LOADING });
        setUserTenant(tenantid).then(result => {
            dispatch({ type: TENANT_SET, payload: result });
            dispatch(push('/'));
        }).catch(error => {
            console.log(error);
        })
    }
}

export function fetchUserTenant() {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch({ type: LOADING });
            getUserTenant(auth().currentUser.uid).then(result => {
                if (!result) {
                    dispatch(push('/tenant'));
                }
                dispatch({ type: TENANT_USER_LOADED, payload: result });
                resolve();
            }).catch(err => {
                dispatch(push('/tenant'));
                reject(err);
            });
        });
    }
}