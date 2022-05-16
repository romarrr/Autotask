import { PlanningTodo } from "./planningtodo";
import { User } from "./user";

export interface Planning 
{
    id: string,
    name: string,
    role: string,
    todos: PlanningTodo[],
    users: User[]
}