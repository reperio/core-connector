import { UserOrganization } from "./userOrganization";
import { UserPhone } from "./userPhone";

export interface SurveyPayload {
    primaryEmailAddress: string;
    firstName: string;
    lastName: string;
    phones: UserPhone[];
    organizations: UserOrganization[];
    sendConfirmationEmail: boolean;
}