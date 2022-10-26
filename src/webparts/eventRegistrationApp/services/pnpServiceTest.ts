import { IItemAddResult } from "@pnp/sp/items";
import { createItem } from "office-ui-fabric-react";
import { IListItem } from "../models/IListItem";
import { PnpServices } from "./pnpservices";
const listName: string = 'SPFX Coding Event Registration';

jest.mock('./pnpservices');

const createItemMock = jest.spyOn(PnpServices.prototype, 'sp_createItem').mockImplementation((listName, itemObject) => {
    console.log('mocked function')
});

it('creates entity'() => {
    const service = new PnpServices();

})