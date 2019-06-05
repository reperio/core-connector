import {ReperioCoreConnector} from "./connector";
import {UserEmail} from "../models/userEmail";
import {AxiosResponse} from "axios";

export class UserService {
    constructor(public connector: ReperioCoreConnector) { }

    async getUserById(userId: string) {
        return await this.connector.axios.get(`/users/${userId}`, {baseURL: this.connector.config.baseURL});
    }

    async getUsers() {
        return await this.connector.axios.get(`/users`, {baseURL: this.connector.config.baseURL});
    }

    async checkUserExistsByEmail(primaryEmailAddress: string) : Promise<boolean> {
        const response = await this.connector.axios.get(`/users/exists?emailAddress=${primaryEmailAddress}`, {baseURL: this.connector.config.baseURL})
        return response.data;
    }

    async createUser(primaryEmailAddress: string, firstName: string, lastName: string, password: string, confirmPassword: string, organizationIds: string[]) {
        const payload = {
            primaryEmailAddress, 
            firstName, 
            lastName, 
            password, 
            confirmPassword, 
            organizationIds
        }
        return await this.connector.axios.post(`/users`, payload, {baseURL: this.connector.config.baseURL});
    }

    async editUser(userId: string, firstName: string, lastName: string, organizationIds: string[], roleIds: string[], userEmails: UserEmail[], primaryEmailId: string) {
        const payload = {
            firstName, 
            lastName, 
            organizationIds, 
            roleIds, 
            userEmails: userEmails.map((userEmail: UserEmail) => { 
                return { 
                    email: userEmail.email, 
                    id: userEmail.id 
                }
            }), 
            primaryEmailId
        }
        return await this.connector.axios.put(`/users/${userId}`, payload, {baseURL: this.connector.config.baseURL});
    }

    async editUserGeneral(userId: string, firstName: string, lastName: string) {
        const payload = {
            firstName, 
            lastName
        }
        return await this.connector.axios.put(`/users/${userId}/general`, payload, {baseURL: this.connector.config.baseURL});
    }

    async editUserEmails(userId: string, added: UserEmail[], deleted: UserEmail[]) {

        if(added.length > 0) {
            const payload = {
                userEmails: added
                    .map((x: UserEmail) => {
                        return {
                            email: x.email,
                            id: x.id
                        }
                    })
                }

            await this.connector.axios.post(`/users/${userId}/addUserEmails`, payload, {baseURL: this.connector.config.baseURL});
        }

        if(deleted.length > 0) {
            const payload = {
                userEmailIds: deleted.map((x: UserEmail) => x.id)
            };
    
            await this.connector.axios.post(`/users/${userId}/deleteUserEmails`, payload, {baseURL: this.connector.config.baseURL});
        }
    }

    async setPrimaryUserEmail(userId: string, primaryUserEmail: UserEmail) {
        const payload = {
            primaryUserEmailId: primaryUserEmail.id
        };

        await this.connector.axios.put(`/users/${userId}/setPrimaryUserEmail`, payload, {baseURL: this.connector.config.baseURL});
    }

    async editUserOrganizations(userId: string, organizationIds: string[]) {
        const payload = {
            organizationIds
        }
        return await this.connector.axios.put(`/users/${userId}/organizations`, payload, {baseURL: this.connector.config.baseURL});
    }

    async editUserRoles(userId: string, roleIds: string[]) {
        const payload = {
            roleIds
        }
        return await this.connector.axios.put(`/users/${userId}/roles`, payload, {baseURL: this.connector.config.baseURL});
    }

    async deleteUser(userId: string) {
        return await this.connector.axios.delete(`/users/${userId}`);
    }

    async getUserOrganizations(userId: string) {
        return await this.connector.axios.get(`/users/${userId}/organizations`, {baseURL: this.connector.config.baseURL});
    }

    async getUserOrganizationByOrganizationId(userId: string, organizationId: string) {
        return await this.connector.axios.get(`/users/${userId}/organizations/${organizationId}`, {baseURL: this.connector.config.baseURL});
    }
}