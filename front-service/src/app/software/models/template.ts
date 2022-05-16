import { Todo } from "./todo";

export interface Template 
{
    id: string,
    name: string,
    description: string,
    time: string,
    templatetodoid: Array<string>,
    todos: Todo[],
    logo: string
}