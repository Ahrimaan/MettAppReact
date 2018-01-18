import { updatePaypalLink as updateLink } from '../shared';
import { browserHistory } from 'react-router';


export function updatePaypalLink(link) {
    return (dispatch) => {
        dispatch( updateLink(link));
        browserHistory.push('/home')
    };
}

