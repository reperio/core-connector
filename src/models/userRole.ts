import { User } from "./user";
import { Role } from "./role";

export interface UserRole {
    userId: string;
    roleId: string;
    user: User;
    role: Role;
}