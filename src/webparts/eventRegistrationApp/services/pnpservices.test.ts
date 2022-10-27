import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IEventRegistrationAppProps } from "../components/IEventRegistrationAppProps";
import { PnpServices } from "./pnpservices";
const listName: string = "SPFX Coding Event Registration"

/*
describe('CRUD', () => {
    test('create', () => {
        const mock = jest.fn();
        const itemObject = {
            Title: "Test",
            Email: "Test@test.com",
            Batch: "Batch 2",
            LevelofKnowledge: "Expert"
        };
        mock('./pnpservices/sp_createItem', listName, itemObject);

        expect(mock).toHaveBeenCalledWith('./pnpservices/sp_createItem', listName, {
            Title: "Test",
            Email: "Test@test.com",
            Batch: "Batch 2",
            LevelofKnowledge: "Expert"
        });
    });
    test('create no throw', () => {
        const mock = jest.fn();
        const itemObject = {
            Title: "Test",
            Email: "Test@test.com",
            Batch: "Batch 2",
            LevelofKnowledge: "Expert"
        };
        mock('./pnpservices/sp_createItem', listName, itemObject);
        expect(mock).not.toThrow();
    });
    test('create throw', async () => {
        const mock = jest.fn();
        mock('./pnpservices/sp_createItem')
        expect(mock).toThrow(new Error("error"));
    });

    test('create expect id return', () => {
        const mock = jest.fn();
        const itemObject = {
            Title: "Test",
            Email: "Test@test.com",
            Batch: "Batch 2",
            LevelofKnowledge: "Expert"
        };
        mock('./pnpservices/sp_createItem', listName, itemObject);
        expect(mock).toBeInstanceOf("any");
    });
});
*/