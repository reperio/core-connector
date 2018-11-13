import { User } from "./user";
import { Organization } from "./organization";

export interface UserOrganization {
    userId: string;
    organizationId: string;
    user: User;
    organization: Organization;
}