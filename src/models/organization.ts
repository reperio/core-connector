import { UserOrganization } from "./userOrganization";
import { OrganizationAddress } from "./organizationAddress";

export interface Organization {
    id: string;
    name: string;
    userOrganizations: UserOrganization[];
    organizationAddress: OrganizationAddress[];
    personal: boolean;
    supportNumber: string;
}