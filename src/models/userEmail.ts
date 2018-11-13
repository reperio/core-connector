import { User } from "./user";

export interface UserEmail {
    id: string;
    userId: string;
    user: User;
    email: string;
    emailVerified: boolean;
    deleted: boolean;
    primary: boolean;
}