import { IEventRegistrationAppProps } from "../components/IEventRegistrationAppProps";
import { configure, shallow, ShallowWrapper } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import { IEventRegistrationAppState } from "../components/IEventRegistrationAppState";
import * as React from "react";
import EventRegistrationApp from "../components/EventRegistrationApp";
import { IListItem } from "../models/IListItem";
let listName: string = "SPFX Coding Event Registration"
let listItem: any = {
    ID: 150,
    Title: "TestTitle",
    Email: "Test@test.com",
    Batch: "Batch 3",
    LevelofKnowledge: "Expert"
};

let listItems: any = [
    {
        ID: 151,
        Title: "ListItem1",
        Email: "ListItem1@test.com",
        Batch: "Batch 1",
        LevelofKnowledge: "Beginner"
    },
    {
        ID: 152,
        Title: "ListItem2",
        Email: "ListItem2@test.com",
        Batch: "Batch 2",
        LevelofKnowledge: "Beginner"
    },
    {
        ID: 153,
        Title: "ListItem3",
        Email: "ListItem3test.com",
        Batch: "Batch 3",
        LevelofKnowledge: "Beginner"
    }];


configure({ adapter: new Adapter() });

describe('Call the components methods', () => {
    let reactComponent: ShallowWrapper<IEventRegistrationAppProps, IEventRegistrationAppState>;

    beforeEach(() => {
        reactComponent = shallow(React.createElement(
            EventRegistrationApp
        ));
    });

    afterEach(() => {
        reactComponent.unmount();
    })


    it('create item', async () => {
        try {
            reactComponent.setState({ ListItem: listItem, ListItems: listItems });
            const instance = reactComponent.instance() as EventRegistrationApp;
            return instance._createItem().then(data => {
             expect(reactComponent.state().status).toEqual("New Item Created Successfully with Id: ");
            })

        } catch (error) {
            expect(error).toMatch('error')
        }


    })
})