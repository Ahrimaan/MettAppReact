import { TENANT_SET, TENANTS_LOADED, TENANT_USER_LOADED, LOADING } from './actionTypes';

const initialState = { tenantList:null};

export default function (state = initialState, action) {
    switch (action.type) {
        case TENANTS_LOADED: {
            return Object.assign({}, state, { tenantList: action.payload, loading: false })
        }
        case TENANT_USER_LOADED: 
        case TENANT_SET: {
            return Object.assign({}, state, { selectedTenant: action.payload, loading: false })
        }
        case LOADING: {
            return Object.assign({}, state, { loading:true });
        }
        default:
            return state
    }
}