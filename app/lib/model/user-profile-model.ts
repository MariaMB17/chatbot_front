import { Company } from "./company-model";
import { Member } from "./member-model";
import { Plan } from "./plan-model";
import { Profile } from "./profile-model";
import { User } from "./user-model";


export interface UserProfile {
    user: User,
    profile: Profile,
    name: string,
    company?: Company,
    member?: Member
    plan?: Plan
}