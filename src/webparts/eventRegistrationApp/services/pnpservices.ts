import { WebPartContext } from "@microsoft/sp-webpart-base"
import { IItemAddResult } from "@pnp/sp/items"
import { IEventRegistrationAppState } from "../components/IEventRegistrationAppState";
import { getSP } from "./pnpjsConfig"
export interface IPnpServices {
    sp_createItem(listName: string, itemObject: any): Promise<any>;
    sp_getItems(listName: string, columns: string[]): Promise<any>;
    sp_updateItem(listName: string, itemId: number, itemObj: any): Promise<any>;
    sp_deleteItem(listName: string, itemId: number): Promise<any>;
};

export default class PnpServices implements IPnpServices {
    private _sp;
    constructor(context: WebPartContext) {
        this._sp = getSP(context);
    }

    public async sp_createItem(listName: string, itemObject: any): Promise<any> {
        try {
            const iar: IItemAddResult = await this._sp.web.lists.getByTitle(listName).items.add(itemObject)
            return iar.data.Id;
        } catch (error) {
            Promise.reject(error);
            return error;
        }
    }
    public async sp_getItems(listName: string): Promise<any> {
        try {
            const items: any[] = await this._sp.web.lists.getByTitle(listName).items();
            return items;
        } catch (error) {
            Promise.reject(error);
            return error;
        }
    }
    public async sp_updateItem(listName: string, itemId: number, itemObj: any): Promise<any> {
        try {
            const list = this._sp.web.lists.getByTitle(listName);
            const i = await list.items.getById(itemId).update(itemObj);
            return itemId;
        } catch (error) {
            Promise.reject(error);
            return error;
        }
    }
    public async sp_deleteItem(listName: string, itemId: number): Promise<any> {
        try {
            const list = this._sp.web.lists.getByTitle(listName);
            const i = await list.items.getById(itemId).delete();
            return;
        } catch (error) {
            Promise.reject(error);
            return error;
        }
    }
}