import { User } from "./user";

export interface UserPhone {
    userId: string;
    user: User;
    numberVerified: boolean;
    number: string;
    phoneType: string;
}