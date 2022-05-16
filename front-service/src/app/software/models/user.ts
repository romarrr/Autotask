import { Skill } from "./skill";

export interface User 
{
    id: string,
    role: string,
    firstname: string,
    lastname: string,
    address: string,
    postalcode: string,
    town: string,
    phone: string,
    email: string,
    skillsid: Array<string>,
    skills: Skill[],
    password: string,
    photo: string,
    worktime: string
}