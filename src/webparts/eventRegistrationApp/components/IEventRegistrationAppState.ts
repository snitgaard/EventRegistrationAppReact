import { IListItem } from "../models/IListItem";

export interface IEventRegistrationAppState {
    status: string;
    ListItem: IListItem;
    ListItems: IListItem[];

}