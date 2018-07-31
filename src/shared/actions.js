import {
    LOGIN,
    LOGIN_FAILURE,
    LOGOUT,
    USERINFORMATION_UPDATED,
    USERINFORMATION_UPDATED_FAILED,
    LOADING,
    LOADING_FINISHED
} from './actionTypes';

import { auth } from 'firebase';
import { push  } from 'react-router-redux';

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
                dispatch({type: LOGIN, payload: result});
                dispatch(push('/home'));
            } else{
                dispatch({type: LOGOUT});
                dispatch(push('/login'));
            }
        }, err => {
            dispatch({ type: LOGIN_FAILURE, payload :err});
        });

    }
}

export function logoutCurrentUser() {
    return (dispatch) => {
        auth().signOut();
        push('/login');
    }
}