import { LOAD_TENANTS, TENANTS_LOADED} from './actionTypes';

const initialState = { tenantList:null};

export default function (state = initialState, action) {
    switch (action.type) {
        case TENANTS_LOADED: {
            return Object.assign({}, state, { tenantList: action.payload })
        }
        default:
            return state
    }
}