import { spfi, SPFx, SPFI } from "@pnp/sp";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/batching";


var _sp: SPFI = null;

export const getSP = (context?: WebPartContext): SPFI => {
    if (_sp === null && context != null) {
        _sp = spfi().using(SPFx(context));
    }
    return _sp;
};