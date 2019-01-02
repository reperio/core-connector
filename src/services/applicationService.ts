import {ReperioCoreConnector} from "./connector";
import {SurveyPayload} from "../models/surveyPayload";

export class ApplicationService {
    constructor(public connector: ReperioCoreConnector) { }

    async getApplicationById(applicationId: string) {
        return await this.connector.axios.get(`/applications/${applicationId}`, {baseURL: this.connector.config.baseURL});
    }

    async getApplications() {
        return await this.connector.axios.get(`/applications`, {baseURL: this.connector.config.baseURL});
    }

    async surveyUserSignup(applicationId: string, surveyPayload: SurveyPayload) {
        return await this.connector.axios.post(`/applications/${applicationId}/userSignup`, surveyPayload, {baseURL: this.connector.config.baseURL});
    }
}