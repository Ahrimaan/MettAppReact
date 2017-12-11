import { LOGIN_SUCCESS, CURRENT_USER, LOGOUT } from './actionTypes';
import firebase from '../shared/firebase';


export default function initAuthWatch(store) {
    firebase.auth().onAuthStateChanged(result => {
        if (result) {
            store.dispatch({ type: LOGIN_SUCCESS, payload: result });
            store.dispatch({ type: CURRENT_USER, payload: result });
        }
        if (!result) {
            store.dispatch({ type: LOGOUT });
        }
    })
}