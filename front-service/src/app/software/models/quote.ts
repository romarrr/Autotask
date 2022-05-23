import { Client } from "./client";
import { Template } from "./template";
import { Todo } from "./todo";

export interface Quote 
{
    id: string,
    quoteid: string,
    name: string,
    status: string,
    templateid: string,
    template: Template,
    clientid: string,
    client: Client,
    todosidoutoftemplate: Array<string>,
    templatetodoid: Array<string>,
    templatename: string,
    todos: Todo[],
    logo: string
}