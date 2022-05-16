import { Skill } from "./skill"
import { User } from "./user"

export interface PlanningTodo 
{
    id: string,
    name: string, 
    type: string,
    description: string
    time: string
    status: string
    skillid: string
    skill: Skill,
    userid: string
    user: User
}