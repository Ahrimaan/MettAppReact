import { TENANTS_LOADED } from './actionTypes';
import { firestore } from 'firebase';

export function loadTenants(callback) {
    return (dispatch) => {
        firestore().collection('/tentant').get().then(result => {
            dispatch({ type: TENANTS_LOADED, payload: result })
            callback(null);
        }, err => {
            callback(err);
        })
    };
}