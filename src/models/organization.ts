import { UserOrganization } from "./userOrganization";

export interface Organization {
    id: string;
    name: string;
    userOrganizations: UserOrganization[];
    personal: boolean;
}