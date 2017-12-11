import { CURRENT_USER, LOGIN_FAILURE, LOGIN_SUCCESS, LOGIN_WITH_GOOGLE, LOGOUT, LOGIN_PROCCESING } from './actionTypes';
import firebase from '../shared/firebase';

export function loginUsingGoogle() {
    return (dispatch) => {
        dispatch({ type: LOGIN_PROCCESING });
        let googleProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(googleProvider).then(result => {
            dispatch({type:LOGIN_SUCCESS, payload:result});
        }).catch(err => {
            dispatch({type:LOGIN_FAILURE, payload:err});
        })
    }
}