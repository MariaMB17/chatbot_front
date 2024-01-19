import { Profile } from "./profile-model";
import { User } from "./user-model";


export interface UserProfile {
    user: User,
    profile: Profile,
    name: string
}