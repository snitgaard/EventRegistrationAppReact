import * as React from 'react';
import styles from './EventRegistrationApp.module.scss';
import { IEventRegistrationAppProps } from './IEventRegistrationAppProps';
import { IEventRegistrationAppState } from './IEventRegistrationAppState';
import { escape } from '@microsoft/sp-lodash-subset'
import {
  TextField,
  Dropdown,
  Selection,
  IDropdownStyles,
  IDropdownOption,
  IIconProps,
  PrimaryButton,
  Stack,
  IStackProps,
  IStackStyles,
  DetailsList,
  CheckboxVisibility,
  SelectionMode,
  DetailsListLayoutMode,
} from 'office-ui-fabric-react'
import { LIST_COLUMNS } from '../shared/constants';
import { getSP } from '../services/pnpjsConfig';
import { IListItem } from '../models/IListItem';
import PnpServices from '../services/pnpservices';
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/batching";

const stackTokens = { childrenGap: 50 };
const addIcon: IIconProps = { iconName: "Add" }
const readIcon: IIconProps = { iconName: "BulletedListText" }
const saveIcon: IIconProps = { iconName: "Save" }
const deleteIcon: IIconProps = { iconName: "Delete" }

const stackStyles: Partial<IStackStyles> = { root: { width: 650 } };
const dropdownStyles: Partial<IDropdownStyles> = { dropdown: { width: 300 } };

const ddlBatchOptions: IDropdownOption[] = [
  { key: "Batch 1", text: "Batch 1" },
  { key: "Batch 2", text: "Batch 2" },
  { key: "Batch 3", text: "Batch 3" }
];
const ddlLevelOfKnowledge: IDropdownOption[] = [
  { key: "Beginner", text: "Beginner" },
  { key: "Intermediate", text: "Intermediate" },
  { key: "Expert", text: "Expert" }
];

const columnProps: Partial<IStackProps> = {
  tokens: { childrenGap: 15 },
  styles: { root: { width: 300 } },
}

export default class EventRegistrationApp extends React.Component<IEventRegistrationAppProps, IEventRegistrationAppState> {
  private _sp: PnpServices;
  private _selection: Selection;

  constructor(props: IEventRegistrationAppProps, state: IEventRegistrationAppState) {
    super(props);
    this.state = {
      status: "Ready",
      ListItems: [],
      ListItem: {
        ID: 0,
        Title: "",
        Email: "",
        Batch: "",
        LevelofKnowledge: "",
      }
    };

    this._sp = new PnpServices(this.props.context);
    this._selection = new Selection({
      onSelectionChanged: () =>
        this.setState({ ListItem: this._onItemSelectionChanged() }),
    });
  }

  private _onItemSelectionChanged(): any {
    const selectedItem = this._selection.getSelection()[0] as IListItem;
    return selectedItem;
  }

  public async callAndBinddDetailsList(message: string): Promise<any> {
    await this._sp.sp_getItems(this.props.listName).then((listItems: any) => {
      this.setState({
        ListItems: listItems,
        status: message
      });
    });
  }

  public async _createItem(): Promise<any> {
    await this._sp.sp_createItem(this.props.listName, this.state.ListItem)
      .then((Id: string) => {
        console.log(Id);
        this.callAndBinddDetailsList("New Item Created Successfully with Id: " + Id)
      });
  }

  private async _readItem(): Promise<any> {
    await this.callAndBinddDetailsList("Items Loaded Successfully");
  }

  private async _updateItem(): Promise<any> {
    await this._sp.sp_updateItem(this.props.listName, this.state.ListItem.ID, {
      Title: this.state.ListItem.Title,
      Email: this.state.ListItem.Email,
      Batch: this.state.ListItem.Batch,
      LevelofKnowledge: this.state.ListItem.LevelofKnowledge,
    }).then((Id: any) => {
      this.callAndBinddDetailsList(`Item ${Id} Updated Successfully`)
    })
  }

  private async _deleteItem(): Promise<any> {
    try {
      await this._sp.sp_deleteItem(this.props.listName, this.state.ListItem.ID)
        .then(() => {
          this.setState({ status: "Item Deleted Successfully" });
        });
    } catch (error) { }
  }
  componentDidMount(): void {
    this.callAndBinddDetailsList("Record Loaded");
  }

  public render(): React.ReactElement<IEventRegistrationAppProps> {
    return (
      <div>
        <Stack horizontal tokens={stackTokens} styles={stackStyles}>
          <Stack {...columnProps}>
            <TextField
              label='Username'
              placeholder='Please enter username'
              value={this.state.ListItem.Title}
              onChange={(e, newValue) => {
                this.setState((state) => ((state.ListItem.Title = newValue), state))
              }}
            />
            <TextField
              label='Email'
              placeholder='Please enter email'
              value={this.state.ListItem.Email}
              onChange={(e, newValue) => {
                this.setState((state) => ((state.ListItem.Email = newValue), state))
              }}
            />
            <Dropdown
              placeholder='Select an option'
              label='Select batch'
              options={ddlBatchOptions}
              styles={dropdownStyles}
              selectedKey={this.state.ListItem.Batch}
              defaultValue={this.state.ListItem.Batch}
              onChange={(e, newValue) => {
                this.setState((state) => ((state.ListItem.Batch = newValue.text), state))
              }}
            />
            <Dropdown
              placeholder='Select an option'
              label='Select level of knowledge'
              options={ddlLevelOfKnowledge}
              styles={dropdownStyles}
              selectedKey={this.state.ListItem.LevelofKnowledge}
              defaultValue={this.state.ListItem.LevelofKnowledge}
              onChange={(e, newValue) => {
                this.setState((state) => ((state.ListItem.LevelofKnowledge = newValue.text), state))
              }}
            />
          </Stack>
        </Stack>
        <hr />
        <Stack horizontal tokens={stackTokens}>
          <PrimaryButton
            text='Create'
            iconProps={addIcon}
            onClick={(e) => this._createItem()}
          />
          <PrimaryButton
            text='Read'
            iconProps={readIcon}
            onClick={(e) => this._readItem()}
          />
          <PrimaryButton
            text='Update'
            iconProps={saveIcon}
            onClick={(e) => this._updateItem()}
          />
          <PrimaryButton
            text='Delete'
            iconProps={deleteIcon}
            onClick={(e) => this._deleteItem()}
          />
        </Stack>
        <div id="divStatus">{this.state.status}</div>
        <hr />
        <DetailsList
          items={this.state.ListItems}
          columns={LIST_COLUMNS}
          setKey="Id"
          checkboxVisibility={CheckboxVisibility.onHover}
          layoutMode={DetailsListLayoutMode.fixedColumns}
          selection={this._selection}
        />
      </div>
    );
  }
}
