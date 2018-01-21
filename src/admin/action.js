import { updatePaypalLink as updateLink } from '../shared';



export function updatePaypalLink(link) {
    return (dispatch) => {
        dispatch( updateLink(link));

    };
}

