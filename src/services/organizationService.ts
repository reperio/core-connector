import {ReperioCoreConnector} from "./connector";
import { CreateOrganization } from "../models/createOrganization";

export class OrganizationService {
    constructor(public connector: ReperioCoreConnector) { }
    
    async getOrganizationById(organizationId: string) {
        return await this.connector.axios.get(`/organizations/${organizationId}`, {baseURL: this.connector.config.baseURL});
    }

    async getOrganizations() {
        return await this.connector.axios.get(`/organizations`, {baseURL: this.connector.config.baseURL});
    }

    async getOrganizationsByUser(userId: string) {
        return await this.connector.axios.get(`/organizations/user/${userId}`, {baseURL: this.connector.config.baseURL});
    }

    async createOrganization(name: string, userId: string) {
        const payload = {
            name, 
            personal: false, 
            userId
        }
        return await this.connector.axios.post(`/organizations`, payload, {baseURL: this.connector.config.baseURL});
    }

    async createOrganizationWithAddress(userId: string, organization: CreateOrganization) {
        const payload = {
            name: organization.name,
            personal: false,
            userId: userId,
            address: {
                streetAddress: organization.streetAddress,
                suiteNumber: organization.suiteNumber.toString(),
                city: organization.city,
                state: organization.state,
                zip: organization.zip.toString()
            }
        };

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

    async postOrganizationApplication(organizationId: string, applicationId: string, userId: string) {
        return await this.connector.axios.post(`/organizations/${organizationId}/applications`, {applicationId, userId}, {baseURL: this.connector.config.baseURL});
    }
    
    async enableOrganizationApplication(organizationId: string, applicationId: string, userId: string) {
        return await this.connector.axios.post(`/organizations/${organizationId}/applications/${applicationId}/enable`, {userId}, {baseURL: this.connector.config.baseURL});
    }

    async sendNewCustomerEmail(organizationId: string) {
        return await this.connector.axios.post(`/organizations/${organizationId}/newCustomerEmail`, {baseURL: this.connector.config.baseURL});
    }
}