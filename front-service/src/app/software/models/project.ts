import { Client } from "./client";

export interface Project 
{
    id: string,
    name: string,
    startdate: Date,
    enddate: Date,
    type: string,
    clientid: string,
    client: Client,
    logo: string
}