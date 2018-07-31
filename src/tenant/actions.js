import { TENANTS_LOADED } from './actionTypes';
import { firestore } from 'firebase';
import 'firebase/firestore';

export function loadTenants() {
    return (dispatch) => {
        firestore().collection('tenants').get().then(result => {
            let data = [];
            result.forEach(doc => {
                data.push({id:doc.id , name: doc.data().name });
            });
            dispatch({ type: TENANTS_LOADED, payload: data })
        }, err => {
            //TODO: Error with notifictaion
            console.log(err);
        })
    };
}