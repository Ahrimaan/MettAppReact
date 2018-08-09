import { 
    APPOINTMENT_ADD,
    APPOINTMENT_ADDED, 
    FETCHING_DATA, 
    FETCHED_DATA,
    APPOINTMENT_DELETED
} from './action-types';
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
                    dispatch({ type: FETCHED_DATA,
                         payload: events.docs.map(
                             event => Object.assign({},event.data(),
                              {id: event.id }))});
                }
            ).catch(err => {
                console.log(err);
            })
        }).catch(err => {
            console.log(err);
        });

    }
}

export function deleteEvent(id) {
    return (dispatch) => {
        firestore().collection(config.AppointmentCollectionName).doc(id).delete().then(result  => {
            dispatch({type: APPOINTMENT_DELETED, payload: id});
        }).catch(err => {
            console.log(err);
        })
    }
}