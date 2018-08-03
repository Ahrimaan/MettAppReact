import {
    LOGIN,
    LOGIN_FAILURE,
    LOGOUT,
    USERINFORMATION_UPDATED,
    USERINFORMATION_UPDATED_FAILED,
    USERINFORMATION_FETCHED
} from './actionTypes';
import { push } from 'connected-react-router';
import { auth, firestore } from 'firebase';
import { fetchUserTenant } from '../tenant';
import config from '../config';

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

export function subscribeUserEvent() {
    return (dispatch) => {
        auth().onAuthStateChanged(result => {
            if(result){
                dispatch(fetchUserTenant(result.uid));
                dispatch({type: LOGIN, payload: result});
                dispatch(getAdminInformation());
                dispatch(push('/'));
            } else{
                dispatch({type: LOGOUT});
                dispatch(push('/login'));
            }
        }, err => {
            dispatch({ type: LOGIN_FAILURE, payload :err});
        });
    }
}

export function getAdminInformation() {
    return (dispatch) => {
        firestore().collection(config.AdminCollectionName).doc(auth().currentUser.uid).get().then(result => {
            let data = result.data();
            let paypalLink = data.paypalLink ? data.paypalLink : null;
            dispatch({type: USERINFORMATION_FETCHED, payload: { isAdmin: true , paypalLink:  paypalLink } });
        });
    }
}

export function logoutCurrentUser() {
    return (dispatch) => {
        auth().signOut();
    }
}