import { Organization } from "./organization";

export interface OrganizationAddress {
    id: string;
    organizationId: string;
    organization: Organization;
    streetAddress: string;
    suiteNumber: string;
    city: string;
    state: string;
    zip: string;
}