import { APPOINTMENT_ADD,APPOINTMENT_ADDED } from './action-types';
import {addAppointment} from './appointmentService';

export function addApointment(appointmentData) {
    return (dispatch) => {
        dispatch({type:APPOINTMENT_ADD, payload: promise});
        let promise = addAppointment(appointmentData).then(result => {
            dispatch({type:APPOINTMENT_ADDED, payload: result});
        });       
    }
}