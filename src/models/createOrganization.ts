export interface CreateOrganization {
    name: string;
    personal: boolean;
    userIds: [string];
    streetAddress: string,
    suiteNumber: string,
    city: string,
    state: string,
    zip: string
}