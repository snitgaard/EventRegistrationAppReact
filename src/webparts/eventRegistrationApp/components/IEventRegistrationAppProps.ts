import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IEventRegistrationAppProps {
  description: string;
  context: WebPartContext;
  listName: string;
}
