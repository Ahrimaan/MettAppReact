import { PAYPALLINK_UPDATE,PAYPALLINK_UPDATED } from './actionTypes';

export default function(state = {loading:false},action) {
    switch(action.type) {
        case PAYPALLINK_UPDATE: {
            return Object.assign({},state,{ loading:true });
        }
        case PAYPALLINK_UPDATED: {
            return Object.assign({},state,{ loading:false});
        }
        default:{
            return state;
        }
    }
}