import { User } from "./user-model";

export interface Member {
    id?: number,
    user?: User,
    userId: number,
    companyId: number,
    planId: number,
    memberOnKnowledge: [],
    memberOnBot: [],
    memberLog: [],
    chat: [],
    role: string
}