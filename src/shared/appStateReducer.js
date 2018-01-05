import {SHOW_TENANT_DIALOG, HIDE_TENANT_DIALOG} from './actionTypes';

const initialState = {showDialog: false};

export default function (state = initialState, action) {
    switch (action.type) {
        case SHOW_TENANT_DIALOG:
            return Object.assign({},state,{showDialog: true})
        case HIDE_TENANT_DIALOG:
        return Object.assign({},state,{showDialog: false})
        default:
            return state;
    }
}