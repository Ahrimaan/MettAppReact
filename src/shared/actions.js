import {
    LOGIN,
    LOGIN_FAILURE,
    LOGOUT,
    USERINFORMATION_UPDATED,
    USERINFORMATION_UPDATED_FAILED,
} from './actionTypes';

import { auth } from 'firebase';
import { fetchUserTenant } from '../tenant';

export function loginWithGoogle() {   
    return (dispatch) => {
        subscribeUserEvent();
        auth().signInWithPopup(new auth.GoogleAuthProvider());
    }
}

export function loginWithCredentials(username, password) {
    return (dispatch) => {
        subscribeUserEvent();
        auth().signInWithEmailAndPassword(username,password);
    }
}

export function updatePaypalLink(paypalLink) {
    return (dispatch) => {
        paypalUpdate(paypalLink).then(result => {
            dispatch({ type:USERINFORMATION_UPDATED , payload: { paypalLink: paypalLink } });
        }).catch(err => {
            dispatch({type: USERINFORMATION_UPDATED_FAILED});
        })
    }
}

export function subscribeUserEvent() {
    return (dispatch) => {
        auth().onAuthStateChanged(result => {
            if(result){
                dispatch(fetchUserTenant(result.uid));
                dispatch({type: LOGIN, payload: result});
            } else{
                dispatch({type: LOGOUT});
            }
        }, err => {
            dispatch({ type: LOGIN_FAILURE, payload :err});
        });

    }
}

export function logoutCurrentUser() {
    return (dispatch) => {
        auth().signOut();
    }
}