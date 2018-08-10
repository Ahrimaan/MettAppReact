import { 
    APPOINTMENT_ADD,
    APPOINTMENT_ADDED, 
    FETCHING_DATA, 
    FETCHED_DATA,
    APPOINTMENT_DELETED,
    JOIN_APPOINTMENT
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
                    let newData = Object.assign({}, appointmentData, { id: result.id },adminData);
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
                    let sorted = events.docs.sort(((item1,item2) => new Date(item1.data().date).getDate() > new Date(item2.data().date).getDate() ));
                    dispatch({ type: FETCHED_DATA,
                         payload: sorted.map(
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

export function joinAppointment(id,data) {
    return (dispatch) => {
        let docRef = firestore().collection(config.AppointmentCollectionName).doc(id);
        docRef.get().then(result => {
            let events = result.data().attendees;
            data.username = auth().currentUser.displayName;
            data.email = auth().currentUser.email;
            data.uid = auth().currentUser.uid;
            if(!events) {
                events = [data];
            } else {
                events.push(data);
            }
            docRef.update({
                attendees : events
            }).then(updateResult => {
                dispatch({type: JOIN_APPOINTMENT, payload:events});
            }).catch(err => {
                console.log(err);
            })          
        })
    }
}

export function leaveAppointment(id) {
    return (dispatch) => {
        let docRef = firestore().collection(config.AppointmentCollectionName).doc(id);
        docRef.get().then(result => {
            let events = result.data().attendees.filter(item => item.uid !== auth().currentUser.uid);
            docRef.update({
                attendees : events
            }).then(updateResult => {
                dispatch({type: JOIN_APPOINTMENT, payload:events});
            }).catch(err => {
                console.log(err);
            })          
        })
    }
}

export function deleteEvent(id) {
    return (dispatch) => {
        return new Promise((resolve,reject) => {
            firestore().collection(config.AppointmentCollectionName).doc(id).delete().then(result  => {
                dispatch({type: APPOINTMENT_DELETED, payload: id});
                resolve(id);
            }).catch(err => {
                console.log(err);
                reject(err);
            });
        })
    }
}