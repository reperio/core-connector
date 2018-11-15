import { UserOrganization } from "./userOrganization";
import { UserRole } from "./userRole";
import { UserEmail } from "./userEmail";

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    password: string;
    permissions: string[],
    userOrganizations: UserOrganization[];
    userRoles: UserRole[];
    userEmails: UserEmail[];
    primaryEmailAddress: string;
}