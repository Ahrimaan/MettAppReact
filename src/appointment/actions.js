import { APPOINTMENT_ADD, APPOINTMENT_ADDED, FETCHING_DATA, FETCHED_DATA } from './action-types';
import { firestore, auth } from 'firebase';
import config from '../config';

export function addApointment(appointmentData, tenantid) {
    return (dispatch) => {
        dispatch({ type: APPOINTMENT_ADD });
        return new Promise((resolve, reject) => {
            firestore().collection(config.AdminCollectionName).doc(auth().currentUser.uid).get().then(admin => {
                let adminData = { 
                    link:admin.data().paypalLink,
                    name:admin.data().displayName,
                    created: new Date() };
                let data = Object.assign({}, appointmentData,
                     { admin: admin.ref, tenant: tenantid }, adminData);
                firestore().collection(config.AppointmentCollectionName).add(data).then(result => {
                    let newData = Object.assign({}, appointmentData, { id: result.id });
                    resolve(newData);
                    dispatch({ type: APPOINTMENT_ADDED, payload: newData });
                }).catch(err => {
                    reject(err);
                });
            });
        });
    }
}

export function getAllEvents(selectedTenant) {
    return (dispatch) => {
        dispatch({ type: FETCHING_DATA });
        firestore().collection(config.TenantCollectionName).doc(selectedTenant).get().then(tenant => {
            firestore().collection(config.AppointmentCollectionName).where('tenant', '==', tenant.id).get().then(
                events => {
                    dispatch({ type: FETCHED_DATA, payload: events.docs.map(event => event.data()) });
                }
            ).catch(err => {
                console.log(err);
            })
        }).catch(err => {
            console.log(err);
        });

    }
}