import { TENANT_SET, TENANTS_LOADED, TENANT_USER_LOADED} from './actionTypes';

const initialState = { tenantList:null};

export default function (state = initialState, action) {
    switch (action.type) {
        case TENANTS_LOADED: {
            return Object.assign({}, state, { tenantList: action.payload })
        }
        case TENANT_USER_LOADED: 
        case TENANT_SET: {
            return Object.assign({}, state, { selectedTenant: action.payload })
        }
        default:
            return state
    }
}