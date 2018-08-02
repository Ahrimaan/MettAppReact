import { TENANTS_LOADED, TENANT_SET, TENANT_USER_LOADED } from './actionTypes';
import { auth } from 'firebase';
import { getAllTenants, setUserTenant, getUserTenant } from './tenantService';

export function loadTenants() {
    return (dispatch) => {
        getAllTenants().then(result => {
            dispatch({ type: TENANTS_LOADED, payload: result })
        }).catch(err => {
            console.log(err);
        })
    };
}

export function updateTenant(tenantid) {
    return (dispatch) => {
        setUserTenant(auth().currentUser.uid,tenantid).then(result => {
            dispatch({ type: TENANT_SET, payload: result });
        }).catch(error => {
            console.log(error);
        })
    }
} 

export function fetchUserTenant(userId) {
    return (dispatch) => {
        getUserTenant(userId).then(result => {
            dispatch({type: TENANT_USER_LOADED, payload: result});
        }).catch(err => {

        });
        
    }
}