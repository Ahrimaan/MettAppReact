import {
    LOGGEDIN,
    LOGIN_FAILURE,
    LOGIN_COMPLETED,
    LOGOUT,
    USERINFORMATION_FETCHED,
    LOADING
} from './actionTypes';
import { push } from 'connected-react-router';
import { auth, firestore } from 'firebase';
import { fetchUserTenant } from '../tenant';
import config from '../config';

export function loginWithGoogle() {
    return (dispatch) => {
        dispatch({ type: LOADING });
        subscribeUserEvent();
        auth().signInWithPopup(new auth.GoogleAuthProvider());
    }
}

export function loginWithGithub() {
    return (dispatch) => {
        dispatch({ type: LOADING });
        subscribeUserEvent();
        auth().signInWithPopup(new auth.GithubAuthProvider());
    }
}

export function loginWithCredentials(username, password) {
    return (dispatch) => {
        dispatch({ type: LOADING });
        subscribeUserEvent();
        auth().signInWithEmailAndPassword(username, password).catch(err => {
            dispatch({ type: LOGIN_FAILURE, payload: err })
        });
    }
}

export function createUser(username, password) {
    return (dispatch) => {
        dispatch({ type: LOADING });
        subscribeUserEvent();
        auth().createUserWithEmailAndPassword(username, password).then(result => {
            auth().currentUser.sendEmailVerification({url:"http://chaosmett1.s3-website.eu-central-1.amazonaws.com"});
            console.log(`user created:${result}`);
            auth().signOut();
        }).catch(err => console.log(err));
    }
}

export function subscribeUserEvent() {
    return (dispatch) => {
        dispatch({ type: LOADING });
        auth().onAuthStateChanged(result => {
            if (result) {
                if (result.emailVerified) {
                    dispatch({ type: LOGGEDIN, payload: result });
                    Promise.all([
                        dispatch(fetchUserTenant(result.uid)),
                        dispatch(getAdminInformation())
                    ]).then(res => {
                        dispatch({ type: LOGIN_COMPLETED });
                        dispatch(push('/home'));
                    });
                }
                else {
                    dispatch({ type: LOGIN_FAILURE, payload: 'your user is not activated, please wait for the activation mail' });
                }
            } else {
                dispatch({ type: LOGOUT });
                dispatch(push('/login'));
            }
        }, err => {
            dispatch({ type: LOGIN_FAILURE, payload: err });
        });
    }
}

export function getAdminInformation() {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            firestore().collection(config.AdminCollectionName).doc(auth().currentUser.uid).get().then(result => {
                let data = result.data();
                if (data) {
                    let paypalLink = data ? data.paypalLink ? data.paypalLink : null : null;
                    dispatch({ type: USERINFORMATION_FETCHED, payload: { isAdmin: true, paypalLink: paypalLink } });
                }
                resolve();
            });
        });
    }
}

export function logoutCurrentUser() {
    return (dispatch) => {
        auth().signOut();
    }
}