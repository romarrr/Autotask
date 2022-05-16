import { Skill } from "./skill";

export interface Todo
{
    id: string,
    name: string,
    description: string,
    type: string,
    time: string,
    skillid: string, 
    skill: Skill,
    status: string,
    logo: string
}