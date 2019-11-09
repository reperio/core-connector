import { UserOrganization } from "./userOrganization";
import { UserRole } from "./userRole";
import { UserPhone } from "./userPhone";

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    password: string;
    permissions: string[],
    userOrganizations: UserOrganization[];
    userRoles: UserRole[];
    userPhones: UserPhone[];
    primaryEmailAddress: string;
}