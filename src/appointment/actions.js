import { APPOINTMENT_ADD, APPOINTMENT_ADDED } from './action-types';
import { firestore, auth } from 'firebase';
import config from '../config';

export function addApointment(appointmentData, tenantid) {
    return (dispatch) => {
        dispatch({ type: APPOINTMENT_ADD });
        return new Promise((resolve, reject) => {
            firestore().collection(config.AdminCollectionName).doc(auth().currentUser.uid).get().then(result => {
                let data = Object.assign({}, appointmentData, { admin: result.ref, tenant: result.data().tenantId });
                firestore().collection(config.AppointmentCollectionName).add(data).then(result => {
                    resolve(Object.assign({}, appointmentData, { id: result.id }));
                    dispatch({ type: APPOINTMENT_ADDED, payload: appointmentData });
                }).catch(err => {
                    reject(err);
                });
            })
        });
    }
}