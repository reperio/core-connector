import {ReperioCoreConnector} from "./connector";
import {SurveyPayload} from "../models/surveyPayload";

interface SurveyResponse {
    success: boolean;
    errors: string[];

}

export class ApplicationService {
    constructor(public connector: ReperioCoreConnector) { }

    async getApplicationById(applicationId: string) {
        return await this.connector.axios.get(`/applications/${applicationId}`, {baseURL: this.connector.config.baseURL});
    }

    async getApplications() {
        return await this.connector.axios.get(`/applications`, {baseURL: this.connector.config.baseURL});
    }

    async surveyUserSignup(applicationId: string, surveyPayload: SurveyPayload) : Promise<SurveyResponse> {
        const response = await this.connector.axios.post(`/applications/${applicationId}/userSignup`, surveyPayload, {baseURL: this.connector.config.baseURL});
        return response.data;
    }

    async applicationOragnizationSearch(applicationId: string, organizationIds: string[]) : Promise<any> {
        return await this.connector.axios.post(`/applications/${applicationId}/organizationSearch`, {organizationIds}, {baseURL: this.connector.config.baseURL});
    }

    async sendNotificationEmail(applicationId: string, addressee: string, body: string) {
        return await this.connector.axios.post(`/applications/${applicationId}/emailNotification`, {addressee, body}, {baseURL: this.connector.config.baseURL});
    }
}