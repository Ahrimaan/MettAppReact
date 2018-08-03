import { PAYPALLINK_UPDATE, PAYPALLINK_UPDATED } from './actionTypes'
import config from '../config';
import { auth, firestore } from 'firebase';
import { getAdminInformation } from '../shared';
import { push } from 'connected-react-router';

export function updatePaypalLinkAndUserdata(link) {
    return (dispatch) => {
        dispatch({ type: PAYPALLINK_UPDATE });
        firestore().collection(config.AdminCollectionName)
            .doc(auth().currentUser.uid).update(
                {
                    paypalLink: link,
                    displayName: auth().currentUser.displayName,
                    email: auth().currentUser.email
                })
            .then(result => {
                dispatch({ type: PAYPALLINK_UPDATED, payload: link });
                dispatch(getAdminInformation());
                dispatch(push('/home'));
            }).catch(err => {
                console.log(err);
            });
    }
}

