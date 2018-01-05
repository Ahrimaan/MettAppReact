import { HIDE_TENANT_DIALOG,LOAD_TENANTS,SHOW_TENANT_DIALOG,TENANTS_LOADED } from './actionTypes';

const initialState = {showDialog:false};

export default function (state = initialState, action) {
    switch (action.type) {
        case HIDE_TENANT_DIALOG: {
            return Object.assign({},state,{showDialog:false});  
        }
        case SHOW_TENANT_DIALOG: {
            return Object.assign({},state,{showDialog:true});
        }
        case TENANTS_LOADED: {
            return Object.assign({}, state,{ tenantList: action.payload })
        }
        default:
            return state
    }
}