import { Profile } from "./profile-model";

export interface User {
    id?: 0,
    email: string,
    password: string,
    Profile?: Profile
}