import { PAYPALLINK_UPDATE,PAYPALLINK_UPDATED } from './actionTypes'
import config from '../config';
import { auth, firestore } from 'firebase';
import { getAdminInformation} from '../shared';

export function updatePaypalLink(link) {
    return (dispatch) => {
        dispatch({type: PAYPALLINK_UPDATE});
        firestore().collection(config.AdminCollectionName)
            .doc(auth().currentUser.uid).update({paypalLink:link})
            .then(result => {
                dispatch({type: PAYPALLINK_UPDATED , payload: link});
                dispatch(getAdminInformation());
            }).catch(err => {
                console.log(err);
            })
    };
}

