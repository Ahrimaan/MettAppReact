import tenantComponent from './tenantComponent';
import { getUserTentant } from './tenantService';
import { showTenantDialog, hideTenantDialog } from './actions';
import reducer from './reducer';

export {
    tenantComponent as TenantComponent,
    getUserTentant,
    reducer as TenantReducer,
    showTenantDialog,
    hideTenantDialog
}