import {ReperioCoreHttpConnector} from "../index";

export class OrganizationService {
    constructor(public connector: ReperioCoreHttpConnector) { }
    
    async getOrganizationById(organizationId: string) {
        return await this.connector.axios.get(`/organizations/${organizationId}`, {baseURL: this.connector.config.baseURL});
    }

    async getOrganizations() {
        return await this.connector.axios.get(`/organizations`, {baseURL: this.connector.config.baseURL});
    }

    async createOrganization(name: string, userIds: string[]) {
        const payload = {
            name, 
            personal: false, 
            userIds
        }
        return await this.connector.axios.post(`/organizations`, payload, {baseURL: this.connector.config.baseURL});
    }

    async editOrganization(organizationId: string, name: string, userIds: string[]) {
        const payload = {
            name, 
            userIds
        }
        return await this.connector.axios.put(`/organizations/${organizationId}`, payload, {baseURL: this.connector.config.baseURL});
    }

    async deleteOrganization(organizationId: string) {
        return await this.connector.axios.delete(`/organizations/${organizationId}`, {baseURL: this.connector.config.baseURL});
    }
}