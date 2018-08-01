import { TENANTS_LOADED } from './actionTypes';
import { firestore, auth } from 'firebase';
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

export function updateTenant(tenantid) {
        firestore().collection('tenants').doc(tenantid).get().then(result => {
            firestore().collection('user').doc(auth().currentUser.uid).set({ tenant: result.ref }).then(result => {
                return {type: TENANT_SET, payload:tenantid };
            }).catch(err => {
                //TODO: Error with notifictaion
                console.log(err);
            });
        }).catch(err => {
            //TODO: Error with notifictaion
            console.log(err);
        });
} 