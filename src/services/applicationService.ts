import {ReperioCoreHttpConnector} from "../index";

export class ApplicationService {
    constructor(public connector: ReperioCoreHttpConnector) { }

    async getApplicationById(applicationId: string) {
        return await this.connector.axios.get(`/applications/${applicationId}`, {baseURL: this.connector.config.baseURL});
    }

    async getApplications() {
        return await this.connector.axios.get(`/applications`, {baseURL: this.connector.config.baseURL});
    }
}