import { Invoice } from "./invoice-model";
import { Member } from "./member-model";

export interface Plan {
    id?: number,
    name: string,
    description: string,
    cost: number,
    credits: number,
    bots: number,
    documents: number,
    members: number,
    invoice?: Invoice,
    member: Member[]
}